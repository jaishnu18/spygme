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
import history from 'utils/history';

import LoginPage from 'containers/LoginPage';
// Component imports

import { UserProvider, AuthProvider } from 'contexts';
// container essentials
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import GlobalStyle from 'global-styles';
import Routes from 'routes';
import Header from 'components/Header';
import {
  makeSelectAuthData,
  makeSelectLocation,
  makeSelectResponsive,
} from './selectors';

import reducer from './reducer';
import saga, { loginUser } from './saga';
import { logoutUserStart, getUserData } from './actions';

const Wrapper = styled.div`
  min-height: 100%;
`;

export function App(props) {
  // initiate reducer and saga
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const authToken = localStorage._UFT_;
  console.log(authToken);

  useEffect(() => {}, []);

  console.log('AuthData');
  console.log(props.AuthData);

  return (
    <UserProvider value={props.AuthData}>
      <Wrapper>
        <Header />
        <AuthProvider value={[authToken, props.AuthData]}>
          <Routes />
        </AuthProvider>
        <GlobalStyle />
      </Wrapper>
    </UserProvider>
  );
}

App.propTypes = {
  getUserDataFunc: PropTypes.func.isRequired,
  AuthData: PropTypes.object.isRequired,
  // router: PropTypes.object.isRequired,
  // logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  AuthData: makeSelectAuthData(),
  router: makeSelectLocation(),
  responsive: makeSelectResponsive(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getUserDataFunc: payload => dispatch(getUserData(payload)),
    logoutUser: () => dispatch(logoutUserStart()),
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
