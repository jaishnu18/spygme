/*
 *
 * MyProfilePage actions
 *
 */

import message from 'antd/lib/message';
import {
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
} from './constants';

export function getProfileStart(payload) {
  return {
    type: GET_PROFILE_START,
    payload,
  };
}

export function getProfileSuccess(payload) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload,
  };
}

export function getProfileFailure(err) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: err,
  };
}

export function updateProfileStart(payload) {
  return {
    type: UPDATE_PROFILE_START,
    payload,
  };
}

export function updateProfileSuccess(payload) {
  message.success('Profile Updated Successfully');
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload,
  };
}

export function updateProfileFailure(err) {
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload: err,
  };
}

export function updatePasswordStart(payload) {
  return {
    type: UPDATE_PASSWORD_START,
    payload,
  };
}

export function updatePasswordSuccess(payload) {
  message.success('Password Updated Successfully');
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    payload,
  };
}

export function updatePasswordFailure(err) {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    payload: err,
  };
}