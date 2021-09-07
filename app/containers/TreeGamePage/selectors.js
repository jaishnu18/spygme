import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the treeGamePage state domain
 */

const selectTreeGamePageDomain = state => state.treeGamePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TreeGamePage
 */

const makeSelectTreeGamePage = () =>
  createSelector(
    selectTreeGamePageDomain,
    substate => substate,
  );

export default makeSelectTreeGamePage;
export { selectTreeGamePageDomain };
