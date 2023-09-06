import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';

import {
  getGameDataSuccess,
  getGameDataFailure,
  evaluateResponseSuccess,
  evaluateResponseFailure,
  putFeedbackSuccess,
  putFeedbackFailure,
} from './actions';

import {
  GET_GAME_DATA_START,
  EVALUATE_RESPONSE_START,
  PUT_FEEDBACK_START,
} from './constants';

export function* getDataset(action) {
  try {
    const level = action.payload;

    const response = yield api.get(`/game/find-subsets-of-feature/question/${level}`, {
      headers: { Authorization: localStorage._UFT_ },
    });

    yield put(getGameDataSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getGameDataFailure(err.data.message));
  }
}

export function* evaluateAnswer(action) {
  try {
    const studentResponse = action.payload;

    const response = yield api.post(
      `/game/find-subsets-of-feature/question/validate`,
      studentResponse,
      { headers: { Authorization: localStorage._UFT_ } },
    );

    yield put(evaluateResponseSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(evaluateResponseFailure(err.data.message));
  }
}

export function* putFeedback(action) {
  try {
    const studentResponse = action.payload;
    const response = yield api.put(
      `/game/find-subsets-of-feature/feedback-save`,
      studentResponse,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(putFeedbackSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(putFeedbackFailure(err.data.message));
  }
}

// Individual exports for testing
export default function* findSubsetsOfFeatureSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_GAME_DATA_START, getDataset),
    takeLatest(EVALUATE_RESPONSE_START, evaluateAnswer),
    takeLatest(PUT_FEEDBACK_START, putFeedback),
  ]);
}
