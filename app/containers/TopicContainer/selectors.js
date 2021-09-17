import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the topicContainer state domain
 */

const selectTopicContainerDomain = state =>
  state.topicContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopicContainer
 */

const makeSelectTopicContainer = () =>
  createSelector(
    selectTopicContainerDomain,
    substate => substate,
  );

export default makeSelectTopicContainer;
export { selectTopicContainerDomain };
