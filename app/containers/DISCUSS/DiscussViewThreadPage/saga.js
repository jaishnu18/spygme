// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';
// import querystring from 'querystring';
import {
  viewThreadSuccess,
  viewThreadFailure,
  postCommentSuccess,
  postCommentFailure,
} from './actions';

import { VIEW_THREAD_START, POST_COMMENT_START } from './constants';
// Individual exports for testing
export function* viewThread(action) {
  try {
    const threadId=action.payload;
    const response = yield api.get(
      `/discuss/view-thread/${threadId}`,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(viewThreadSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(viewThreadFailure(err.data.message));
  }
}
export function* postComment(action) {
  try {
    const commentDetails=action.payload;
    const response = yield api.post(
      `/discuss/post-thread-comment`,
      commentDetails,
      { headers: { Authorization: localStorage._UFT_ } },
    );
    yield put(postCommentSuccess(response.data.data));
  } catch (err) {
    console.log(err);
    yield put(postCommentFailure(err.data.message));
  }
}
export default function* discussViewThreadPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(VIEW_THREAD_START, viewThread),
    takeLatest(POST_COMMENT_START, postComment),
  ]);
}
