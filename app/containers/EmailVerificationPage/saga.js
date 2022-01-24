// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
import { verifyEmailSuccess, verifyEmailFailure } from './actions';
import { VERIFY_EMAIL_START } from './constants';

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
// Individual exports for testing
export default function* emailVerificationPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([takeLatest(VERIFY_EMAIL_START, verifyEmail)]);
}
