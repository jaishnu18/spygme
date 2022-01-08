import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';
import {
  getExpressionFailure,
  getExpressionSuccess,
  evaluateExpressionFailure,
  evaluateExpressionSuccess,
  putFeedbackFailure,
  putFeedbackSuccess,
} from './actions';
import {
  GET_EXPRESSION_START, VALIDATE_EXPRESSION_START
  , PUT_FEEDBACK_START,
} from './constants';

// Individual exports for testing

export function* getExpression(action) {
  try {
    const level = action.payload;

    const response = yield axios.get(
      `http://localhost:4000/game/treegame/question/${level}`,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    console.log(response);
    yield put(getExpressionSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getExpressionFailure(err.data.message));
  }
}

export function* evaluateAnswer(action) {
  try {
    const studentResponse = action.payload;
    console.log(studentResponse);
    const response = yield axios.post(
      `http://localhost:4000/game/treegame/question/validate`,
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
      `http://localhost:4000/game/treegame/feedback-save`,
      studentResponse,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(putFeedbackSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(putFeedbackFailure(err.data.message));
  }
}

export default function* treeGamePageSaga() {
  yield all([
    takeLatest(GET_EXPRESSION_START, getExpression),
    takeLatest(VALIDATE_EXPRESSION_START, evaluateAnswer),
    takeLatest(PUT_FEEDBACK_START, saveFeedback),
    // takeLatest(LOGOUT_START, logOutUser),
  ]);
}
