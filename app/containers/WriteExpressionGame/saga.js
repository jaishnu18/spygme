// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';
import {
  getGraphSuccess,
  getGraphFailure,
  evaluateExpressionSuccess,
  evaluateExpressionFailure,
} from './actions';
import { GET_GRAPH_START, VALIDATE_EXPRESSION_START } from './constants';

// Individual exports for testing

export function* getGraph(action) {
  try {
    const level = action.payload;

    const response = yield axios.get(
      `http://localhost:4000/game/write-expression/question/${level}`,
    );
    console.log(response);
    yield put(getGraphSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getGraphFailure(err.data.message));
  }
}

export function* evaluateAnswer(action) {
  try {
    console.log(action.payload);
    const studentResponse = action.payload;
    const response = yield axios.post(
      `http://localhost:4000/game/write-expression/question/validate`,
      studentResponse,
    );
    yield put(evaluateExpressionSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(evaluateExpressionFailure(err.data.message));
  }
}

export default function* writeExpressionGameSaga() {
  yield all([
    takeLatest(GET_GRAPH_START, getGraph),
    takeLatest(VALIDATE_EXPRESSION_START, evaluateAnswer),
  ]);
}
