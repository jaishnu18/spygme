import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the conceptDescriptionPage state domain
 */

const selectConceptDescriptionPageDomain = state =>
  state.conceptDescriptionPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConceptDescriptionPage
 */

const makeSelectConceptDescriptionPage = () =>
  createSelector(
    selectConceptDescriptionPageDomain,
    substate => substate,
  );

export default makeSelectConceptDescriptionPage;
export { selectConceptDescriptionPageDomain };
