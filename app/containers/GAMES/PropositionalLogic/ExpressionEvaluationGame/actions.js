/*
 *
 * ExpressionEvaluationGame actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_EXPRESSION_FAILURE,
  GET_EXPRESSION_SUCCESS,
  GET_EXPRESSION_START,
  VALIDATE_EXPRESSION_FAILURE,
  VALIDATE_EXPRESSION_START,
  VALIDATE_EXPRESSION_SUCCESS,
  PUT_FEEDBACK_FAILURE,
  PUT_FEEDBACK_START,
  PUT_FEEDBACK_SUCCESS,
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

export function evaluateExpressionStart(payload) {
  return {
    type: VALIDATE_EXPRESSION_START,
    payload,
  };
}

export function evaluateExpressionSuccess(payload) {
  return {
    type: VALIDATE_EXPRESSION_SUCCESS,
    payload,
  };
}

export function evaluateExpressionFailure(err) {
  return {
    type: VALIDATE_EXPRESSION_FAILURE,
    payload: err,
  };
}

export function putFeedbackStart(payload) {
  return {
    type: PUT_FEEDBACK_START,
    payload,
  };
}
export function putFeedbackSuccess(payload) {
  return {
    type: PUT_FEEDBACK_SUCCESS,
    payload,
  };
}
export function putFeedbackFailure(err) {
  return {
    type: PUT_FEEDBACK_FAILURE,
    payload: err,
  };
}
