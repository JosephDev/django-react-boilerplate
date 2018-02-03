import { Map } from 'immutable';

import {
  GET_BLOG_START,
  GET_BLOG_ERROR,
  GET_BLOG_SUCCESS,
} from 'actions/blog';

const initialState = Map({
  loading: false,
  error: null,
  blog: null,
});

const actionsMap = {
  // Async action
  [GET_BLOG_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      blog: null,
    }));
  },
  [GET_BLOG_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_BLOG_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      blog: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
