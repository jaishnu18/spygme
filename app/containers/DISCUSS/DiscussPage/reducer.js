/*
 *
 * DiscussPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_ALL_THREADS_START,
  GET_ALL_THREADS_SUCCESS,
  GET_ALL_THREADS_FAILURE,
} from './constants';

export const initialState = {
  isResponseLoading: false,
  threadDetails: undefined,
};


/* eslint-disable default-case, no-param-reassign */
const discussPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_ALL_THREADS_START:
        draft.isResponseLoading = true;
        break;
      case GET_ALL_THREADS_SUCCESS:
        draft.isResponseLoading = false;
        draft.threadDetails = action.payload;
        break;
      case GET_ALL_THREADS_FAILURE:
        draft.isResponseLoading = false;
        draft.threadDetails = action.payload;
        break;
    }
  });

export default discussPageReducer;
