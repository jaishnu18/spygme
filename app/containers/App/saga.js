/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { put, takeLatest, all } from 'redux-saga/effects';
import api from 'api';
import jwtDecode from 'jwt-decode';
import history from 'utils/history';
import {
  REMOVE_ERROR_MESSAGES,
  SIGNIN_START,
  SIGNOUT_START,
  SIGNUP_START,
} from './constants';

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

    const response = yield api.post(
      `/auth/login`,
      { email, password, gtoken },
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
    yield put(signinUserSuccess(info));
    history.push('/dashboard');
  } catch (err) {
    const { errors, errorsValidation } = err.response.data;

    if (errorsValidation) yield put(signinUserFailure(errorsValidation));
    else yield put(signupUserFailure(errors));
  }
}

export function* signupUser(action) {
  try {
    const {
      name,
      email,
      password,
      confirm_password,
      _class,
      organisation,
      userRole,
    } = action.payload;

    const response = yield api.post(
      `/auth/register`,
      {
        name,
        email,
        password,
        _class,
        confirm_password,
        userRole,
        organisation,
        domain: window.location.origin,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );

    console.log(response);

    const token = response.data.data;
    // const userToken = userData.data;
    const info = jwtDecode(token);
    // info.token = userToken;
    // info.isLoggedIn = true;

    // yield* setTokenToLocalStorage(userToken);
    yield put(signupUserSuccess(info.email));
  } catch (err) {
    const { errors, errorsValidation } = err.response.data;

    if (errorsValidation) yield put(signupUserFailure(errorsValidation));
    else yield put(signupUserFailure(errors));
  }
}

export function* signoutUser(action) {
  try {
    if (action.payload && action.payload.rating) {
      const { rating } = action.payload;

      const response = yield api.post(
        `/auth/user-rating`,
        {
          rating,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage._UFT_,
          },
        },
      );
    }
    localStorage.removeItem('_UFT_');
    yield put(signoutUserSuccess('Logged Out Successfully!'));
  } catch (err) {
    yield put(signoutUserFailure(err.response.data.message));
  }
}

export function* setTokenToLocalStorage(token) {
  const userToken = `${token}`;
  localStorage.setItem('_UFT_', userToken);
}

export function* removeErrorMessages() {
  yield put(signupUserFailure(undefined));
}

/**
 * Root saga manages watcher lifecycle
 */

export default function* appSaga() {
  yield all([
    takeLatest(SIGNIN_START, signinUser),
    takeLatest(SIGNUP_START, signupUser),
    takeLatest(SIGNOUT_START, signoutUser),
    takeLatest(REMOVE_ERROR_MESSAGES, removeErrorMessages),
  ]);
}
