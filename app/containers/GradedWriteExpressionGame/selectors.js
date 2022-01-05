import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedWriteExpressionGame state domain
 */

const selectGradedWriteExpressionGameDomain = state =>
  state.gradedWriteExpressionGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedWriteExpressionGame
 */

const makeSelectGradedWriteExpressionGame = () =>
  createSelector(
    selectGradedWriteExpressionGameDomain,
    substate => substate,
  );

export default makeSelectGradedWriteExpressionGame;
export { selectGradedWriteExpressionGameDomain };
