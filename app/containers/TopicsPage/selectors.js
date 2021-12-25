import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the topicsPage state domain
 */

const selectTopicsPageDomain = state => state.topicsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopicsPage
 */

const makeSelectTopicsPage = () =>
  createSelector(
    selectTopicsPageDomain,
    substate => substate,
  );

export default makeSelectTopicsPage;
export { selectTopicsPageDomain };
