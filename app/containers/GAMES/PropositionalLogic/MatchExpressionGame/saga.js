// import { take, call, put, select } from 'redux-saga/effects';

import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
// import globalSettings from 'global-settings';
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

export function* getGraph(action) {
  try {
    const level = action.payload;

    const response = yield api.get(
      `/game/match-expression/question/${level}`,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    console.log(response);
    yield put(getGamesDataSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getGamesDataFailure(err.data.message));
  }
}

export function* evaluateAnswer(action) {
  try {
    console.log(action.payload);
    const studentResponse = action.payload;
    const response = yield api.post(
      `/game/match-expression/question/validate`,
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
    console.log(action.payload);
    const studentResponse = action.payload;
    const response = yield api.put(
      `/game/match-expression/feedback-save`,
      studentResponse,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(putFeedbackSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(putFeedbackFailure(err.data.message));
  }
}

export default function* matchExpressionGameSaga() {
  yield all([
    takeLatest(GET_GAME_DATA_START, getGraph),
    takeLatest(EVALUATE_RESPONSE_START, evaluateAnswer),
    takeLatest(PUT_FEEDBACK_START, saveFeedback),
  ]);
}
