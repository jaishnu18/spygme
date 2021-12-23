/* eslint-disable prefer-promise-reject-errors */
/**
 *
 * SignupForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Button, Row } from 'antd';
import CustomInput from 'components/atoms/CustomInput';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from 'utils/constants';

import { Link } from 'react-router-dom';

import SolidButton from '../atoms/SolidButton';

const layout = {
  wrapperCol: { xs: { span: 20 }, md: { span: 24 } },
};

const CustomForm = styled(Form)`
  width: 100% !important;
  .ant-form-item {
    margin-bottom: 0 !important;

    .ant-form-item-control {
      .ant-form-item-explain {
        margin-top: -14px !important;
        margin-bottom: 10px;
        margin-left: 20px;
      }
    }
  }
`;

function SignupForm(props) {
  const onFinish = values => {
    console.log(values);
    props.signIn(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Row justify="center">
        <h2
          style={{
            color: 'whitesmoke',
            fontWeight: 600,
            fontSize: 28,
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'cursive',
          }}
        >
          Register
        </h2>
      </Row>
      <CustomForm
        {...layout}
        size="large"
        name="basic"
        wrapperCol={{
          span: 22,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          justify="center"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Full name!',
            },
          ]}
        >
          <CustomInput id="signup-name" label="Name" />
        </Form.Item>

        <Form.Item
          justify="center"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <CustomInput type="email" id="signup-email" label="Email" />
        </Form.Item>

        <Form.Item
          justify="center"
          name="_class"
          rules={[
            {
              required: true,
              message: 'Please input your Standard!',
            },
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject();
                }
                if (value < 6 || value > 12) {
                  return Promise.reject('Class Should be between 6 to 12');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <CustomInput type="number" id="signup-standard" label="Class" />
        </Form.Item>

        <Form.Item
          justify="center"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <CustomInput type="password" id="signup-password" label="Password" />
        </Form.Item>

        <Form.Item
          justify="center"
          name="passwordConfirm"
          rules={[
            { required: true, message: 'Please Confirm input your password!' },
          ]}
        >
          <CustomInput
            type="password"
            id="signup-passwordConfirm"
            label="Confirm Password"
          />
        </Form.Item>

        <Form.Item justify="center">
          <div style={{ textAlign: 'center' }}>
            <SolidButton
              type="primary"
              htmlType="submit"
              width="60%"
              margintop="20px"
              marginbottom="15px"
            >
              Submit
            </SolidButton>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
            }}
          >
            <Link
              to="/login"
              style={{
                color: 'whitesmoke',
                fontWeight: 700,
                marginBottom: '40px',
              }}
            >
              Already a User? Login here
            </Link>
          </div>
        </Form.Item>
      </CustomForm>
    </div>
  );
}

SignupForm.propTypes = {
  signIn: PropTypes.func,
};

export default memo(SignupForm);
