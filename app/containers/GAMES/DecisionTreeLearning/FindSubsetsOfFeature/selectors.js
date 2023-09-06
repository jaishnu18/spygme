import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the findSubsetsOfFeature state domain
 */

const selectFindSubsetsOfFeatureDomain = state =>
  state.findSubsetsOfFeature || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FindSubsetsOfFeature
 */

const makeSelectFindSubsetsOfFeature = () =>
  createSelector(
    selectFindSubsetsOfFeatureDomain,
    substate => substate,
  );

export default makeSelectFindSubsetsOfFeature;
export { selectFindSubsetsOfFeatureDomain };
