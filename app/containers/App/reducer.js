import produce from 'immer';
import {
  LOGIN_USER_WITH_EMAIL,
  LOGIN_USER_WITH_EMAIL_SUCCESS,
  LOGIN_USER_WITH_EMAIL_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './constants';

// The initial state of the App
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
      case LOGIN_USER_WITH_EMAIL:
        draft.logging = true;
        draft.loggingError = undefined;
        break;

      case LOGIN_USER_WITH_EMAIL_SUCCESS:
        draft.logging = false;
        draft.authData = action.payload;
        draft.loggingError = undefined;
        break;

      case LOGIN_USER_WITH_EMAIL_ERROR:
        draft.logging = false;
        draft.loggingError = action.payload;
        break;

      case LOGOUT_SUCCESS:
        draft.authData = {
          isLoggedIn: false,
        };
        break;

      case LOGOUT_FAILURE:
        draft.error = action.payload;
        break;
    }
  });

export default appReducer;
