import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the onBoardingPage state domain
 */

const selectOnBoardingPageDomain = state =>
  state.onBoardingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OnBoardingPage
 */

const makeSelectOnBoardingPage = () =>
  createSelector(
    selectOnBoardingPageDomain,
    substate => substate,
  );

export default makeSelectOnBoardingPage;
export { selectOnBoardingPageDomain };
