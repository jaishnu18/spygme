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
  RECORD_TIME_SUCCESS,
  RECORD_TIME_START,
  RECORD_TIME_FAILURE
} from './constants';

export const initialState = {
  isReadingMaterialLoading: false,
  error: undefined,
  readingMaterialContent: undefined,
  isResponseLoading: false,
  isTimeRecording: false,
  timeRecorded: undefined
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

      case RECORD_TIME_START:
        draft.isTimeRecording = true;
        break;
      case RECORD_TIME_SUCCESS:
        draft.isTimeRecording = false;
        draft.timeRecorded = action.payload;
        break;
      case RECORD_TIME_FAILURE:
        draft.isTimeRecording = false;
        draft.timeRecorded = action.payload;
        break;
    }
  });

export default readingMaterialPageReducer;
