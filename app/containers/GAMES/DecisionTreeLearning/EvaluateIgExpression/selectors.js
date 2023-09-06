import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the evaluateIgExpression state domain
 */

const selectEvaluateIgExpressionDomain = state =>
  state.evaluateIgExpression || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EvaluateIgExpression
 */

const makeSelectEvaluateIgExpression = () =>
  createSelector(
    selectEvaluateIgExpressionDomain,
    substate => substate,
  );

export default makeSelectEvaluateIgExpression;
export { selectEvaluateIgExpressionDomain };
