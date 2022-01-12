/**
 *
 * Auth
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AuthForm from 'components/AuthForm';
import Spin from 'antd/lib/spin';
import makeSelectAuth from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Auth(props) {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  const googleSignIn = async res => {
    const gtoken = res.tokenId;
    props.signin({ gtoken });
  };

  const handleSignIn = values => {
    props.signin(values);
  };

  const handleSignUp = values => {
    console.log(values);
    props.signup(values);
  };

  const handleError = errorInfo => {
    console.log('Failed: ', errorInfo);
  };

  console.log(props.AuthState.logging);
  console.log(props.AuthState);
  return (
    <div>
      <Helmet>
        <title>Auth</title>
        <meta name="description" content="Description of Auth" />
      </Helmet>
      <Spin size="large" spinning={props.AuthState.logging}>
        <AuthForm
          googleSignIn={googleSignIn}
          handleSignUp={handleSignUp}
          handleSignIn={handleSignIn}
          handleError={handleError}
          errorMessages={props.AuthState.loggingError}
        />
      </Spin>
    </div>
  );
}

Auth.propTypes = {
  signin: PropTypes.func,
  signup: PropTypes.func,
  AuthState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

export function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Auth);
