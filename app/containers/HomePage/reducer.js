/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SEND_MSG_START,
  SEND_MSG_SUCCESS,
  SEND_MSG_FAILURE,
} from './constants';

export const initialState = {
  isMessageSending: false
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SEND_MSG_START:
        draft.isMessageSending = true;
        break;
      case SEND_MSG_SUCCESS:
        draft.isMessageSending = false;
        break;
      case SEND_MSG_FAILURE:
        draft.isMessageSending = false;
        break;
    }
  });

export default homePageReducer;
