/*
 *
 * TreeGamePage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_EXPRESSION_FAILURE,
  GET_EXPRESSION_START,
  GET_EXPRESSION_SUCCESS,
} from './constants';

export const initialState = {
  gameData: undefined,
  isExpressionLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const treeGamePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_EXPRESSION_START:
        draft.isExpressionLoading = true;
        break;
      case GET_EXPRESSION_SUCCESS:
        draft.gameData = action.payload;
        draft.isExpressionLoading = false;
        break;
      case GET_EXPRESSION_FAILURE:
        draft.isExpressionLoading = false;
        break;
    }
  });

export default treeGamePageReducer;
