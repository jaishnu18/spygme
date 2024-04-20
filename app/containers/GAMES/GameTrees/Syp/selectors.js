import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the syp state domain
 */

const selectSypDomain = state => state.syp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Syp
 */

const makeSelectSyp = () =>
  createSelector(
    selectSypDomain,
    substate => substate,
  );

export default makeSelectSyp;
export { selectSypDomain };

