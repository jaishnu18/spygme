/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  GET_SIGNUP_FAILURE,
  GET_SIGNUP_START,
  GET_SIGNUP_SUCCESS,
  ACTIVATE_ACCOUNT_FAILURE,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_START,
} from './constants';

export const initialState = {
  isRegistering: false,
  signupMessage: undefined,
  isActivating: false,
  resMessage: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SIGNUP_START:
        draft.isRegistering = true;
        break;
      case GET_SIGNUP_SUCCESS:
        draft.isRegistering = false;
        draft.signupMessage = action.payload;
        break;
      case GET_SIGNUP_FAILURE:
        draft.isRegistering = false;
        draft.signupMessage = action.payload;
        break;
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

export default loginPageReducer;
