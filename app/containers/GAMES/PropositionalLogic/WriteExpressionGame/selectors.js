import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the writeExpressionGame state domain
 */

const selectWriteExpressionGameDomain = state =>
  state.writeExpressionGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WriteExpressionGame
 */

const makeSelectWriteExpressionGame = () =>
  createSelector(
    selectWriteExpressionGameDomain,
    substate => substate,
  );

export default makeSelectWriteExpressionGame;
export { selectWriteExpressionGameDomain };
