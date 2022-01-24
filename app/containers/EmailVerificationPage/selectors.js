import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the emailVerificationPage state domain
 */

const selectEmailVerificationPageDomain = state =>
  state.emailVerificationPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmailVerificationPage
 */

const makeSelectEmailVerificationPage = () =>
  createSelector(
    selectEmailVerificationPageDomain,
    substate => substate,
  );

export default makeSelectEmailVerificationPage;
export { selectEmailVerificationPageDomain };
