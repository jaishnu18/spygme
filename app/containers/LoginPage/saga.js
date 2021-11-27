import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import querystring from 'querystring';
import {
  getSignupSuccess,
  getSignupFailure,
  activateAccountFailure,
  activateAccountSuccess,
} from './actions';
import { GET_SIGNUP_START, ACTIVATE_ACCOUNT_START } from './constants';

export function* signupUser(action) {
  try {
    const { email } = action.payload;
    const { password } = action.payload;
    const { passwordConfirm } = action.payload;
    const { _class } = action.payload;
    const { name } = action.payload;

    const posts = yield axios.post(
      `http://localhost:5000/v1/auth/register`,
      querystring.stringify({ email, password, name, _class, passwordConfirm }),
    );
    // console.log(posts);

    yield put(getSignupSuccess(posts));
  } catch (err) {
    console.log(err);
    yield put(getSignupFailure(err.response.data.message));
  }
}

export function* activateUser(action) {
  try {
    const token = action.payload;
    console.log(token);
    const resp = yield axios.post(
      `http://localhost:5000/v1/auth/activate`,
      querystring.stringify({ token }),
    );

    yield put(activateAccountSuccess(resp));
  } catch (err) {
    console.log(err);
    yield put(activateAccountFailure(err));
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_SIGNUP_START, signupUser),
    takeLatest(ACTIVATE_ACCOUNT_START, activateUser),
    // takeLatest(LOGOUT_START, logOutUser),
  ]);
}
