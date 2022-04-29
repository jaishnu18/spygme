import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the discussPage state domain
 */

const selectDiscussPageDomain = state => state.discussPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DiscussPage
 */

const makeSelectDiscussPage = () =>
  createSelector(
    selectDiscussPageDomain,
    substate => substate,
  );

export default makeSelectDiscussPage;
export { selectDiscussPageDomain };
