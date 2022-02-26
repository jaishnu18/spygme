import { put, all, takeLatest } from 'redux-saga/effects';

import api from 'api';

import {
  getProfileFailure,
  getProfileSuccess,
  updatePasswordFailure,
  updatePasswordSuccess,
  updateProfileFailure,
  updateProfileSuccess,
} from './actions';

import {
  GET_PROFILE_START,
  UPDATE_PASSWORD_START,
  UPDATE_PROFILE_START,
} from './constants';

export function* getProfile() {
  try {
    const response = yield api.get(`/auth/profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('_UFT_'),
      },
      withCredentials: true,
    });

    console.log(response.data.data);

    yield put(getProfileSuccess(response.data.data));
  } catch (err) {
    const { errors } = err.response.data;

    yield put(getProfileFailure(errors));
  }
}

export function* updateProfile(action) {
  try {
    const { name, phoneNumber, __class, school, role } = action.payload;

    const response = yield api.post(
      `/auth/profile`,
      { name, phoneNumber, __class, school, role },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
        withCredentials: true,
      },
    );

    yield put(updateProfileSuccess(response.data.data));
  } catch (err) {
    const { errors, errorsValidation } = err.response.data;

    if (errorsValidation) yield put(updateProfileFailure(errorsValidation));
    else yield put(updateProfileFailure(errors));
  }
}

// Individual exports for testing
export default function* myProfilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_PROFILE_START, getProfile),
    takeLatest(UPDATE_PROFILE_START, updateProfile),
  ]);
}
