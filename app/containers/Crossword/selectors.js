import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crossword state domain
 */

const selectCrosswordDomain = state => state.crossword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Crossword
 */

const makeSelectCrossword = () =>
  createSelector(
    selectCrosswordDomain,
    substate => substate,
  );

export default makeSelectCrossword;
export { selectCrosswordDomain };
