/*
 *
 * DashboardPage reducer
 *
 */
import produce from 'immer';
import {
  GET_DASHBOARD_FAILURE,
  GET_DASHBOARD_START,
  GET_DASHBOARD_SUCCESS,
  GET_RECOMMENDED_CONCEPT_FAILURE,
  GET_RECOMMENDED_CONCEPT_SUCCESS,
  GET_RECOMMENDED_CONCEPT_START,
} from './constants';

export const initialState = {
  isDashboardLoading: false,
  dashboard: undefined,
  isRecommendedConceptLoading: false,
  recommendedConcept: undefined,
};


/* eslint-disable default-case, no-param-reassign */
const dashboardPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DASHBOARD_START:
        draft.isDashboardLoading = true;
        break;
      case GET_DASHBOARD_SUCCESS:
        draft.isDashboardLoading = false;
        draft.dashboard = action.payload;
        break;
      case GET_DASHBOARD_FAILURE:
        draft.isDashboardLoading = false;
        draft.dashboard = action.payload;
        break;
      case GET_RECOMMENDED_CONCEPT_START:
        draft.isRecommendedConceptLoading = true;
        break;
      case GET_RECOMMENDED_CONCEPT_SUCCESS:
        draft.isRecommendedConceptLoading = false;
        draft.recommendedConcept = action.payload;
        break;
      case GET_RECOMMENDED_CONCEPT_FAILURE:
        draft.isRecommendedConceptLoading = false;
        draft.recommendedConcept = action.payload;
        break;
    }
  });

export default dashboardPageReducer;
