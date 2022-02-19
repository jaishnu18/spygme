/*
 *
 * ResetPasswordPage actions
 *
 */

import {
  DEFAULT_ACTION,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_START,
  VERIFY_EMAIL_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
} from './constants';

import history from 'utils/history';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function verifyEmailStart(payload) {
  return {
    type: VERIFY_EMAIL_START,
    payload,
  };
}

export function verifyEmailSuccess(payload) {
  return {
    type: VERIFY_EMAIL_SUCCESS,
    payload,
  };
}

export function verifyEmailFailure(err) {
  return {
    type: VERIFY_EMAIL_FAILURE,
    payload: err,
  };
}

export function changePasswordStart(payload) {
  return {
    type: CHANGE_PASSWORD_START,
    payload,
  };
}

export function changePasswordSuccess(payload) {
  history.push('/auth');
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload,
  };
}

export function changePasswordFailure(err) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: err,
  };
}
