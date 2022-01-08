// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
// import globalSettings from 'global-settings';
// import querystring from 'querystring';

import {
  sendMessageFailure,
  sendMessageSuccess,
} from './actions';
import {
  SEND_MSG_START,
} from './constants';
export function* sendMessage(action) {
  try {
    console.log(action.payload);
    const message = action.payload;
    const response = yield axios.put(
      `http://localhost:4000/v1/send-message/send`,
      message,
    );
    yield put(sendMessageSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(sendMessageFailure(err.data.message));
  }
}
export default function* homePageSaga() {
  yield all([
    takeLatest(SEND_MSG_START, sendMessage),
  ]);
  // See example in containers/HomePage/saga.js
}
