/*
 *
 * TreeGamePage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_EXPRESSION_FAILURE,
  GET_EXPRESSION_SUCCESS,
  GET_EXPRESSION_START,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getExpressionStart(payload) {
  return {
    type: GET_EXPRESSION_START,
    payload,
  };
}

export function getExpressionSuccess(payload) {
  return {
    type: GET_EXPRESSION_SUCCESS,
    payload,
  };
}

export function getExpressionFailure(err) {
  return {
    type: GET_EXPRESSION_FAILURE,
    payload: err,
  };
}
