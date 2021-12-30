/*
 *
 * ConceptDescriptionPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_GAMES_FAILURE,
  GET_GAMES_START,
  GET_GAMES_SUCCESS,
  GET_GAMES_PROGRESS_FAILURE,
  GET_GAMES_PROGRESS_START,
  GET_GAMES_PROGRESS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getGamesStart(payload) {
  return {
    type: GET_GAMES_START,
    payload,
  };
}

export function getGamesSuccess(payload) {
  return {
    type: GET_GAMES_SUCCESS,
    payload,
  };
}

export function getGamesFailure(err) {
  return {
    type: GET_GAMES_FAILURE,
    payload: err,
  };
}

export function getGamesProgressStart(payload) {
  return {
    type: GET_GAMES_PROGRESS_START,
    payload,
  };
}

export function getGamesProgressSuccess(payload) {
  return {
    type: GET_GAMES_PROGRESS_SUCCESS,
    payload,
  };
}

export function getGamesProgressFailure(err) {
  return {
    type: GET_GAMES_PROGRESS_FAILURE,
    payload: err,
  };
}
