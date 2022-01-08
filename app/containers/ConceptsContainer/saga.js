import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'global-settings';

import {
  getConceptsSuccess,
  getConceptsFailure,
  getTopicFailure,
  getTopicSuccess,
} from './actions';
import { GET_TOPIC_START, GET_CONCEPTS_START } from './constants';

export function* getTopic(action) {
  const { topicId } = action.payload;
  try {
    const response = yield api.get(
      `/get-topics/${topicId} `,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
        withCredentials: true,
      },
    );
    yield put(getTopicSuccess(response.data.data));
  } catch (err) {
    yield put(getTopicFailure(err.data.message));
  }
}

export function* getConcepts(action) {
  const { topicId } = action.payload;
  try {
    const response = yield api.get(
      `/get-concepts/${topicId} `,
      { headers: { Authorization: localStorage._UFT_ } },
    );

    yield put(getConceptsSuccess(response.data.data));
  } catch (err) {
    yield put(getConceptsFailure(err.data.message));
  }
}

// Individual exports for testing
export default function* conceptsContainerSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_TOPIC_START, getTopic),
    takeLatest(GET_CONCEPTS_START, getConcepts),
  ]);
}
