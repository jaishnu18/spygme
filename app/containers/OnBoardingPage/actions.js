/*
 *
 * OnBoardingPage actions
 *
 */

import {
  ACTIVATE_ACCOUNT_FAILURE,
  ACTIVATE_ACCOUNT_START,
  ACTIVATE_ACCOUNT_SUCCESS,
} from './constants';

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
