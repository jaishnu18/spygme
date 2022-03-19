/* eslint-disable no-console */
// import { take, call, put, select } from 'redux-saga/effects';

import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';

import {
  getExpressionFailure,
  getExpressionSuccess,
  evaluateExpressionFailure,
  evaluateExpressionSuccess,
  putFeedbackFailure,
  putFeedbackSuccess,
} from './actions';
import {
  GET_EXPRESSION_START,
  VALIDATE_EXPRESSION_START,
  PUT_FEEDBACK_START,
} from './constants';

// Individual exports for testing

export function* getExpression(action) {
  try {
    const level = action.payload;

    const response = yield api.get(`/game/evaluate-all-nodes/question/${level}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('_UFT_'),
      },
    });

    yield put(getExpressionSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getExpressionFailure(err.data.message));
  }
}

export function* evaluateAnswer(action) {
  try {
    const studentResponse = action.payload;
    console.log("studentResponse");

    const response = yield api.post(
      `/game/evaluate-all-nodes/question/validate`,
      studentResponse,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
      },
    );

    yield put(evaluateExpressionSuccess(response.data.data));
  } catch (err) {
    yield put(evaluateExpressionFailure(err.data.message));
  }
}

export function* saveFeedback(action) {
  try {
    const studentResponse = action.payload;
    const response = yield api.put(
      `/game/evaluate-all-nodes/feedback-save`,
      studentResponse,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
      },
    );
    yield put(putFeedbackSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(putFeedbackFailure(err.data.message));
  }
}

// Individual exports for testing
export default function* evaluateAllNodesGameSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_EXPRESSION_START, getExpression),
    takeLatest(VALIDATE_EXPRESSION_START, evaluateAnswer),
    takeLatest(PUT_FEEDBACK_START, saveFeedback),
    // takeLatest(LOGOUT_START, logOutUser),
  ]);
}
