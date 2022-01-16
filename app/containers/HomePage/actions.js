/*
 *
 * HomePage actions
 *
 */
import message from 'antd/lib/message';
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
  message.success("Query Submitted");
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
