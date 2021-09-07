/*
 *
 * SignupPage actions
 *
 */

import history from 'utils/history';
import {
  GET_SIGNUP_FAILURE,
  GET_SIGNUP_START,
  GET_SIGNUP_SUCCESS,
} from './constants';

export function getSignupStart(payload) {
  // history.push('/onboard');
  return {
    type: GET_SIGNUP_START,
    payload,
  };
}

export function getSignupSuccess(payload) {
  return {
    type: GET_SIGNUP_SUCCESS,
    payload,
  };
}

export function getSignupFailure(err) {
  return {
    type: GET_SIGNUP_FAILURE,
    payload: err,
  };
}
