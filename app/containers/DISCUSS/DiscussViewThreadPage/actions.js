/*
 *
 * DiscussViewThreadPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  VIEW_THREAD_START,
  VIEW_THREAD_SUCCESS,
  VIEW_THREAD_FAILURE, 
  POST_COMMENT_START,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE, 
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function viewThreadStart(payload) {
  return {
    type: VIEW_THREAD_START,
    payload,
  };
}
export function viewThreadSuccess(payload) {
  return {
    type: VIEW_THREAD_SUCCESS,
    payload,
  };
}
export function viewThreadFailure(err) {
  return {
    type: VIEW_THREAD_FAILURE,
    payload: err,
  };
}

export function postCommentStart(payload) {
  return {
    type: POST_COMMENT_START,
    payload,
  };
}
export function postCommentSuccess(payload) {
  return {
    type: POST_COMMENT_SUCCESS,
    payload,
  };
}
export function postCommentFailure(err) {
  return {
    type: POST_COMMENT_FAILURE,
    payload: err,
  };
}
