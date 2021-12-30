import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myProfilePage state domain
 */

const selectMyProfilePageDomain = state => state.myProfilePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyProfilePage
 */

const makeSelectMyProfilePage = () =>
  createSelector(
    selectMyProfilePageDomain,
    substate => substate,
  );

export default makeSelectMyProfilePage;
export { selectMyProfilePageDomain };
