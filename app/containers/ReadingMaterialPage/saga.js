// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';

import {
  getReadingMaterialStart,
  getReadingMaterialFailure,
  getReadingMaterialSuccess
} from './actions';

import { GET_RM_START } from './constants';

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

// Individual exports for testing
export default function* readingMaterialPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_RM_START, getRMContent),
  ]);
}