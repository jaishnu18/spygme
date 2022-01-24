import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkMailPage state domain
 */

const selectCheckMailPageDomain = state => state.checkMailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CheckMailPage
 */

const makeSelectCheckMailPage = () =>
  createSelector(
    selectCheckMailPageDomain,
    substate => substate,
  );

export default makeSelectCheckMailPage;
export { selectCheckMailPageDomain };
