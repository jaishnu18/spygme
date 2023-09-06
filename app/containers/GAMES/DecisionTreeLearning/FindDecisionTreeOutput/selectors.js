import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the findDecisionTreeOutput state domain
 */

const selectFindDecisionTreeOutputDomain = state =>
  state.findDecisionTreeOutput || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FindDecisionTreeOutput
 */

const makeSelectFindDecisionTreeOutput = () =>
  createSelector(
    selectFindDecisionTreeOutputDomain,
    substate => substate,
  );

export default makeSelectFindDecisionTreeOutput;
export { selectFindDecisionTreeOutputDomain };
