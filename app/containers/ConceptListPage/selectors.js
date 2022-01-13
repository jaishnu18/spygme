import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the conceptListPage state domain
 */

const selectConceptListPageDomain = state =>
  state.conceptListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConceptListPage
 */

const makeSelectConceptListPage = () =>
  createSelector(
    selectConceptListPageDomain,
    substate => substate,
  );

export default makeSelectConceptListPage;
export { selectConceptListPageDomain };
