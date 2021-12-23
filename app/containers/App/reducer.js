import produce from 'immer';
import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
} from './constants';

export const initialState = {
  logging: false,
  loggingError: undefined,
  authData: {
    isLoggedIn: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP_START:
        draft.logging = true;
        draft.loggingError = undefined;
        break;

      case SIGNUP_SUCCESS:
        draft.logging = false;
        draft.authData = action.payload;
        draft.loggingError = undefined;
        break;

      case SIGNUP_FAILURE:
        draft.logging = false;
        draft.loggingError = action.payload;
        break;

      case SIGNIN_START:
        draft.logging = true;
        draft.loggingError = undefined;
        break;

      case SIGNIN_SUCCESS:
        draft.logging = false;
        draft.authData = action.payload;
        draft.loggingError = undefined;
        break;

      case SIGNIN_FAILURE:
        draft.logging = false;
        draft.loggingError = action.payload;
        break;

      case SIGNOUT_SUCCESS:
        draft.authData = {
          isLoggedIn: false,
        };
        break;

      case SIGNOUT_FAILURE:
        draft.error = action.payload;
        break;
    }
  });

export default appReducer;
