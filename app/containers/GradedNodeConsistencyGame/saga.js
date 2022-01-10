import { takeLatest, put, all } from 'redux-saga/effects';
import api from 'global-settings';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';
import {
  getGamesDataSuccess,
  getGamesDataFailure,
  evaluateResponseSuccess,
  evaluateResponseFailure,
} from './actions';
import { GET_GAME_DATA_START, EVALUATE_RESPONSE_START } from './constants'; //

export function* getCrossword() {
  try {
    const response = yield api.get(`/game/node-consistency-check/graded-quiz`, {
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
    console.log(action.payload);
    const studentResponse = action.payload;
    const response = yield api.post(
      `/game/node-consistency-check/graded-quiz/validate`,
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
export default function* gradedNodeConsistencyGameSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_GAME_DATA_START, getCrossword),
    takeLatest(EVALUATE_RESPONSE_START, evaluateAnswer),
  ]);
}
