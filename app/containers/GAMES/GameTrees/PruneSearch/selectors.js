import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pruneSearch state domain
 */

const selectPruneSearchDomain = state => state.pruneSearch || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PruneSearch
 */

const makeSelectPruneSearch = () =>
  createSelector(
    selectPruneSearchDomain,
    substate => substate,
  );

export default makeSelectPruneSearch;
export { selectPruneSearchDomain };
