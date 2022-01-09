/*
 *
 * ReadingMaterialPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_RM_START,
  GET_RM_FAILURE,
  GET_RM_SUCCESS,
  MARK_READ_SUCCESS,
  MARK_READ_FAILURE,
  MARK_READ_START,
} from './constants';

export const initialState = {
  isReadingMaterialLoading: false,
  error: undefined,
  readingMaterialContent: undefined,
  isResponseLoading: false,
  responseRead: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const readingMaterialPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_RM_START:
        draft.isReadingMaterialLoading = true;
        break;
      case GET_RM_SUCCESS:
        draft.isReadingMaterialLoading = false;
        draft.readingMaterialContent = action.payload;
        break;
      case GET_RM_FAILURE:
        draft.isReadingMaterialLoading = false;
        draft.readingMaterialContent = action.payload;
        break;

      case MARK_READ_START:
        draft.isResponseLoading = true;
        break;
      case MARK_READ_SUCCESS:
        draft.isResponseLoading = false;
        break;
      case MARK_READ_FAILURE:
        draft.isResponseLoading = false;
        break;
    }
  });

export default readingMaterialPageReducer;
