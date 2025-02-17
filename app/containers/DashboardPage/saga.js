// import { take, call, put, select } from 'redux-saga/effects';
import { put, takeLatest, all } from 'redux-saga/effects';

import api from 'api';

import { getDashboardSuccess, getDashboardFailure,getRecommendedConceptSuccess,getRecommendedConceptFailure } from './actions';
import { GET_DASHBOARD_START, GET_RECOMMENDED_CONCEPT_START } from './constants';
// Individual exports for testing

export function* getDashboard() {
  try {
    const response = yield api.get(`/get-dashboard/all`, {
      headers: { Authorization: localStorage._UFT_ },
    });

    yield put(getDashboardSuccess(response.data.data));
  } catch (err) {
    yield put(getDashboardFailure(err.data.message));
  }
}

export function* getRecommendedConcept() {
  try {
    const response = yield api.get(`/get-dashboard/reco-concept`, {
      headers: { Authorization: localStorage._UFT_ },
    });

    yield put(getRecommendedConceptSuccess(response.data.data));
  } catch (err) {
    yield put(getRecommendedConceptFailure(err.data.message));
  }
}

export default function* dashboardPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(GET_DASHBOARD_START, getDashboard),
    takeLatest(GET_RECOMMENDED_CONCEPT_START, getRecommendedConcept)
  ]);
}
