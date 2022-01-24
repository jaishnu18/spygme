/* eslint-disable no-param-reassign */
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

import history from 'utils/history';
import {
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNOUT_START,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
} from './constants';

export function signupUserStart(payload) {
  return {
    type: SIGNUP_START,
    payload,
  };
}

export function signupUserSuccess(payload) {
  history.push('/check-email');
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
}

export function signupUserFailure(err) {
  return {
    type: SIGNUP_FAILURE,
    payload: err,
  };
}

export function signinUserStart(payload) {
  return {
    type: SIGNIN_START,
    payload,
  };
}

export function signinUserSuccess(payload) {
  return {
    type: SIGNIN_SUCCESS,
    payload,
  };
}

export function signinUserFailure(err) {
  return {
    type: SIGNIN_FAILURE,
    payload: err,
  };
}

export function signoutUserStart() {
  return {
    type: SIGNOUT_START,
  };
}

export function signoutUserSuccess() {
  return {
    type: SIGNOUT_SUCCESS,
  };
}

export function signoutUserFailure(err) {
  return {
    type: SIGNOUT_FAILURE,
    payload: err,
  };
}
