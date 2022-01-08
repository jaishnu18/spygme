import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'global-settings';
// import globalSettings from 'global-settings';
import querystring from 'querystring';
import { activateAccountFailure, activateAccountSuccess } from './actions';
import { ACTIVATE_ACCOUNT_START } from './constants';

export function* activateUser(action) {
  try {
    const token = action.payload;
    console.log(token);
    const resp = yield api.post(
      `/auth/activate`,
      querystring.stringify({ token }),
    );

    yield put(activateAccountSuccess(resp));
  } catch (err) {
    console.log(err);
    yield put(activateAccountFailure(err));
  }
}

// Individual exports for testing
export default function* onBoardingPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(ACTIVATE_ACCOUNT_START, activateUser),
    // takeLatest(LOGOUT_START, logOutUser),
  ]);
}
