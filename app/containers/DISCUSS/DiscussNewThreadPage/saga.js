// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
// import querystring from 'querystring';
import {
  getConceptsSuccess,
  getConceptsFailure,
  postNewThreadSuccess,
  postNewThreadFailure,
} from './actions';
import { GET_CONCEPTS_START, POST_NEW_THREAD_START } from './constants';

// Individual exports for testing
export function* getConcepts(action) {
  try {
    const response = yield api.get(
      `/discuss/get-concepts`,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(getConceptsSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getConceptsFailure(err.data.message));
  }
}
export function* postNewThread(action) {
  try {
    console.log(action.payload);
    const threadDetails = action.payload;
    const response = yield api.post(
      `/discuss/post-thread`,
      threadDetails,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(postNewThreadSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(postNewThreadFailure(err.data.message));
  }
}
export default function* discussNewThreadPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_CONCEPTS_START, getConcepts),
    takeLatest(POST_NEW_THREAD_START, postNewThread),
  ]);
}
