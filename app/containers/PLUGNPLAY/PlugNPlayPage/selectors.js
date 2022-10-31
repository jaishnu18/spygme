import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the plugNPlayPage state domain
 */

const selectPlugNPlayPageDomain = state => state.plugNPlayPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PlugNPlayPage
 */

const makeSelectPlugNPlayPage = () =>
  createSelector(
    selectPlugNPlayPageDomain,
    substate => substate,
  );

export default makeSelectPlugNPlayPage;
export { selectPlugNPlayPageDomain };
