/*
 *
 * OnBoardingPage reducer
 *
 */
import produce from 'immer';
import {
  ACTIVATE_ACCOUNT_FAILURE,
  ACTIVATE_ACCOUNT_START,
  ACTIVATE_ACCOUNT_SUCCESS,
} from './constants';

export const initialState = {
  isActivating: false,
  resMessage: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const onBoardingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ACTIVATE_ACCOUNT_START:
        draft.isActivating = true;
        break;
      case ACTIVATE_ACCOUNT_SUCCESS:
        draft.isActivating = false;
        draft.resMessage = action.payload;
        break;
      case ACTIVATE_ACCOUNT_FAILURE:
        draft.isActivating = false;
        draft.resMessage = action.payload;
        break;
    }
  });

export default onBoardingPageReducer;
