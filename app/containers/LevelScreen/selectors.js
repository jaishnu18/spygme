import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the levelScreen state domain
 */

const selectLevelScreenDomain = state => state.levelScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LevelScreen
 */

const makeSelectLevelScreen = () =>
  createSelector(
    selectLevelScreenDomain,
    substate => substate,
  );

export default makeSelectLevelScreen;
export { selectLevelScreenDomain };
