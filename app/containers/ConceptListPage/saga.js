import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';

import {
  getConceptsSuccess,
  getConceptsFailure,
  getConceptsPrereqSuccess,
  getConceptsPrereqFailure,
  getTopicFailure,
  getTopicSuccess,
} from './actions';
import { GET_TOPIC_START, GET_CONCEPTS_START, GET_CONCEPTS_PREREQ_START } from './constants';

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

export function* getConceptsPrereq(action) {
  try {
    console.log(action.payload);
    const response = yield api.post(
      `/get-concepts/prereq/${action.payload.topicId} `,
      action.payload,
      { headers: { Authorization: localStorage._UFT_ } },
    );

    yield put(getConceptsPrereqSuccess(response.data.data));
  } catch (err) {
    yield put(getConceptsPrereqFailure(err.data.message));
  }
}

export default function* conceptListPageSaga() {
  yield all([
    takeLatest(GET_TOPIC_START, getTopic),
    takeLatest(GET_CONCEPTS_START, getConcepts),
    takeLatest(GET_CONCEPTS_PREREQ_START, getConceptsPrereq),
  ]);
}
