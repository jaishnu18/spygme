/*
 *
 * DiscussNewThreadPage reducer
 *
 */
import produce from 'immer';
import { 
  DEFAULT_ACTION, 
  POST_NEW_THREAD_START,
  POST_NEW_THREAD_SUCCESS,
  POST_NEW_THREAD_FAILURE,
} from './constants';

export const initialState = {
  isResponseLoading: false,
  threadDetails: undefined,
};


/* eslint-disable default-case, no-param-reassign */
const discussNewThreadPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case POST_NEW_THREAD_START:
        draft.isResponseLoading = true;
        break;
      case POST_NEW_THREAD_SUCCESS:
        draft.isResponseLoading = false;
        draft.threadDetails = action.payload;
        break;
      case POST_NEW_THREAD_FAILURE:
        draft.isResponseLoading = false;
        draft.threadDetails = action.payload;
        break;
    }
  });

export default discussNewThreadPageReducer;
