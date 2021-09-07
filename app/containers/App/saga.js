/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import globalSettings from 'global-settings';
import { LOGIN_USER_WITH_EMAIL, LOGOUT_START } from './constants';

import {
  loginUserWithEmailFailure,
  loginUserWithEmailSuccess,
  logoutUserFailure,
  logoutUserSuccess,
} from './actions';

export function* loginUser(action) {
  try {
    // get auth token

    const { email } = action.payload.values;
    const { password } = action.payload.values;

    const response = yield axios.post(
      `${globalSettings.backendApi}${globalSettings.backendApiVersion.v1}/${
        globalSettings.auth
      }/login`,
      { email, password },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );

    const userData = response.data.data;
    localStorage.setItem('SessionId', response.data.sessionId);

    const userToken = userData.token;
    yield* setTokenToLocalStorage(userToken);

    userData.isLoggedIn = true;
    yield* setTokenToLocalStorage(userToken, action.payload.rememberMe);

    yield put(loginUserWithEmailSuccess(userData));
  } catch (err) {
    console.log(err);
    yield put(loginUserWithEmailFailure('Incorrect Email or Password!'));
  }
}

export function* logOutUser() {
  const currAuthToken = localStorage._UFT_;
  try {
    localStorage.removeItem('_UFT_');
    localStorage.removeItem('SessionId');
    yield put(logoutUserSuccess());
    window.location.reload();
  } catch (err) {
    console.log(err);
    localStorage._UFT_ = currAuthToken;
    yield put(logoutUserFailure(err.response.data.message));
  }
}

export function* setTokenToLocalStorage(token, isSessionPersisted) {
  const userToken = `Bearer-${token}`;
  if (isSessionPersisted) {
    localStorage.setItem('_UFT_', userToken);
  } else {
    sessionStorage.setItem('_UFT_', userToken);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  // Watches for LOGIN_USER_WITH_EMAIL actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(LOGIN_USER_WITH_EMAIL, loginUser),
    takeLatest(LOGOUT_START, logOutUser),
  ]);
}
