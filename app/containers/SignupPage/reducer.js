/*
 *
 * SignupPage reducer
 *
 */
import produce from 'immer';
import {
  GET_SIGNUP_FAILURE,
  GET_SIGNUP_START,
  GET_SIGNUP_SUCCESS,
} from './constants';

export const initialState = {
  isRegistering: false,
  signupMessage: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const signupPageReducer = (state = initialState, action) =>
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
    }
  });

export default signupPageReducer;
