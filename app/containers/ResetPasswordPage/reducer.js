/*
 *
 * ResetPasswordPage reducer
 *
 */
import produce from 'immer';
import {
  VERIFY_EMAIL_START,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
} from './constants';

export const initialState = {
  isVerifying: false,
  isVerified: false,
  isChangingPassword: false,
  changePasswordResponse: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const resetPasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case VERIFY_EMAIL_START:
        draft.isVerifying = true;
        break;
      case VERIFY_EMAIL_SUCCESS:
        draft.isVerifying = false;
        draft.isVerified = action.payload;
        break;
      case VERIFY_EMAIL_FAILURE:
        draft.isVerifying = false;
        draft.isVerified = action.payload;
        break;
      case CHANGE_PASSWORD_START:
        draft.isChangingPassword = true;
        break;
      case CHANGE_PASSWORD_SUCCESS:
        draft.isChangingPassword = false;
        draft.changePasswordResponse = action.payload;
        break;
      case CHANGE_PASSWORD_FAILURE:
        draft.isChangingPassword = false;
        draft.changePasswordResponse = action.payload;
        break;
    }
  });

export default resetPasswordPageReducer;
