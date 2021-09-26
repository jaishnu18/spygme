import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the matchExpressionGame state domain
 */

const selectMatchExpressionGameDomain = state =>
  state.matchExpressionGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MatchExpressionGame
 */

const makeSelectMatchExpressionGame = () =>
  createSelector(
    selectMatchExpressionGameDomain,
    substate => substate,
  );

export default makeSelectMatchExpressionGame;
export { selectMatchExpressionGameDomain };
