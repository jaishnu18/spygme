import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the testNotAllowedPage state domain
 */

const selectTestNotAllowedPageDomain = state =>
  state.testNotAllowedPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TestNotAllowedPage
 */

const makeSelectTestNotAllowedPage = () =>
  createSelector(
    selectTestNotAllowedPageDomain,
    substate => substate,
  );

export default makeSelectTestNotAllowedPage;
export { selectTestNotAllowedPageDomain };
