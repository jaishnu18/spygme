/*
 *
 * MyProfilePage reducer
 *
 */
/*
 *
 * Profile reducer
 *
 */
import produce from 'immer';
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

export const initialState = {
  loading: false,
  loadingError: undefined,
  profile: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const myProfilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILE_START:
        draft.loading = true;
        draft.loadingError = undefined;
        break;

      case GET_PROFILE_SUCCESS:
        draft.loading = false;
        draft.loadingError = undefined;
        draft.profile = action.payload;
        break;

      case GET_PROFILE_FAILURE:
        draft.loading = false;
        draft.loadingError = action.payload;
        break;

      case UPDATE_PROFILE_START:
        draft.loading = true;
        draft.loadingError = undefined;
        break;

      case UPDATE_PROFILE_SUCCESS:
        draft.loading = false;
        draft.loadingError = undefined;
        draft.profile = action.payload;
        break;

      case UPDATE_PROFILE_FAILURE:
        draft.loading = false;
        draft.loadingError = action.payload;
        break;

      case UPDATE_PASSWORD_START:
        draft.loading = true;
        draft.loadingError = undefined;
        break;

      case UPDATE_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.loadingError = undefined;
        break;

      case UPDATE_PASSWORD_FAILURE:
        draft.loading = false;
        draft.loadingError = action.payload;
        break;
    }
  });

export default myProfilePageReducer;
