/**
 *
 * LoginPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Form, Input, message } from 'antd';

// import LoginForm from 'components/LoginForm';
import {
  makeSelectAuthData,
  makeSelectLogging,
  makeSelectLoggingError,
} from 'containers/App/selectors';

import { loginUserWithEmail } from 'containers/App/actions';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ThreeCards from 'components/ThreeCards';
import LoginCover from 'images/loginCover.png';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

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

  const onFinish = values => {
    console.log(values);
    props.loginIn(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Helmet>
        <title>LoginPage</title>
        <meta name="LOGIN PAGE" content="WELCOME TO AI SCHOOL!" />
      </Helmet>
      <img
        style={{ height: '80%', objectFit: 'cover', width: '100%' }}
        src={LoginCover}
        alt="LoginCover"
        width="100%"
      />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <ThreeCards />
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object,
  AuthData: PropTypes.object.isRequired,
  isLogginIn: PropTypes.bool,
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
