/*
 *
 * ConceptListPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_CONCEPTS_FAILURE,
  GET_CONCEPTS_START,
  GET_CONCEPTS_SUCCESS,
  GET_CONCEPTS_PREREQ_FAILURE,
  GET_CONCEPTS_PREREQ_START,
  GET_CONCEPTS_PREREQ_SUCCESS,
  GET_TOPIC_FAILURE,
  GET_TOPIC_START,
  GET_TOPIC_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getTopicStart(payload) {
  return {
    type: GET_TOPIC_START,
    payload,
  };
}

export function getTopicSuccess(payload) {
  return {
    type: GET_TOPIC_SUCCESS,
    payload,
  };
}

export function getTopicFailure(err) {
  return {
    type: GET_TOPIC_FAILURE,
    payload: err,
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

export function getConceptsPrereqStart(payload) {
  return {
    type: GET_CONCEPTS_PREREQ_START,
    payload,
  };
}

export function getConceptsPrereqSuccess(payload) {
  return {
    type: GET_CONCEPTS_PREREQ_SUCCESS,
    payload,
  };
}

export function getConceptsPrereqFailure(err) {
  return {
    type: GET_CONCEPTS_PREREQ_FAILURE,
    payload: err,
  };
}