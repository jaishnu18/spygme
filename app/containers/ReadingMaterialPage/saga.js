// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';

import {
  getReadingMaterialStart,
  getReadingMaterialFailure,
  getReadingMaterialSuccess,
  markAsReadStart,
  markAsReadFailure,
  markAsReadSuccess
} from './actions';

import { GET_RM_START, MARK_READ_START } from './constants';

export function* getRMContent(action) {
  try {
    const { rmId } = action.payload;
    console.log(rmId);
    const response = yield axios.get(
      `http://localhost:4000/v1/get-reading-materials/rmContent/${rmId}`,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    console.log(response);
    yield put(getReadingMaterialSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(getReadingMaterialFailure(err.data.message));
  }
}

export function* markAsRead(action) {
  try {
    console.log(action.payload);
    const { rmId } = action.payload;
    console.log(rmId);
    const response = yield axios.post(
      `http://localhost:4000/v1/get-reading-materials/mark-as-read/${rmId}`,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    console.log(response);
    yield put(markAsReadSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(markAsReadFailure(err.data.message));
  }
}

// Individual exports for testing
export default function* readingMaterialPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_RM_START, getRMContent),
    takeLatest(MARK_READ_START, markAsRead),
  ]);
}