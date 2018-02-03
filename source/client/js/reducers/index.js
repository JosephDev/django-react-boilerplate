import { combineReducers } from 'redux';
import app from 'reducers/app';
import blog from 'reducers/blog';

export default combineReducers({
  app,
  blog,
});
