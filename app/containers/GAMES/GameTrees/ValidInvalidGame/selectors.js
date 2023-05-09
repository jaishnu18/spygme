import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the validInvalidGame state domain
 */

const selectValidInvalidGameDomain = state =>
  state.validInvalidGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ValidInvalidGame
 */

const makeSelectValidInvalidGame = () =>
  createSelector(
    selectValidInvalidGameDomain,
    substate => substate,
  );

export default makeSelectValidInvalidGame;
export { selectValidInvalidGameDomain };
