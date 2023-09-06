import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the whatIsTheDecision state domain
 */

const selectWhatIsTheDecisionDomain = state =>
  state.whatIsTheDecision || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WhatIsTheDecision
 */

const makeSelectWhatIsTheDecision = () =>
  createSelector(
    selectWhatIsTheDecisionDomain,
    substate => substate,
  );

export default makeSelectWhatIsTheDecision;
export { selectWhatIsTheDecisionDomain };
