import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedDrawCrosswordGraph state domain
 */

const selectGradedDrawCrosswordGraphDomain = state =>
  state.gradedDrawCrosswordGraph || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedDrawCrosswordGraph
 */

const makeSelectGradedDrawCrosswordGraph = () =>
  createSelector(
    selectGradedDrawCrosswordGraphDomain,
    substate => substate,
  );

export default makeSelectGradedDrawCrosswordGraph;
export { selectGradedDrawCrosswordGraphDomain };
