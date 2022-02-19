// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
import { forgotPasswordFailure, forgotPasswordSuccess } from './actions';
import { FORGOT_PASSWORD_START } from './constants';

export function* forgotPassword(action) {
  try {
    const { email } = action.payload;
    console.log(email);
    const response = yield api.post(`/auth/forgot-password`, {
      email,
      domain: window.location.origin,
    });
    console.log(response);

    yield put(forgotPasswordSuccess(email));
  } catch (err) {
    yield put(forgotPasswordFailure(err.data.message));
  }
}

// Individual exports for testing
export default function* forgotPasswordPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([takeLatest(FORGOT_PASSWORD_START, forgotPassword)]);
}
