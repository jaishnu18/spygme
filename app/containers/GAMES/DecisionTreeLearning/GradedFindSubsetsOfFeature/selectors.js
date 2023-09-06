import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedFindSubsetsOfFeature state domain
 */

const selectGradedFindSubsetsOfFeatureDomain = state =>
  state.gradedFindSubsetsOfFeature || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedFindSubsetsOfFeature
 */

const makeSelectGradedFindSubsetsOfFeature = () =>
  createSelector(
    selectGradedFindSubsetsOfFeatureDomain,
    substate => substate,
  );

export default makeSelectGradedFindSubsetsOfFeature;
export { selectGradedFindSubsetsOfFeatureDomain };
