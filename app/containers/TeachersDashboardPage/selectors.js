import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the teachersDashboardPage state domain
 */

const selectTeachersDashboardPageDomain = state =>
  state.teachersDashboardPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TeachersDashboardPage
 */

const makeSelectTeachersDashboardPage = () =>
  createSelector(
    selectTeachersDashboardPageDomain,
    substate => substate,
  );

export default makeSelectTeachersDashboardPage;
export { selectTeachersDashboardPageDomain };
