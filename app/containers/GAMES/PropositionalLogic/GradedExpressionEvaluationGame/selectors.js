import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedExpressionEvaluationGame state domain
 */

const selectGradedExpressionEvaluationGameDomain = state =>
  state.gradedExpressionEvaluationGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedExpressionEvaluationGame
 */

const makeSelectGradedExpressionEvaluationGame = () =>
  createSelector(
    selectGradedExpressionEvaluationGameDomain,
    substate => substate,
  );

export default makeSelectGradedExpressionEvaluationGame;
export { selectGradedExpressionEvaluationGameDomain };
