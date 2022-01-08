import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'global-settings';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';
import {
  getExpressionFailure,
  getExpressionSuccess,
  evaluateExpressionFailure,
  evaluateExpressionSuccess,
} from './actions';
import { GET_EXPRESSION_START, VALIDATE_EXPRESSION_START } from './constants';

// Individual exports for testing

export function* getExpression(action) {
  try {
    const level = action.payload;

    const response = yield api.get(
      `/game/treegame/question/${level}`,
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
    const response = yield api.post(
      `/game/treegame/question/validate`,
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

export default function* treeGamePageSaga() {
  yield all([
    takeLatest(GET_EXPRESSION_START, getExpression),
    takeLatest(VALIDATE_EXPRESSION_START, evaluateAnswer),
    // takeLatest(LOGOUT_START, logOutUser),
  ]);
}
