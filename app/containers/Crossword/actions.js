/*
 *
 * Crossword actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_GAME_DATA_START,
  GET_GAME_DATA_SUCCESS,
  GET_GAME_DATA_FAILURE,
  EVALUATE_RESPONSE_START,
  EVALUATE_RESPONSE_SUCCESS,
  EVALUATE_RESPONSE_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getGamesDataStart(payload) {
  return {
    type: GET_GAME_DATA_START,
    payload,
  };
}
export function getGamesDataSuccess(payload) {
  return {
    type: GET_GAME_DATA_SUCCESS,
    payload,
  };
}
export function getGamesDataFailure(err) {
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
