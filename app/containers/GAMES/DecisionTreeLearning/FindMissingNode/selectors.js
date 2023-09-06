import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the findMissingNode state domain
 */

const selectFindMissingNodeDomain = state =>
  state.findMissingNode || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FindMissingNode
 */

const makeSelectFindMissingNode = () =>
  createSelector(
    selectFindMissingNodeDomain,
    substate => substate,
  );

export default makeSelectFindMissingNode;
export { selectFindMissingNodeDomain };
