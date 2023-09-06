import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the findFeatureWithHighestIg state domain
 */

const selectFindFeatureWithHighestIgDomain = state =>
  state.findFeatureWithHighestIg || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FindFeatureWithHighestIg
 */

const makeSelectFindFeatureWithHighestIg = () =>
  createSelector(
    selectFindFeatureWithHighestIgDomain,
    substate => substate,
  );

export default makeSelectFindFeatureWithHighestIg;
export { selectFindFeatureWithHighestIgDomain };
