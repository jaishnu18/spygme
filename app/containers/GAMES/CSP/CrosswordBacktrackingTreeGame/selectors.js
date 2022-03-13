import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crosswordBacktrackingTreeGame state domain
 */

const selectCrosswordBacktrackingTreeGameDomain = state =>
  state.crosswordBacktrackingTreeGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CrosswordBacktrackingTreeGame
 */

const makeSelectCrosswordBacktrackingTreeGame = () =>
  createSelector(
    selectCrosswordBacktrackingTreeGameDomain,
    substate => substate,
  );

export default makeSelectCrosswordBacktrackingTreeGame;
export { selectCrosswordBacktrackingTreeGameDomain };
