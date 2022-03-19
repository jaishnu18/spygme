import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedEvaluateAllNodesGame state domain
 */

const selectGradedEvaluateAllNodesGameDomain = state =>
  state.gradedEvaluateAllNodesGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedEvaluateAllNodesGame
 */

const makeSelectGradedEvaluateAllNodesGame = () =>
  createSelector(
    selectGradedEvaluateAllNodesGameDomain,
    substate => substate,
  );

export default makeSelectGradedEvaluateAllNodesGame;
export { selectGradedEvaluateAllNodesGameDomain };
