// import { take, call, put, select } from 'redux-saga/effects';

import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
// import querystring from 'querystring';
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

export function* getTree(action) {
  try {
    const level = action.payload;

    const response = yield api.get(`/game/score-your-position/question/${level}`, {
      headers: { Authorization: localStorage._UFT_ },
    });
    console.log(response.data.data);
    yield put(getGameDataSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getGameDataFailure(err.data.message));
  }
}

// Individual exports for testing
export default function* scoreYourPositionSaga() {
  yield all([
    takeLatest(GET_GAME_DATA_START, getTree),
    // takeLatest(EVALUATE_RESPONSE_START, evaluateAnswer),
    // takeLatest(PUT_FEEDBACK_START, saveFeedback),
  ]);
}
