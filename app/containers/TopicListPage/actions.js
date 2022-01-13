/*
 *
 * TopicsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_TOPICS_FAILURE,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_START,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getTopicsStart() {
  return {
    type: GET_TOPICS_START,
  };
}

export function getTopicsSuccess(payload) {
  return {
    type: GET_TOPICS_SUCCESS,
    payload,
  };
}

export function getTopicsFailure(err) {
  return {
    type: GET_TOPICS_FAILURE,
    payload: err,
  };
}