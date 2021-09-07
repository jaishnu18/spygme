/* eslint-disable no-undef */
/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

/*
 *
 * App actions
 *
 */

import {
  LOGIN_USER_WITH_EMAIL,
  LOGIN_USER_WITH_EMAIL_SUCCESS,
  LOGIN_USER_WITH_EMAIL_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_START,
  LOGOUT_FAILURE,
} from './constants';

export function loginUserWithEmail(payload) {
  return {
    type: LOGIN_USER_WITH_EMAIL,
    payload,
  };
}
export function loginUserWithEmailSuccess(payload) {
  return {
    type: LOGIN_USER_WITH_EMAIL_SUCCESS,
    payload,
  };
}

export function loginUserWithEmailFailure(err) {
  return {
    type: LOGIN_USER_WITH_EMAIL_ERROR,
    payload: err,
  };
}

export function logoutUserStart() {
  return {
    type: LOGOUT_START,
  };
}

export function logoutUserSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutUserFailure(err) {
  return {
    type: LOGOUT_FAILURE,
    payload: err,
  };
}
