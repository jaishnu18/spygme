/*
 *
 * EmailVerificationPage actions
 *
 */

import {
  DEFAULT_ACTION,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_START,
  VERIFY_EMAIL_SUCCESS,
} from './constants';

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
