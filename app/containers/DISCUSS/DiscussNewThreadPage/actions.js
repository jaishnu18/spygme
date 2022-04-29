/*
 *
 * DiscussNewThreadPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  POST_NEW_THREAD_START,
  POST_NEW_THREAD_SUCCESS,
  POST_NEW_THREAD_FAILURE, 
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
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
