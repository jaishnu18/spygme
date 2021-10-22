import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the findCrosswordNodesGame state domain
 */

const selectFindCrosswordNodesGameDomain = state =>
  state.findCrosswordNodesGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FindCrosswordNodesGame
 */

const makeSelectFindCrosswordNodesGame = () =>
  createSelector(
    selectFindCrosswordNodesGameDomain,
    substate => substate,
  );

export default makeSelectFindCrosswordNodesGame;
export { selectFindCrosswordNodesGameDomain };
