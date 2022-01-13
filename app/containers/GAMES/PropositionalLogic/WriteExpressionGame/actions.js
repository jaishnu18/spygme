/*
 *
 * WriteExpressionGame actions
 *
 */

import {
  GET_GRAPH_FAILURE,
  GET_GRAPH_START,
  GET_GRAPH_SUCCESS,
  VALIDATE_EXPRESSION_FAILURE,
  VALIDATE_EXPRESSION_START,
  VALIDATE_EXPRESSION_SUCCESS,
  PUT_FEEDBACK_FAILURE,
  PUT_FEEDBACK_START,
  PUT_FEEDBACK_SUCCESS,
} from './constants';

export function getGraphStart(payload) {
  return {
    type: GET_GRAPH_START,
    payload,
  };
}

export function getGraphSuccess(payload) {
  return {
    type: GET_GRAPH_SUCCESS,
    payload,
  };
}

export function getGraphFailure(err) {
  return {
    type: GET_GRAPH_FAILURE,
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
