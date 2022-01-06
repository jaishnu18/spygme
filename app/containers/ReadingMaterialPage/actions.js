/*
 *
 * ReadingMaterialContentPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_RM_FAILURE,
  GET_RM_SUCCESS,
  GET_RM_START,
  MARK_READ_START,
  MARK_READ_FAILURE,
  MARK_READ_SUCCESS
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