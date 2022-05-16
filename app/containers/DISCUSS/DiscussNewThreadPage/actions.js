/*
 *
 * DiscussNewThreadPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  GET_CONCEPTS_START,
  GET_CONCEPTS_SUCCESS,
  GET_CONCEPTS_FAILURE, 
  POST_NEW_THREAD_START,
  POST_NEW_THREAD_SUCCESS,
  POST_NEW_THREAD_FAILURE, 
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getConceptsStart(payload) {
  return {
    type: GET_CONCEPTS_START,
    payload,
  };
}
export function getConceptsSuccess(payload) {
  return {
    type: GET_CONCEPTS_SUCCESS,
    payload,
  };
}
export function getConceptsFailure(err) {
  return {
    type: GET_CONCEPTS_FAILURE,
    payload: err,
  };
}

export function postNewThreadStart(payload) {
  return {
    type: POST_NEW_THREAD_START,
    payload,
  };
}
export function postNewThreadSuccess(payload) {
  return {
    type: POST_NEW_THREAD_SUCCESS,
    payload,
  };
}
export function postNewThreadFailure(err) {
  return {
    type: POST_NEW_THREAD_FAILURE,
    payload: err,
  };
}
