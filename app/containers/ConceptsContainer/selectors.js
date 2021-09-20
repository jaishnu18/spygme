import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the conceptsContainer state domain
 */

const selectConceptsContainerDomain = state =>
  state.conceptsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConceptsContainer
 */

const makeSelectConceptsContainer = () =>
  createSelector(
    selectConceptsContainerDomain,
    substate => substate,
  );

export default makeSelectConceptsContainer;
export { selectConceptsContainerDomain };
