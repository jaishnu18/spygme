import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';

import { getTopicsSuccess, getTopicsFailure } from './actions';
import { GET_TOPICS_START } from './constants';

export function* getTopics() {
  try {
    const response = yield axios.get(`http://localhost:4000/v1/get-topics/all`,
      { headers: { Authorization: localStorage._UFT_ } });

    yield put(getTopicsSuccess(response.data.data));
  } catch (err) {
    yield put(getTopicsFailure(err.data.message));
  }
}
// Individual exports for testing
export default function* topicsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([takeLatest(GET_TOPICS_START, getTopics)]);
}
