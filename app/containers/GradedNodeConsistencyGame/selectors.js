import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gradedNodeConsistencyGame state domain
 */

const selectGradedNodeConsistencyGameDomain = state =>
  state.gradedNodeConsistencyGame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GradedNodeConsistencyGame
 */

const makeSelectGradedNodeConsistencyGame = () =>
  createSelector(
    selectGradedNodeConsistencyGameDomain,
    substate => substate,
  );

export default makeSelectGradedNodeConsistencyGame;
export { selectGradedNodeConsistencyGameDomain };
