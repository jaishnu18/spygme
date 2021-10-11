import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the arcConsistencyGame state domain
 */

const selectArcConsistencyGameDomain = state =>
  state.arcConsistencyGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ArcConsistencyGame
 */

const makeSelectArcConsistencyGame = () =>
  createSelector(
    selectArcConsistencyGameDomain,
    substate => substate,
  );

export default makeSelectArcConsistencyGame;
export { selectArcConsistencyGameDomain };
