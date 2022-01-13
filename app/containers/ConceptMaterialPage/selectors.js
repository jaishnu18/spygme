import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the conceptMaterialPage state domain
 */

const selectConceptMaterialPageDomain = state =>
  state.conceptMaterialPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConceptMaterialPage
 */

const makeSelectConceptMaterialPage = () =>
  createSelector(
    selectConceptMaterialPageDomain,
    substate => substate,
  );

export default makeSelectConceptMaterialPage;
export { selectConceptMaterialPageDomain };
