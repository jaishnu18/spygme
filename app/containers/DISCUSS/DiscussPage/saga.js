// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
// import querystring from 'querystring';
import {
  getAllThreadsSuccess,
  getAllThreadsFailure,
} from './actions';
import { GET_ALL_THREADS_START} from './constants';

export function* getAllThreads(action) {
  try {
    const response = yield api.get(`/discuss/all`, {
      headers: { Authorization: localStorage._UFT_ },
    });
    yield put(getAllThreadsSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getAllThreadsFailure(err.data.message));
  }
}
export default function* discussPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_ALL_THREADS_START, getAllThreads),
  ]);
}
