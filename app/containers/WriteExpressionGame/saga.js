// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'global-settings';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';
import {
  getGraphSuccess,
  getGraphFailure,
  evaluateExpressionSuccess,
  evaluateExpressionFailure,
  putFeedbackFailure,
  putFeedbackSuccess,
} from './actions';
import {
  GET_GRAPH_START, VALIDATE_EXPRESSION_START
  , PUT_FEEDBACK_START,
} from './constants';

// Individual exports for testing

export function* getGraph(action) {
  try {
    const level = action.payload;

    const response = yield api.get(
      `/game/write-expression/question/${level}`,
      { headers: { Authorization: localStorage._UFT_ } },
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
    const studentResponse = action.payload;
    console.log(studentResponse);
    const response = yield api.post(
      `/game/write-expression/question/validate`,
      studentResponse,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
        withCredentials: true,
      },
    );
    yield put(evaluateExpressionSuccess(response.data.data));
  } catch (err) {
    yield put(evaluateExpressionFailure(err.data.message));
  }
}
export function* saveFeedback(action) {
  try {
    console.log(action.payload);
    const studentResponse = action.payload;
    const response = yield axios.put(
      `http://localhost:4000/game/write-expression/feedback-save`,
      studentResponse,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(putFeedbackSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(putFeedbackFailure(err.data.message));
  }
}
export default function* writeExpressionGameSaga() {
  yield all([
    takeLatest(GET_GRAPH_START, getGraph),
    takeLatest(VALIDATE_EXPRESSION_START, evaluateAnswer),
    takeLatest(PUT_FEEDBACK_START, saveFeedback),
  ]);
}
