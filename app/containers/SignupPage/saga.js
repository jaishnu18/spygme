import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
// import globalSettings from 'global-settings';
import querystring from 'querystring';
import { getSignupSuccess, getSignupFailure } from './actions';
import { GET_SIGNUP_START } from './constants';

export function* signupUser(action) {
  try {
    const { email } = action.payload;
    const { password } = action.payload;
    const { passwordConfirm } = action.payload;
    const { _class } = action.payload;
    const { name } = action.payload;

    const posts = yield axios.post(
      `http://localhost:4000/v1/auth/register`,
      querystring.stringify({ email, password, name, _class, passwordConfirm }),
    );
    // console.log(posts);

    yield put(getSignupSuccess(posts));
  } catch (err) {
    console.log(err);
    yield put(getSignupFailure(err.response.data.message));
  }
}

// Individual exports for testing
export default function* signupPageSaga() {
  yield all([
    takeLatest(GET_SIGNUP_START, signupUser),
    // takeLatest(LOGOUT_START, logOutUser),
  ]);
}
