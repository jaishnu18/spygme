// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
import {
  verifyEmailSuccess,
  verifyEmailFailure,
  changePasswordSuccess,
  changePasswordFailure,
} from './actions';
import { VERIFY_EMAIL_START, CHANGE_PASSWORD_START } from './constants';

export function* verifyEmail(action) {
  try {
    const { token } = action.payload;
    const response = yield api.post(`/auth/verify/${token}`, {
      // headers: { Authorization: localStorage._UFT_ },
    });
    console.log(response);

    yield put(verifyEmailSuccess(response.data.message));
  } catch (err) {
    yield put(verifyEmailFailure(err.data.message));
  }
}

export function* changePassword(action) {
  try {
    const { token, password, passwordConfirm } = action.payload;
    const response = yield api.post(
      `/auth/reset-password/${token}`,
      { password, passwordConfirm },
      {
        // headers: { Authorization: localStorage._UFT_ },
      },
    );
    console.log(response);

    yield put(changePasswordSuccess(response.data.message));
  } catch (err) {
    yield put(changePasswordSuccess(err.data.message));
  }
}

// Individual exports for testing
export default function* resetPasswordPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(VERIFY_EMAIL_START, verifyEmail),
    takeLatest(CHANGE_PASSWORD_START, changePassword),
  ]);
}
