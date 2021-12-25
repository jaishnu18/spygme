/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Button, Row } from 'antd';
import CustomInput from 'components/atoms/CustomInput';
import SolidButton from 'components/atoms/SolidButton';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from 'utils/constants';
import { GoogleOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

export function GoogleButton(props) {
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      render={renderProps => (
        <Button
          type="primary"
          style={{ backgroundColor: 'blue' }}
          icon={<GoogleOutlined />}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          {props.text}
        </Button>
      )}
      onSuccess={props.onSuccess}
      cookiePolicy="single_host_origin"
    />
  );
}

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

function LoginForm(props) {
  return (
    <div>
      <Row justify="center">
        <h1
          style={{
            color: 'whitesmoke',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'cursive',
            letterSpacing: '1px',
          }}
        >
          Login
        </h1>
      </Row>
      <CustomForm
        {...layout}
        size="large"
        name="basic"
        wrapperCol={{
          span: 21,
        }}
        onFinish={props.handleSignIn}
        onFinishFailed={props.handleError}
      >
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
          <CustomInput type="email" id="email" label="Email" />
        </Form.Item>

        <Form.Item
          justify="center"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <CustomInput type="password" id="password" label="Password" />
        </Form.Item>

        <Form.Item justify="center" style={{ marginLeft: '0px' }}>
          <div style={{ textAlign: 'center' }}>
            <SolidButton
              type="primary"
              htmlType="submit"
              width="60%"
              margintop="20px"
              marginbottom="15px"
            >
              Login
            </SolidButton>
          </div>
          <div style={{ textAlign: 'center' }}>
            <GoogleButton
              text="Sign In with Google"
              onSuccess={props.googleSignIn}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 'auto',
            }}
          >
            {/* <Link
              to="/auth/signup"
              style={{
                color: 'whitesmoke',
                fontWeight: 700,
                marginBottom: '4px',
                marginTop: '12px',
                fontSize: '18px',
              }}
            > */}
              New Here? Register Here
            {/* </Link> */}

            {/* <Link
              to="/forgot-password"
              style={{
                color: 'whitesmoke',
                fontWeight: 700,
                marginBottom: '20px',
                fontSize: '18px',
              }}
            > */}
              Forgot Password? Recover your Account!
            {/* </Link> */}
          </div>
        </Form.Item>
      </CustomForm>
    </div>
  );
}

LoginForm.propTypes = {
  handleSignUp: PropTypes.func,
  handleSignIn: PropTypes.func,
  handleError: PropTypes.func,
  googleSignIn: PropTypes.func,
  errorMessages: PropTypes.array,
};

export default memo(LoginForm);
