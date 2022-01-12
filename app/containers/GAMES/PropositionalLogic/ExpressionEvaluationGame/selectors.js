import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the expressionEvaluationGame state domain
 */

const selectExpressionEvaluationGameDomain = state =>
  state.expressionEvaluationGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExpressionEvaluationGame
 */

const makeSelectExpressionEvaluationGame = () =>
  createSelector(
    selectExpressionEvaluationGameDomain,
    substate => substate,
  );

export default makeSelectExpressionEvaluationGame;
export { selectExpressionEvaluationGameDomain };
