/* eslint-disable no-underscore-dangle */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';

// container essentials
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import SplashScreen from 'components/SplashScreen';

import GlobalStyle from 'global-styles';
import Routes from 'routes';
import NavBar from 'components/NavBar';
import AuthProvider from './AuthContext';
import {
  makeSelectAuthData,
  makeSelectAuthState,
  makeSelectLocation,
  makeSelectResponsive,
} from './selectors';

import {
  signinUserStart,
  signinUserSuccess,
  signoutUserStart,
  signupUserStart,
} from './actions';

import reducer from './reducer';
import saga from './saga';

const AppWrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 40px;
`;

export function App(props) {
  // initiate reducer and saga
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  const userToken = localStorage.getItem('_UFT_');

  useEffect(() => {
    if (userToken) {
      const info = jwtDecode(userToken);
      info.token = userToken;
      info.isLoggedIn = true;

      if (Date.now() >= info.exp * 1000) {
        props.signout();
      } else {
        props.setAuthData(info);
      }
    }
  }, []);

  return userToken && !props.AuthData.isLoggedIn ? (
    <SplashScreen />
  ) : (
    <AuthProvider value={props.AuthData}>
      <AppWrapper>
        <NavBar signout={props.signout} />
        <Routes
          signin={props.signin}
          signout={props.signout}
          signup={props.signup}
          AuthState={props.AuthState}
          AuthData={props.AuthData}
        />
        <GlobalStyle />
      </AppWrapper>
    </AuthProvider>
  );
}

App.propTypes = {
  AuthData: PropTypes.object.isRequired,
  setAuthData: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  signout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  AuthData: makeSelectAuthData(),
  AuthState: makeSelectAuthState(),
  router: makeSelectLocation(),
  responsive: makeSelectResponsive(),
});

export function mapDispatchToProps(dispatch) {
  return {
    signin: payload => dispatch(signinUserStart(payload)),
    signup: payload => dispatch(signupUserStart(payload)),
    signout: () => dispatch(signoutUserStart()),
    setAuthData: payload => dispatch(signinUserSuccess(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
