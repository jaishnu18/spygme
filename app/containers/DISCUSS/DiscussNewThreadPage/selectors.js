import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the discussNewThreadPage state domain
 */

const selectDiscussNewThreadPageDomain = state =>
  state.discussNewThreadPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DiscussNewThreadPage
 */

const makeSelectDiscussNewThreadPage = () =>
  createSelector(
    selectDiscussNewThreadPageDomain,
    substate => substate,
  );

export default makeSelectDiscussNewThreadPage;
export { selectDiscussNewThreadPageDomain };
