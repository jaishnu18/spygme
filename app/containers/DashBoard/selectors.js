import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashBoard state domain
 */

const selectDashBoardDomain = state => state.dashBoard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashBoard
 */

const makeSelectDashBoard = () =>
  createSelector(
    selectDashBoardDomain,
    substate => substate,
  );

export default makeSelectDashBoard;
export { selectDashBoardDomain };
