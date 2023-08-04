import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedEntropyCalculation state domain
 */

const selectGradedEntropyCalculationDomain = state =>
  state.gradedEntropyCalculation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedEntropyCalculation
 */

const makeSelectGradedEntropyCalculation = () =>
  createSelector(
    selectGradedEntropyCalculationDomain,
    substate => substate,
  );

export default makeSelectGradedEntropyCalculation;
export { selectGradedEntropyCalculationDomain };
