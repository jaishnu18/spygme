import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the quesType1 state domain
 */

const selectQuesType1Domain = state => state.quesType1 || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by QuesType1
 */

const makeSelectQuesType1 = () =>
  createSelector(
    selectQuesType1Domain,
    substate => substate,
  );

export default makeSelectQuesType1;
export { selectQuesType1Domain };
