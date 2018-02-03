import React, { Component } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlog, postBlog } from 'actions/blog';
import { timeAgo } from 'sugar';

@connect(state => ({
  error: state.blog.get('error'),
  loading: state.blog.get('loading'),
  blog: state.blog.get('blog'),
}))
export default class Blog extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    blog: PropTypes.array,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  constructor( props ) {
    super( props );
    this.state = {
      formValues: {text: '', text: ''},
      formErrors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const {
      dispatch,
      blog,
    } = this.props;

    if (!blog) {
      dispatch(getBlog());
    }
  }

  handleChange(event) {
    const newState = update(this.state, {
      formValues: {[event.target.name]: {$set: event.target.value}}
    });
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { title, text } = this.state.formValues;
    const _formErrors = {}
    !title || title.trim() === '' ? _formErrors['title'] = 'title is required' : _formErrors['title'] = '';
    !text || text.trim() === '' ? _formErrors['text'] = 'body is required' : _formErrors['text'] = '';
    this.setState({formErrors: _formErrors})
    if (!_formErrors.title, !_formErrors.text) {
      dispatch(postBlog(this.state.formValues));
      this.setState({formValues: {text: '', text: ''}})
    }

    // const { title, text } = values;
    // const _formErrors = {}
    // !title || title.trim() === '' ? _formErrors['title'] = 'title is required' : _formErrors['title'] = '';
    // !text || text.trim() === '' ? _formErrors['text'] = 'body is required' : _formErrors['text'] = '';
    // this.setState({formErrors: _formErrors})
    // if (!_formErrors.title, !_formErrors.text) {
    //   console.log(values);
    // }
  }

  renderBlog() {
    const {
      blog,
    } = this.props;

    return blog.map(post => {
      return (
        <div key={ post.created_date } className='Blog-post'>
          <div className='header'>
            <h3>{ post.title }</h3>
            <p>{ timeAgo(post.created_date) }</p>
          </div>
          <p>{ post.text }</p>
        </div>
      );
    });
  }

  createPostForm() {
    const { formErrors } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input type="text" name="title" placeholder="Title" onChange={ this.handleChange } value={ this.state.formValues.title || ''}/>
        <p className="error">{ formErrors.title }</p>
        <input type="text" name="text" placeholder="Body" onChange={ this.handleChange } value={ this.state.formValues.text || ''}/>
        <p className="error">{ formErrors.text }</p>
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  render() {
    const {
      loading,
      error,
      blog,
    } = this.props;
    
    return (
      <div className='Blog'>
        <h1>Blog</h1>
        <div className="create-post">
          { this.createPostForm() }
        </div>
        { loading && <div>Loading posts...</div> }
        { error && error.toString() }
        <div className='Blog-posts'>
          { blog && this.renderBlog() }
        </div>
      </div>
    );
  }
}
