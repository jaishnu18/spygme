/*
 *
 * DiscussViewThreadPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  VIEW_THREAD_START,
  VIEW_THREAD_SUCCESS,
  VIEW_THREAD_FAILURE,
  POST_COMMENT_START,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
} from './constants';

export const initialState = {
  isResponseLoading: false,
  threadDetails: undefined,
  isCommentLoading: false,
  commentDetails: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const discussViewThreadPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case VIEW_THREAD_START:
        draft.isResponseLoading = true;
        break;
      case VIEW_THREAD_SUCCESS:
        draft.isResponseLoading = false;
        draft.threadDetails = action.payload;
        break;
      case VIEW_THREAD_FAILURE:
        draft.isResponseLoading = false;
        draft.threadDetails = action.payload;
        break;
      case POST_COMMENT_START:
        draft.isCommentLoading = true;
        break;
      case POST_COMMENT_SUCCESS:
        draft.isCommentLoading = false;
        draft.commentDetails = action.payload;
        break;
      case POST_COMMENT_FAILURE:
        draft.isCommentLoading = false;
        draft.commentDetails = action.payload;
        break;
    }
  });

export default discussViewThreadPageReducer;
