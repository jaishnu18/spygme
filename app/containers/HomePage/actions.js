/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  SEND_MSG_START,
  SEND_MSG_SUCCESS,
  SEND_MSG_FAILURE
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function sendMessageStart(payload) {
  return {
    type: SEND_MSG_START,
    payload,
  };
}
export function sendMessageSuccess(payload) {
  return {
    type: SEND_MSG_SUCCESS,
    payload,
  };
}
export function sendMessageFailure(err) {
  return {
    type: SEND_MSG_FAILURE,
    payload: err,
  };
}
