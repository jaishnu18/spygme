import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedNodeConsistency state domain
 */

const selectGradedNodeConsistencyDomain = state =>
  state.gradedNodeConsistency || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedNodeConsistency
 */

const makeSelectGradedNodeConsistency = () =>
  createSelector(
    selectGradedNodeConsistencyDomain,
    substate => substate,
  );

export default makeSelectGradedNodeConsistency;
export { selectGradedNodeConsistencyDomain };
