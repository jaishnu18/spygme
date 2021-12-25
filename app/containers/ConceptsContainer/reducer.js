/*
 *
 * ConceptsContainer reducer
 *
 */
import produce from 'immer';
import {
  GET_CONCEPTS_FAILURE,
  GET_CONCEPTS_START,
  GET_CONCEPTS_SUCCESS,
  GET_TOPIC_FAILURE,
  GET_TOPIC_START,
  GET_TOPIC_SUCCESS,
} from './constants';

export const initialState = {
  isLoadingTopicData: false,
  topicData: undefined,
  concepts: undefined,
  isConceptsLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const conceptsContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TOPIC_START:
        draft.isLoadingTopicData = true;
        break;
      case GET_TOPIC_SUCCESS:
        draft.isLoadingTopicData = false;
        draft.topicData = action.payload;
        break;
      case GET_TOPIC_FAILURE:
        draft.isLoadingTopicData = false;
        draft.topicData = action.payload;
        break;

      case GET_CONCEPTS_START:
        draft.isConceptsLoading = true;
        break;
      case GET_CONCEPTS_SUCCESS:
        draft.isConceptsLoading = false;
        draft.concepts = action.payload;
        break;
      case GET_CONCEPTS_FAILURE:
        draft.isConceptsLoading = false;
        draft.concepts = action.payload;
        break;
    }
  });

export default conceptsContainerReducer;
