import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nodeConsistencyGame state domain
 */

const selectNodeConsistencyGameDomain = state =>
  state.nodeConsistencyGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NodeConsistencyGame
 */

const makeSelectNodeConsistencyGame = () =>
  createSelector(
    selectNodeConsistencyGameDomain,
    substate => substate,
  );

export default makeSelectNodeConsistencyGame;
export { selectNodeConsistencyGameDomain };
