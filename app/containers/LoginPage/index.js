/* eslint-disable no-nested-ternary */
/**
 *
 * LoginPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';
import { Button, Col, Form, Input, message, Row } from 'antd';

// import LoginForm from 'components/LoginForm';
import {
  makeSelectAuthData,
  makeSelectLogging,
  makeSelectLoggingError,
} from 'containers/App/selectors';

import { loginUserWithEmail } from 'containers/App/actions';
import LoginForm from 'components/LoginForm';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ThreeCards from 'components/ThreeCards';
import LoginCover from 'images/loginCover.png';
import { Link } from 'react-router-dom';
import SignupForm from 'components/SignupForm';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const CustomRow = styled(Row)`
  background-image: url(${LoginCover}) !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 900px !important;
`;

const FormContainer = styled.div`
  background-color: #737e94;
  border-radius: 100px;
  padding: 20px;
  margin: 20px;
  min-height: 600px;
  min-width: 600px;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  // align-items: center;
  margin-left: 40px;
  margin-top: 40px;
`;

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  useEffect(() => {
    // page redirect
    if (props.AuthData.isLoggedIn) {
      props.history.replace('/my/dashboard');
    }
  }, [props.AuthData]);

  useEffect(() => {
    if (props.error) {
      message.error(props.error, 3.5);
    }
  }, [props.error]);

  return (
    <div>
      <Helmet>
        <title>LoginPage</title>
        <meta name="LOGIN PAGE" content="WELCOME TO AI SCHOOL!" />
      </Helmet>

      <CustomRow>
        <Col
          offset="13"
          span="11"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormContainer>
            {history.location.pathname === '/login' ? (
              <CenterDiv>
                <LoginForm loginIn={props.loginIn} />
                <Link to="/forgot-password">
                  <p style={{ color: 'white' }}>Forgot Password?</p>
                </Link>
              </CenterDiv>
            ) : history.location.pathname === '/signup' ? (
              <CenterDiv>
                <SignupForm />
                <Link to="/login">
                  <p style={{ color: 'white' }}>Already a User?</p>
                </Link>
              </CenterDiv>
            ) : (
              <div />
            )}
          </FormContainer>
        </Col>
      </CustomRow>
      <ThreeCards />
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object,
  AuthData: PropTypes.object.isRequired,
  isLogginIn: PropTypes.bool,
  loginIn: PropTypes.func,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  AuthData: makeSelectAuthData(),
  isLogginIn: makeSelectLogging(),
  error: makeSelectLoggingError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loginIn: values => dispatch(loginUserWithEmail(values)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
