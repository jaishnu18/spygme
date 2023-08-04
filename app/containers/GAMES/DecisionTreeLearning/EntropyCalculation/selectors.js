import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the entropyCalculation state domain
 */

const selectEntropyCalculationDomain = state =>
  state.entropyCalculation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EntropyCalculation
 */

const makeSelectEntropyCalculation = () =>
  createSelector(
    selectEntropyCalculationDomain,
    substate => substate,
  );

export default makeSelectEntropyCalculation;
export { selectEntropyCalculationDomain };
