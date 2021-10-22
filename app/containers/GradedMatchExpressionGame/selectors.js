import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedMatchExpressionGame state domain
 */

const selectGradedMatchExpressionGameDomain = state =>
  state.gradedMatchExpressionGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedMatchExpressionGame
 */

const makeSelectGradedMatchExpressionGame = () =>
  createSelector(
    selectGradedMatchExpressionGameDomain,
    substate => substate,
  );

export default makeSelectGradedMatchExpressionGame;
export { selectGradedMatchExpressionGameDomain };
