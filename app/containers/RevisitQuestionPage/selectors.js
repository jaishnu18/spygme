import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the revisitQuestionPage state domain
 */

const selectRevisitQuestionPageDomain = state =>
  state.revisitQuestionPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RevisitQuestionPage
 */

const makeSelectRevisitQuestionPage = () =>
  createSelector(
    selectRevisitQuestionPageDomain,
    substate => substate,
  );

export default makeSelectRevisitQuestionPage;
export { selectRevisitQuestionPageDomain };
