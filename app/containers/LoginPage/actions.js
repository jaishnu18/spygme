/*
 *
 * LoginPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_QUESTION_FAILURE,
  GET_QUESTION_START,
  GET_QUESTION_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
