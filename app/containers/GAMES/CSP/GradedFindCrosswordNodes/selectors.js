import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedFindCrosswordNodes state domain
 */

const selectGradedFindCrosswordNodesDomain = state =>
  state.gradedFindCrosswordNodes || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedFindCrosswordNodes
 */

const makeSelectGradedFindCrosswordNodes = () =>
  createSelector(
    selectGradedFindCrosswordNodesDomain,
    substate => substate,
  );

export default makeSelectGradedFindCrosswordNodes;
export { selectGradedFindCrosswordNodesDomain };
