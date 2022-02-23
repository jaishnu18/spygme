/*
 *
 * ForgotPasswordPage actions
 *
 */

import history from 'utils/history';
import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
} from './constants';

export function forgotPasswordStart(payload) {
  return {
    type: FORGOT_PASSWORD_START,
    payload,
  };
}

export function forgotPasswordSuccess(payload) {
  history.push(`/check/mail/forgot-password/${payload}`);
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload,
  };
}

export function forgotPasswordFailure(err) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: err,
  };
}
