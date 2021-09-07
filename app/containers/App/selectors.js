import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectRouter = state => state.router;

const selectResponsive = state => state.responsive;

const selectApp = state => state.app || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectAuthData = () =>
  createSelector(
    selectApp,
    appState => appState.authData,
  );

const makeSelectVideoShown = () =>
  createSelector(
    selectApp,
    appState => appState.videoShown,
  );

const makeSelectCreatePopupShown = () =>
  createSelector(
    selectApp,
    appState => appState.createPopupVisible,
  );

const makeSelectLogging = () =>
  createSelector(
    selectApp,
    appState => appState.logging,
  );

const makeSelectLoggingError = () =>
  createSelector(
    selectApp,
    appState => appState.loggingError,
  );

const makeSelectResponsive = () =>
  createSelector(
    selectResponsive,
    responsive => responsive,
  );

export {
  makeSelectLocation,
  makeSelectAuthData,
  makeSelectResponsive,
  makeSelectVideoShown,
  makeSelectLogging,
  makeSelectLoggingError,
  makeSelectCreatePopupShown,
};
