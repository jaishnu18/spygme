import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedCrosswordBacktrackingGame state domain
 */

const selectGradedCrosswordBacktrackingGameDomain = state =>
  state.gradedCrosswordBacktrackingGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedCrosswordBacktrackingGame
 */

const makeSelectGradedCrosswordBacktrackingGame = () =>
  createSelector(
    selectGradedCrosswordBacktrackingGameDomain,
    substate => substate,
  );

export default makeSelectGradedCrosswordBacktrackingGame;
export { selectGradedCrosswordBacktrackingGameDomain };
