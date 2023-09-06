import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedWhatIsTheDecision state domain
 */

const selectGradedWhatIsTheDecisionDomain = state =>
  state.gradedWhatIsTheDecision || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedWhatIsTheDecision
 */

const makeSelectGradedWhatIsTheDecision = () =>
  createSelector(
    selectGradedWhatIsTheDecisionDomain,
    substate => substate,
  );

export default makeSelectGradedWhatIsTheDecision;
export { selectGradedWhatIsTheDecisionDomain };
