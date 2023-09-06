import { put, takeLatest, all } from 'redux-saga/effects';
import api from 'api';

import {
  getGameDataSuccess,
  getGameDataFailure,
  evaluateResponseSuccess,
  evaluateResponseFailure,
  putFeedbackFailure,
  putFeedbackSuccess,
} from './actions';

import {
  GET_GAME_DATA_START,
  EVALUATE_RESPONSE_START,
  PUT_FEEDBACK_START,
} from './constants'; // Individual exports for testing

export function* getData() {
  try {
    const response = yield api.get(`/game/find-decision-tree-output/graded-quiz`, {
      headers: { Authorization: localStorage._UFT_ },
    });

    console.log('res: ', response.data.data);
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
      `/game/find-decision-tree-output/graded-quiz/validate`,
      studentResponse,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(evaluateResponseSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(evaluateResponseFailure(err.data.message));
  }
}
export function* saveFeedback(action) {
  try {
    const studentResponse = action.payload;
    const response = yield api.put(
      `/game/find-decision-tree-output/feedback-save`,
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
export default function* gradedFindDecisionTreeOutputSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_GAME_DATA_START, getData),
    takeLatest(EVALUATE_RESPONSE_START, evaluateAnswer),
    takeLatest(PUT_FEEDBACK_START, saveFeedback),
  ]);
}
