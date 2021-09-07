/**
 *
 * SignupPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Form, Input, message } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSignupPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getSignupStart } from './actions';

export function SignupPage(props) {
  useInjectReducer({ key: 'signupPage', reducer });
  useInjectSaga({ key: 'signupPage', saga });

  const onFinish = values => {
    console.log(values)
    props.registerUser(values);
    message.success(props.signupPage.signupMessage, 3.5);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Helmet>
        <title>SignupPage</title>
        <meta name="description" content="Description of SignupPage" />
      </Helmet>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
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
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Class"
          name="_class"
          rules={[
            {
              required: true,
              message: 'Please input your Class!',
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
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: 'Please Re-Enter your Password!',
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
    </div>
  );
}

SignupPage.propTypes = {
  registerUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  signupPage: makeSelectSignupPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    registerUser: payload => dispatch(getSignupStart(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignupPage);
