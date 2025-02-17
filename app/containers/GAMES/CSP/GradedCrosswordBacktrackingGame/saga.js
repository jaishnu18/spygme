// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
// import querystring from 'querystring';
import {
  getGamesDataSuccess,
  getGamesDataFailure,
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

export function* getCrossword() {
  try {
    const response = yield api.get(`/game/crossword-backtracking-tree/graded-quiz`, {
      headers: { Authorization: localStorage._UFT_ },
    });
    console.log(response);
    yield put(getGamesDataSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getGamesDataFailure(err.data.message));
  }
}

export function* evaluateAnswer(action) {
  try {
    const studentResponse = action.payload;
    const response = yield api.post(
      `/game/crossword-backtracking-tree/graded-quiz/validate`,
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
      `/game/crossword-backtracking-tree/feedback-save`,
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
export default function* gradedDrawCrosswordGraphSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_GAME_DATA_START, getCrossword),
    takeLatest(EVALUATE_RESPONSE_START, evaluateAnswer),
    takeLatest(PUT_FEEDBACK_START, saveFeedback),
  ]);
}
