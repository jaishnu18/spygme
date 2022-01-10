// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'global-settings';

import {
  getReadingMaterialFailure,
  getReadingMaterialSuccess,
  markAsReadFailure,
  markAsReadSuccess,
} from './actions';

import { GET_RM_START, MARK_READ_START } from './constants';

export function* getRMContent(action) {
  try {
    const { rmId } = action.payload;
    const response = yield api.get(`/get-reading-materials/rmContent/${rmId}`, {
      headers: { Authorization: localStorage._UFT_ },
    });
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
    const studentResponse = action.payload;
    const { rmId } = studentResponse;
    const response = yield api.put(
      `/get-reading-materials/mark/${rmId}`,
      studentResponse,
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
