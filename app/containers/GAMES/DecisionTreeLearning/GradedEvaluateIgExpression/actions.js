/*
 *
 * GradedEvaluateIgExpression actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_GAME_DATA_FAILURE,
  GET_GAME_DATA_START,
  GET_GAME_DATA_SUCCESS,
  EVALUATE_RESPONSE_FAILURE,
  EVALUATE_RESPONSE_START,
  EVALUATE_RESPONSE_SUCCESS,
  PUT_FEEDBACK_FAILURE,
  PUT_FEEDBACK_START,
  PUT_FEEDBACK_SUCCESS,
  _START,
  _SUCCESS,
  _FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getGameDataStart(payload) {
  return {
    type: GET_GAME_DATA_START,
    payload,
  };
}

export function getGameDataSuccess(payload) {
  return {
    type: GET_GAME_DATA_SUCCESS,
    payload,
  };
}

export function getGameDataFailure(err) {
  return {
    type: GET_GAME_DATA_FAILURE,
    payload: err,
  };
}

export function evaluateResponseStart(payload) {
  return {
    type: EVALUATE_RESPONSE_START,
    payload,
  };
}

export function evaluateResponseSuccess(payload) {
  return {
    type: EVALUATE_RESPONSE_SUCCESS,
    payload,
  };
}

export function evaluateResponseFailure(err) {
  return {
    type: EVALUATE_RESPONSE_FAILURE,
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

export function Start(payload) {
  return {
    type: _START,
    payload,
  };
}

export function Success(payload) {
  return {
    type: _SUCCESS,
    payload,
  };
}

export function Failure(err) {
  return {
    type: _FAILURE,
    payload: err,
  };
}
