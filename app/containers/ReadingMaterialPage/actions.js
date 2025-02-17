/*
 *
 * ReadingMaterialPage actions
 *
 */

import message from 'antd/lib/message';
import {
  DEFAULT_ACTION,
  GET_RM_FAILURE,
  GET_RM_SUCCESS,
  GET_RM_START,
  MARK_READ_START,
  MARK_READ_FAILURE,
  MARK_READ_SUCCESS,
  NEXT_ITEM_START,
  NEXT_ITEM_FAILURE,
  NEXT_ITEM_SUCCESS,
  RECORD_TIME_FAILURE,
  RECORD_TIME_START,
  RECORD_TIME_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getReadingMaterialStart(payload) {
  return {
    type: GET_RM_START,
    payload,
  };
}
export function getReadingMaterialSuccess(payload) {
  return {
    type: GET_RM_SUCCESS,
    payload,
  };
}
export function getReadingMaterialFailure(err) {
  return {
    type: GET_RM_FAILURE,
    payload: err,
  };
}

export function markAsReadStart(payload) {
  return {
    type: MARK_READ_START,
    payload,
  };
}
export function markAsReadSuccess(payload) {
  message.success('Successfully marked as read');
  return {
    type: MARK_READ_SUCCESS,
    payload,
  };
}
export function markAsReadFailure(err) {
  return {
    type: MARK_READ_FAILURE,
    payload: err,
  };
}

export function nextItemStart(payload) {
  return {
    type: NEXT_ITEM_START,
    payload,
  };
}
export function nextItemSuccess(payload) {
  return {
    type: NEXT_ITEM_SUCCESS,
    payload,
  };
}
export function nextItemFailure(err) {
  return {
    type: NEXT_ITEM_FAILURE,
    payload: err,
  };
}

export function recordTimeStart(payload) {
  return {
    type: RECORD_TIME_START,
    payload,
  };
}
export function recordTimeSuccess(payload) {
  return {
    type: RECORD_TIME_SUCCESS,
    payload,
  };
}
export function recordTimeFailure(err) {
  return {
    type: RECORD_TIME_FAILURE,
    payload: err,
  };
}