import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { increment } from 'actions/app';
import CircleSvg from 'svg/circle.svg';
import SquareSvg from 'svg/square.svg';
import TriangleSvg from 'svg/triangle.svg';
import bookImg from 'img/book2.jpg';

@connect(state => ({
  counter: state.app.get('counter'),
}))
export default class Home extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  handleTestButtonClick = () => {
    const { dispatch } = this.props;

    dispatch(increment());
  }

  render() {
    const {
      counter,
    } = this.props;

    return (
      <div className='Home'>
        <h1>HOME</h1>
        <p>
          Boilerplate for kicking off React/Redux applications with Django.
        </p>

        <h2>About</h2>

        <p>
        Lorem Ipsum is simply dummy text of the printing and 
        typesetting industry. Lorem Ipsum has been the industry's 
        standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled 
        </p>
        <p>
          Visit documentation
          on <a href='https://github.com/JosephDev'>GitHub</a>
        </p>

        <hr />

        <h2>Examples</h2>

        <h3>Action</h3>
        <div className='Example'>
          <p>Counter: { counter }</p>
          <button onClick={ this.handleTestButtonClick }>
            Increase
          </button>
        </div>

        <h3>Background image</h3>
        <div className='Example'>
          <div className='BackgroundImgExample' />
        </div>

        <h3>Image imported to the component</h3>
        <div className='Example'>
          <img src={ bookImg } alt='' className='ImgExample' />
        </div>

        <h3>SVGs imported as react components</h3>
        <div className='Example'>
          <CircleSvg style={ { marginRight: 10 } } />
          <SquareSvg style={ { marginRight: 10 } } />
          <TriangleSvg />
        </div>
      </div>
    );
  }
}
