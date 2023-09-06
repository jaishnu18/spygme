import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedEvaluateIgExpression state domain
 */

const selectGradedEvaluateIgExpressionDomain = state =>
  state.gradedEvaluateIgExpression || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedEvaluateIgExpression
 */

const makeSelectGradedEvaluateIgExpression = () =>
  createSelector(
    selectGradedEvaluateIgExpressionDomain,
    substate => substate,
  );

export default makeSelectGradedEvaluateIgExpression;
export { selectGradedEvaluateIgExpressionDomain };
