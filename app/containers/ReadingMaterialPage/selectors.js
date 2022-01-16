import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the readingMaterialPage state domain
 */

const selectReadingMaterialPageDomain = state =>
  state.readingMaterialPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReadingMaterialPage
 */

const makeSelectReadingMaterialPage = () =>
  createSelector(
    selectReadingMaterialPageDomain,
    substate => substate,
  );

export default makeSelectReadingMaterialPage;
export { selectReadingMaterialPageDomain };
