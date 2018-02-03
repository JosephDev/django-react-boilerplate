import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import * as requests from 'sugar/requests';

import {
  GET_BLOG_START,
  GET_BLOG_ERROR,
  GET_BLOG_SUCCESS,
  POST_BLOG_START,
} from 'actions/blog';
import api from 'api';

// -------- Get blog

function createGetBlog() {
  return function* () { // eslint-disable-line consistent-return
    const { state, response } = yield call(() => requests.get('/api/blog/'));
    if (state) {
      const action = { type: GET_BLOG_SUCCESS, data: response };
      yield put(action);
    } else {
      const action = { type: GET_BLOG_ERROR, response };
    }
  };
}

function createPostBlog() {
  return function* (action) { // eslint-disable-line consistent-return
    const { state, response } = yield call(() => requests.post('/api/blog/', action.data));
    if (state) {
      const action = { type: GET_BLOG_SUCCESS, data: response };
      yield put(action);
    } else {
      const action = { type: GET_BLOG_ERROR, response };
    }
  };
}


export const getBlog = createGetBlog();
export const postBlog = createPostBlog();


export function* getBlogWatcher() {
  yield takeLatest(GET_BLOG_START, getBlog);
}

export function* postBlogWatcher() {
  yield takeEvery(POST_BLOG_START, postBlog);
}


export default [
  getBlogWatcher(),
  postBlogWatcher(),
];
