/*
 *
 * LoginPage actions
 *
 */

import history from 'utils/history';
import {
  DEFAULT_ACTION,
  GET_SIGNUP_FAILURE,
  GET_SIGNUP_START,
  GET_SIGNUP_SUCCESS,
  ACTIVATE_ACCOUNT_FAILURE,
  ACTIVATE_ACCOUNT_START,
  ACTIVATE_ACCOUNT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

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

export function activateAccountStart(payload) {
  return {
    type: ACTIVATE_ACCOUNT_START,
    payload,
  };
}

export function activateAccountSuccess(payload) {
  return {
    type: ACTIVATE_ACCOUNT_SUCCESS,
    payload,
  };
}

export function activateAccountFailure(err) {
  return {
    type: ACTIVATE_ACCOUNT_FAILURE,
    payload: err,
  };
}
