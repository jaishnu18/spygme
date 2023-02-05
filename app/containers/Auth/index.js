/* eslint-disable no-param-reassign */
/**
 *
 * Auth
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AuthForm from 'components/AuthForm';
import Spin from 'antd/lib/spin';
import history from 'utils/history';
import makeSelectAuth from './selectors';
import reducer from './reducer';
import saga from './saga';
import api from 'api';

export function Auth(props) {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  const [userRole, setUserRole] = useState('Student');
  const [schoolList, setSchoolList] = useState(undefined);

  async function getSchoolList() {
    const R = await api.get('/auth/get-schools');
    setSchoolList(R.data.data);
  }

  useEffect(() => {
    getSchoolList();
  }, []);

  const googleSignIn = async res => {
    const gtoken = res.tokenId;
    props.signin({ gtoken });
  };

  const handleSignIn = values => {
    props.signin(values);
  };

  const handleSignUp = values => {
    values.userRole = userRole;
    props.signup(values);
  };

  const handleError = errorInfo => {};

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
          userRole={userRole}
          setUserRole={setUserRole}
          resetErrorMessages={props.resetErrorMessages}
          getSchoolList={getSchoolList}
          schoolList={schoolList}
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
