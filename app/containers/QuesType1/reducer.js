/*
 *
 * QuesType1 reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_GAME_DATA_START,
  GET_GAME_DATA_SUCCESS,
  GET_GAME_DATA_FAILURE,
  EVALUATE_RESPONSE_START,
  EVALUATE_RESPONSE_SUCCESS,
  EVALUATE_RESPONSE_FAILURE,
} from './constants';

export const initialState = {
  isGameDataLoading: false,
  gameData: {},
  isResponseLoading: false,
  userResponse: {},
};

/* eslint-disable default-case, no-param-reassign */
const quesType1Reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GAME_DATA_START:
        draft.isGameDataLoading = true;
        break;
      case GET_GAME_DATA_SUCCESS:
        draft.isGameDataLoading = false;
        draft.gameData = action.payload;
        break;
      case GET_GAME_DATA_FAILURE:
        draft.isGameDataLoading = false;
        draft.gameData = action.payload;
        break;
      case EVALUATE_RESPONSE_START:
        draft.isResponseLoading = true;
        break;
      case EVALUATE_RESPONSE_SUCCESS:
        draft.isResponseLoading = false;
        draft.userResponse = action.payload;
        break;
      case EVALUATE_RESPONSE_FAILURE:
        draft.isResponseLoading = false;
        draft.userResponse = action.payload;
        break;
    }
  });

export default quesType1Reducer;
