import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';

import { getTopicsSuccess, getTopicsFailure } from './actions';
import { GET_TOPICS_START } from './constants';

export function* getTopics() {
  try {
    const response = yield api.get(`/get-topics/all`,
      { headers: { Authorization: localStorage._UFT_ } });

    yield put(getTopicsSuccess(response.data.data));
  } catch (err) {
    yield put(getTopicsFailure(err.data.message));
  }
}
// Individual exports for testing
export default function* topicListPageSaga() {
  yield all([takeLatest(GET_TOPICS_START, getTopics)]);
}
