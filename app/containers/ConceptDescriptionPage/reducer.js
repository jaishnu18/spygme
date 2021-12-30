/*
 *
 * ConceptDescriptionPage reducer
 *
 */
import produce from 'immer';
import {
  GET_GAMES_START,
  GET_GAMES_FAILURE,
  GET_GAMES_SUCCESS,
} from './constants';

export const initialState = {
  games: undefined,
  isGamesLoading: false,
  error: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const conceptDescriptionPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GAMES_START:
        draft.isGamesLoading = true;
        break;
      case GET_GAMES_SUCCESS:
        draft.isGamesLoading = false;
        draft.games = action.payload;
        break;
      case GET_GAMES_FAILURE:
        draft.isGamesLoading = false;
        draft.error = action.payload;
        break;
    }
  });

export default conceptDescriptionPageReducer;
