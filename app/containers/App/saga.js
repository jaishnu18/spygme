/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
// import globalSettings from 'global-settings';
import jwtDecode from 'jwt-decode';
import history from 'utils/history';
import { SIGNIN_START, SIGNOUT_START, SIGNUP_START } from './constants';

import {
  signinUserSuccess,
  signinUserFailure,
  signupUserSuccess,
  signupUserFailure,
  signoutUserSuccess,
  signoutUserFailure,
} from './actions';

export function* signinUser(action) {
  try {
    const { email, password, gtoken } = action.payload;

    const response = yield axios.post(
      `http://localhost:4000/v1/auth/login`,
      { email, password, gtoken },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );

    console.log(response);

    const userData = response.data;
    const userToken = userData.data;
    const info = jwtDecode(userToken);
    info.token = userToken;
    info.isLoggedIn = true;

    yield* setTokenToLocalStorage(userToken);
    yield put(signinUserSuccess(info));
    history.push('/dashboard');
  } catch (err) {
    const { errors, errorsValidation } = err.response.data;

    if (errorsValidation) yield put(signinUserFailure(errorsValidation));
    else yield put(signupUserFailure(errors));

    console.log(errorsValidation);
    console.log(errors);
  }
}

export function* signupUser(action) {
  try {
    const { email, password } = action.payload;

    const response = yield axios.post(
      `http://localhost:4000/v1/auth/register`,
      { email, password },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );

    const userData = response.data;
    const userToken = userData.data;
    const info = jwtDecode(userToken);
    info.token = userToken;
    info.isLoggedIn = true;

    yield* setTokenToLocalStorage(userToken);
    yield put(signupUserSuccess(info));
    history.push('/dashboard');
  } catch (err) {
    const { errors, errorsValidation } = err.response.data;

    if (errorsValidation) yield put(signupUserFailure(errorsValidation));
    else yield put(signupUserFailure(errors));

    console.log(errorsValidation);
    console.log(errors);
  }
}

export function* signoutUser() {
  try {
    localStorage.removeItem('_UFT_');
    yield put(signoutUserSuccess());
    history.push('/');
  } catch (err) {
    console.log(err);
    yield put(signoutUserFailure(err.response.data.message));
  }
}

export function* setTokenToLocalStorage(token) {
  const userToken = `${token}`;
  localStorage.setItem('_UFT_', userToken);
}

/**
 * Root saga manages watcher lifecycle
 */

export default function* appSaga() {
  yield all([
    takeLatest(SIGNIN_START, signinUser),
    takeLatest(SIGNUP_START, signupUser),
    takeLatest(SIGNOUT_START, signoutUser),
  ]);
}
