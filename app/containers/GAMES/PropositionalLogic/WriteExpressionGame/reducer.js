/*
 *
 * WriteExpressionGame reducer
 *
 */
import produce from 'immer';
import {
  GET_GRAPH_FAILURE,
  GET_GRAPH_SUCCESS,
  GET_GRAPH_START,
  VALIDATE_EXPRESSION_FAILURE,
  VALIDATE_EXPRESSION_START,
  VALIDATE_EXPRESSION_SUCCESS,
  PUT_FEEDBACK_FAILURE,
  PUT_FEEDBACK_START,
  PUT_FEEDBACK_SUCCESS,
} from './constants';

export const initialState = {
  isGraphLoading: false,
  gameData: undefined,
  isCheckingAnswer: false,
  evaluatedAnswer: undefined,
  isFeedbackSaving: false,
};

/* eslint-disable default-case, no-param-reassign */
const writeExpressionGameReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GRAPH_START:
        draft.isGraphLoading = true;
        break;
      case GET_GRAPH_SUCCESS:
        draft.gameData = action.payload;
        draft.isGraphLoading = false;
        break;
      case GET_GRAPH_FAILURE:
        draft.isGraphLoading = false;
        break;
      case VALIDATE_EXPRESSION_START:
        draft.isCheckingAnswer = true;
        break;
      case VALIDATE_EXPRESSION_SUCCESS:
        draft.evaluatedAnswer = action.payload;
        draft.isCheckingAnswer = false;
        break;
      case VALIDATE_EXPRESSION_FAILURE:
        draft.isCheckingAnswer = false;
        break;
      case PUT_FEEDBACK_START:
        draft.isFeedbackSaving = true;
        break;
      case PUT_FEEDBACK_SUCCESS:
        draft.isFeedbackSaving = false;
        break;
      case PUT_FEEDBACK_FAILURE:
        draft.isFeedbackSaving = false;
        break;
    }
  });

export default writeExpressionGameReducer;
