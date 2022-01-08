import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'global-settings';
import {
  getGamesFailure,
  getGamesSuccess,
  getReadingMaterialSuccess,
  getReadingMaterialFailure,
} from './actions';
import { GET_GAMES_START, GET_RM_START } from './constants';

export function* getGames(action) {
  const { conceptId } = action.payload;
  try {
    const response = yield api.get(
      `/get-games/all/${conceptId} `,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
        withCredentials: true,
      },
    );
    yield put(getGamesSuccess(response.data.data));
  } catch (err) {
    yield put(getGamesFailure(err.data.message));
  }
}

export function* getReadingMaterial(action) {
  const { conceptId } = action.payload;
  try {
    const response = yield api.get(
      `/get-reading-materials/all/${conceptId} `,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
        withCredentials: true,
      },
    );
    yield put(getReadingMaterialSuccess(response.data.data));
  } catch (err) {
    yield put(getReadingMaterialFailure(err.data.message));
  }
}

// Individual exports for testing
export default function* conceptDescriptionPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_GAMES_START, getGames),
    takeLatest(GET_RM_START, getReadingMaterial),
  ]);
}
