import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedFindDecisionTreeOutput state domain
 */

const selectGradedFindDecisionTreeOutputDomain = state =>
  state.gradedFindDecisionTreeOutput || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedFindDecisionTreeOutput
 */

const makeSelectGradedFindDecisionTreeOutput = () =>
  createSelector(
    selectGradedFindDecisionTreeOutputDomain,
    substate => substate,
  );

export default makeSelectGradedFindDecisionTreeOutput;
export { selectGradedFindDecisionTreeOutputDomain };
