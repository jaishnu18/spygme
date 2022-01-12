// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';

import { sendMessageFailure, sendMessageSuccess } from './actions';
import { SEND_MSG_START } from './constants';
export function* sendMessage(action) {
  try {
    const message = action.payload;
    const response = yield api.put(`/send-message/send`, message);
    yield put(sendMessageSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(sendMessageFailure(err.data.message));
  }
}
export default function* homePageSaga() {
  yield all([takeLatest(SEND_MSG_START, sendMessage)]);
  // See example in containers/HomePage/saga.js
}
