import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the evaluateAllNodesGame state domain
 */

const selectEvaluateAllNodesGameDomain = state =>
  state.evaluateAllNodesGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EvaluateAllNodesGame
 */

const makeSelectEvaluateAllNodesGame = () =>
  createSelector(
    selectEvaluateAllNodesGameDomain,
    substate => substate,
  );

export default makeSelectEvaluateAllNodesGame;
export { selectEvaluateAllNodesGameDomain };
