/*
 *
 * GradedMatchExpressionGame reducer
 *
 */
import produce from 'immer';
import {
  GET_GAME_DATA_START,
  GET_GAME_DATA_SUCCESS,
  GET_GAME_DATA_FAILURE,
  EVALUATE_RESPONSE_START,
  EVALUATE_RESPONSE_SUCCESS,
  EVALUATE_RESPONSE_FAILURE,
} from './constants';

export const initialState = {
  isGameDataLoading: false,
  gameData: undefined,
  isResponseLoading: false,
  evaluatedAnswer: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const gradedMatchExpressionGameReducer = (state = initialState, action) =>
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
        draft.evaluatedAnswer = action.payload;
        break;
      case EVALUATE_RESPONSE_FAILURE:
        draft.isResponseLoading = false;
        draft.evaluatedAnswer = action.payload;
        break;
    }
  });

export default gradedMatchExpressionGameReducer;
