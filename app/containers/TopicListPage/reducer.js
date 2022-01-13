/*
 *
 * topicListPage reducer
 *
 */
import produce from 'immer';
import {
  GET_TOPICS_FAILURE,
  GET_TOPICS_START,
  GET_TOPICS_SUCCESS,
} from './constants';

export const initialState = {
  isTopicsLoading: false,
  topics: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const topicListPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TOPICS_START:
        draft.isTopicsLoading = true;
        break;
      case GET_TOPICS_SUCCESS:
        draft.isTopicsLoading = false;
        draft.topics = action.payload;
        break;
      case GET_TOPICS_FAILURE:
        draft.isTopicsLoading = false;
        draft.topics = action.payload;
        break;
    }
  });

export default topicListPageReducer;