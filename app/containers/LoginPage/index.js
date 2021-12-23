/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-nested-ternary */
/**
 *
 * LoginPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';
import { Button, Col, Form, Image, Input, message, Row } from 'antd';
import jwt_decode from 'jwt-decode';

// import LoginForm from 'components/LoginForm';
import {
  makeSelectAuthData,
  makeSelectLogging,
  makeSelectLoggingError,
} from 'containers/App/selectors';

import { loginUserWithEmail } from 'containers/App/actions';
import LoginForm from 'components/LoginForm';
import ForgotPasswordEmailForm from 'components/ForgotPasswordEmailForm';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import LoginCover from 'images/loginCover.png';
import { Link } from 'react-router-dom';
import SignupForm from 'components/SignupForm';
import EmailIcon from 'images/email.svg';
import { getSignupStart, activateAccountStart } from './actions';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import SolidButton from '../../components/atoms/SolidButton';

const CustomRow = styled(Row)`
  background-image: url(${LoginCover}) !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 900px !important;
`;

const FormContainer = styled.div`
  display: flex;
  background-color: #737e94;
  border-radius: 100px;
  padding: 20px;
  margin: 20px;
  min-height: 600px;
  width: 650px;
`;

const CenterDiv = styled.div`
  margin-left: 0px;
  margin-top: 30px;
  width: 100% !important;
`;

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const [name, setName] = useState(undefined);

  useEffect(() => {
    // page redirect
    if (props.AuthData.isLoggedIn) {
      props.history.replace('/topics');
    }
  }, [props.AuthData]);

  useEffect(() => {
    // page redirect
    if (history.location.pathname.startsWith('auth/onboard')) {
      const { token } = props.match.params;
      const object = jwt_decode(token);
      setName(object.name);
      console.log(object);
    }
  }, []);

  useEffect(() => {
    if (props.error) {
      message.error(props.error, 3.5);
    }
  }, [props.error]);

  const shiftToVerify = () => {
    history.push('/verify-email');
  };

  const activateAccount = async () => {
    const { token } = props.match.params;
    await props.activateUser(token);
    history.push('/login');
  };

  const googleSignIn = async res => {
    const gtoken = res.tokenId;
    console.log(gtoken);
    props.signin({ gtoken });
  };

  const handleSignIn = values => {
    props.signin(values);
  };

  const handleSignUp = values => {
    props.signup(values);
  };

  const handleError = errorInfo => {
    console.log('Failed:', errorInfo);
  };

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
            {history.location.pathname === '/auth/login' ? (
              <CenterDiv>
                <LoginForm
                  handleSignIn={handleSignIn}
                  googleSignIn={googleSignIn}
                  handleError={handleError}
                  // errorMessages={props.AuthState.loggingError}
                />
              </CenterDiv>
            ) : history.location.pathname === '/auth/signup' ? (
              <CenterDiv>
                <SignupForm
                  handleSignUp={handleSignUp}
                  googleSignIn={googleSignIn}
                  handleError={handleError}
                  // errorMessages={props.AuthState.loggingError}
                />
              </CenterDiv>
            ) : history.location.pathname.startsWith('/onboard') ? (
              name && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '20px',
                    textAlign: 'center',
                    marginTop: '20px',
                    marginBottom: 'auto',
                  }}
                >
                  <h1
                    style={{
                      marginBottom: '5px',
                      fontWeight: 700,
                      color: 'whitesmoke',
                    }}
                  >
                    Dear {`${name}`},
                  </h1>
                  <h2
                    style={{
                      marginBottom: '30px',
                      fontWeight: 400,
                      color: 'white',
                    }}
                  >
                    Please click Below to Activate Your Account and Onboard
                  </h2>
                  <SolidButton onClick={activateAccount} width="60%">
                    Activate
                  </SolidButton>
                </div>
              )
            ) : history.location.pathname === '/verify-email' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '30px',
                  textAlign: 'center',
                  marginTop: '20px',
                  marginBottom: 'auto',
                }}
              >
                <img src={EmailIcon} style={{ marginBottom: '26px' }} />
                <h1
                  style={{
                    marginBottom: '5px',
                    fontWeight: 700,
                    color: 'whitesmoke',
                  }}
                >
                  Please check your Email to Verify yourself and Onboard the
                  Platform.
                </h1>
              </div>
            ) : history.location.pathname === '/forgot-password' ? (
              <CenterDiv>
                <ForgotPasswordEmailForm />
              </CenterDiv>
            ) : (
              <div />
            )}
          </FormContainer>
        </Col>
      </CustomRow>
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object,
  // AuthData: PropTypes.object.isRequired,
  isLogginIn: PropTypes.bool,
  loginIn: PropTypes.func,
  // error: PropTypes.string,
  signInUser: PropTypes.func,
  activateUser: PropTypes.func,
  signin: PropTypes.func,
  signup: PropTypes.func,
  AuthState: PropTypes.object,
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
    signInUser: values => dispatch(getSignupStart(values)),
    activateUser: token => dispatch(activateAccountStart(token)),
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
