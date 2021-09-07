import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';
import { getExpressionFailure, getExpressionSuccess } from './actions';
import { GET_EXPRESSION_START } from './constants';

// Individual exports for testing

export function* getExpression(action) {
  try {
    const level = action.payload;

    const response = yield axios.get(
      `http://localhost:4000/game/treegame/question/${level}`,
    );
    console.log(response);
    yield put(getExpressionSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getExpressionFailure(err.data.message));
  }
}

export default function* treeGamePageSaga() {
  yield all([
    takeLatest(GET_EXPRESSION_START, getExpression),
    // takeLatest(LOGOUT_START, logOutUser),
  ]);
}
