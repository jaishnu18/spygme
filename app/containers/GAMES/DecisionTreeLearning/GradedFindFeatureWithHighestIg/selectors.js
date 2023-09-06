import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedFindFeatureWithHighestIg state domain
 */

const selectGradedFindFeatureWithHighestIgDomain = state =>
  state.gradedFindFeatureWithHighestIg || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedFindFeatureWithHighestIg
 */

const makeSelectGradedFindFeatureWithHighestIg = () =>
  createSelector(
    selectGradedFindFeatureWithHighestIgDomain,
    substate => substate,
  );

export default makeSelectGradedFindFeatureWithHighestIg;
export { selectGradedFindFeatureWithHighestIgDomain };
