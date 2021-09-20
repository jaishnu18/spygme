import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the readPracticeGradeContainer state domain
 */

const selectReadPracticeGradeContainerDomain = state =>
  state.readPracticeGradeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReadPracticeGradeContainer
 */

const makeSelectReadPracticeGradeContainer = () =>
  createSelector(
    selectReadPracticeGradeContainerDomain,
    substate => substate,
  );

export default makeSelectReadPracticeGradeContainer;
export { selectReadPracticeGradeContainerDomain };
