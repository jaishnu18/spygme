// import { take, call, put, select } from 'redux-saga/effects';

import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';
import {
  getGamesDataSuccess,
  getGamesDataFailure,
  evaluateResponseSuccess,
  evaluateResponseFailure,
} from './actions';
import { GET_GAME_DATA_START, EVALUATE_RESPONSE_START } from './constants'; // Individual exports for testing

export function* getCrossword() {
  try {
    const response = yield axios.get(
      `http://localhost:4000/game/write-expression/graded-quiz`,
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
    const response = yield axios.post(
      `http://localhost:4000/game/write-expression/graded-quiz/validate`,
      studentResponse,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(evaluateResponseSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(evaluateResponseFailure(err.data.message));
  }
}

// Individual exports for testing
export default function* gradedWriteExpressionGameSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_GAME_DATA_START, getCrossword),
    takeLatest(EVALUATE_RESPONSE_START, evaluateAnswer),
  ]);
}
