/*
 *
 * DiscussPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  GET_ALL_THREADS_START,
  GET_ALL_THREADS_SUCCESS,
  GET_ALL_THREADS_FAILURE, 
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getAllThreadsStart(payload) {
  return {
    type: GET_ALL_THREADS_START,
    payload,
  };
}
export function getAllThreadsSuccess(payload) {
  return {
    type: GET_ALL_THREADS_SUCCESS,
    payload,
  };
}
export function getAllThreadsFailure(err) {
  return {
    type: GET_ALL_THREADS_FAILURE,
    payload: err,
  };
}
