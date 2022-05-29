import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the discussViewThreadPage state domain
 */

const selectDiscussViewThreadPageDomain = state =>
  state.discussViewThreadPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DiscussViewThreadPage
 */

const makeSelectDiscussViewThreadPage = () =>
  createSelector(
    selectDiscussViewThreadPageDomain,
    substate => substate,
  );

export default makeSelectDiscussViewThreadPage;
export { selectDiscussViewThreadPageDomain };
