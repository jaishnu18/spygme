import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedFindMissingNode state domain
 */

const selectGradedFindMissingNodeDomain = state =>
  state.gradedFindMissingNode || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedFindMissingNode
 */

const makeSelectGradedFindMissingNode = () =>
  createSelector(
    selectGradedFindMissingNodeDomain,
    substate => substate,
  );

export default makeSelectGradedFindMissingNode;
export { selectGradedFindMissingNodeDomain };
