import { put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import { getGamesFailure, getGamesSuccess } from './actions';
import { GET_GAMES_START } from './constants';

export function* getGames(action) {
  const { conceptId } = action.payload;
  try {
    const response = yield axios.get(
      `http://localhost:4000/v1/get-games/all/${conceptId} `,
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

// Individual exports for testing
export default function* conceptDescriptionPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([takeLatest(GET_GAMES_START, getGames)]);
}
