import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newDashboardPage state domain
 */

const selectNewDashboardPageDomain = state =>
  state.newDashboardPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewDashboardPage
 */

const makeSelectNewDashboardPage = () =>
  createSelector(
    selectNewDashboardPageDomain,
    substate => substate,
  );

export default makeSelectNewDashboardPage;
export { selectNewDashboardPageDomain };
