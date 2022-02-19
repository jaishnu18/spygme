/*
 *
 * ForgotPasswordPage reducer
 *
 */
import produce from 'immer';
import {
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_FAILURE,
} from './constants';

export const initialState = {
  isEmailSent: undefined,
  response: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const forgotPasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FORGOT_PASSWORD_START:
        draft.isEmailSent = false;
        break;
      case FORGOT_PASSWORD_SUCCESS:
        draft.isEmailSent = true;
        draft.response = action.payload;
        break;
      case FORGOT_PASSWORD_FAILURE:
        draft.isEmailSent = false;
        draft.response = action.payload;
        break;
    }
  });

export default forgotPasswordPageReducer;
