import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the findCrosswordNodes state domain
 */

const selectFindCrosswordNodesDomain = state =>
  state.findCrosswordNodes || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FindCrosswordNodes
 */

const makeSelectFindCrosswordNodes = () =>
  createSelector(
    selectFindCrosswordNodesDomain,
    substate => substate,
  );

export default makeSelectFindCrosswordNodes;
export { selectFindCrosswordNodesDomain };
