/*
 *
 * EmailVerificationPage reducer
 *
 */
import produce from 'immer';
import {
  VERIFY_EMAIL_START,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
} from './constants';

export const initialState = {
  isVerifying: false,
  isVerified: false,
};

/* eslint-disable default-case, no-param-reassign */
const emailVerificationPageReducer = (state = initialState, action) =>
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
    }
  });

export default emailVerificationPageReducer;
