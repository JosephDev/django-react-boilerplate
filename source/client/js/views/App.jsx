import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Menu from 'components/global/Menu';
import Home from 'views/Home';
import Blog from 'views/Blog';
import NotFound from 'views/NotFound';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Menu />
        <div className='Page'>
        <Switch>
            <Route exact path={ routeCodes.HOME } component={ Home } />
            <Route path={ routeCodes.BLOG } component={ Blog } />
            <Route path='*' component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
