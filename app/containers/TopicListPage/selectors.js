import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the topicListPage state domain
 */

const selectTopicListPageDomain = state => state.topicListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopicListPage
 */

const makeSelectTopicListPage = () =>
  createSelector(
    selectTopicListPageDomain,
    substate => substate,
  );

export default makeSelectTopicListPage;
export { selectTopicListPageDomain };
