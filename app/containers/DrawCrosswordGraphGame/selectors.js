import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the drawCrosswordGraphGame state domain
 */

const selectDrawCrosswordGraphGameDomain = state =>
  state.drawCrosswordGraphGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DrawCrosswordGraphGame
 */

const makeSelectDrawCrosswordGraphGame = () =>
  createSelector(
    selectDrawCrosswordGraphGameDomain,
    substate => substate,
  );

export default makeSelectDrawCrosswordGraphGame;
export { selectDrawCrosswordGraphGameDomain };
