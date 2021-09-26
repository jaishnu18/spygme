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

export function* getGraph(action) {
  try {
    const level = action.payload;

    const response = yield axios.get(
      `http://localhost:4000/game/match-expression/question/${level}`,
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
      `http://localhost:4000/game/match-expression/question/validate`,
      studentResponse,
    );
    yield put(evaluateResponseSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(evaluateResponseFailure(err.data.message));
  }
}
export default function* matchExpressionGameSaga() {
  yield all([
    takeLatest(GET_GAME_DATA_START, getGraph),
    takeLatest(EVALUATE_RESPONSE_START, evaluateAnswer),
  ]);
}
