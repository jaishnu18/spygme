/*
 *
 * DashboardPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_DASHBOARD_FAILURE,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_START,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDashboardStart() {
  return {
    type: GET_DASHBOARD_START,
  };
}

export function getDashboardSuccess(payload) {
  return {
    type: GET_DASHBOARD_SUCCESS,
    payload,
  };
}

export function getDashboardFailure(err) {
  return {
    type: GET_DASHBOARD_FAILURE,
    payload: err,
  };
}
