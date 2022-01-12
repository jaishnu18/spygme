import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedArcConsistency state domain
 */

const selectGradedArcConsistencyDomain = state =>
  state.gradedArcConsistency || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedArcConsistency
 */

const makeSelectGradedArcConsistency = () =>
  createSelector(
    selectGradedArcConsistencyDomain,
    substate => substate,
  );

export default makeSelectGradedArcConsistency;
export { selectGradedArcConsistencyDomain };
