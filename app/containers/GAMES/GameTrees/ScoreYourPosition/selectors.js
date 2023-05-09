import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the scoreYourPosition state domain
 */

const selectScoreYourPositionDomain = state =>
  state.scoreYourPosition || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ScoreYourPosition
 */

const makeSelectScoreYourPosition = () =>
  createSelector(
    selectScoreYourPositionDomain,
    substate => substate,
  );

export default makeSelectScoreYourPosition;
export { selectScoreYourPositionDomain };
