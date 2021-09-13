/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Button } from 'antd';
import CustomInput from 'components/atoms/CustomInput';
import SolidButton from 'components/atoms/SolidButton';
import { Link } from 'react-router-dom';

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
  const onFinish = values => {
    console.log(values);
    props.loginIn(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <CustomForm
        {...layout}
        size="large"
        name="basic"
        wrapperCol={{
          span: 21,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
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
          <CustomInput type="email" id="email" label="Email" />
        </Form.Item>

        <Form.Item
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

        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <SolidButton width="60%" margintop="20px" marginbottom="15px">
              Submit
            </SolidButton>
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
            <Link
              to="/signup"
              style={{
                color: 'whitesmoke',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              New Here? Register Here
            </Link>
            <Link
              to="/forgot-password"
              style={{
                color: 'whitesmoke',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Forgot Password? Recover your Account!
            </Link>
          </div>
        </Form.Item>
      </CustomForm>
    </div>
  );
}

LoginForm.propTypes = {
  loginIn: PropTypes.func,
};

export default memo(LoginForm);
