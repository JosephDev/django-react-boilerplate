import { all } from 'redux-saga/effects';

import blogSagas from 'sagas/blog';

export default function* rootSaga() {
  yield all([
    ...blogSagas,
  ]);
}
