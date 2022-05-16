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
  GET_RECOMMENDED_CONCEPT_FAILURE,
  GET_RECOMMENDED_CONCEPT_SUCCESS,
  GET_RECOMMENDED_CONCEPT_START,
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

export function getRecommendedConceptStart() {
  return {
    type: GET_RECOMMENDED_CONCEPT_START,
  };
}

export function getRecommendedConceptSuccess(payload) {
  return {
    type: GET_RECOMMENDED_CONCEPT_SUCCESS,
    payload,
  };
}

export function getRecommendedConceptFailure(err) {
  return {
    type: GET_RECOMMENDED_CONCEPT_FAILURE,
    payload: err,
  };
}
