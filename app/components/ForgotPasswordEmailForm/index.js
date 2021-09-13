/* eslint-disable jsx-a11y/accessible-emoji */
/**
 *
 * ForgotPasswordEmailForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Button } from 'antd';
import CustomInput from 'components/atoms/CustomInput';
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

function ForgotPasswordEmailForm(props) {
  const onFinish = values => {
    console.log(values);
    props.signIn(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
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
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Registered Email!',
            },
          ]}
        >
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                color: 'whitesmoke',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              Forgot Password?
            </h1>
            <h2
              style={{
                color: 'whitesmoke',
                fontWeight: 700,
                marginBottom: '30px',
              }}
            >
              No Worries! We will Help you Recover &#128512;
            </h2>
          </div>
          <h3
            style={{
              color: 'whitesmoke',
              fontWeight: 600,
              marginLeft: '15px',
            }}
          >
            Please Enter your Email.
          </h3>
          <CustomInput id="forgot-password-email" label="Email" />
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            <SolidButton width="60%" margintop="20px" marginbottom="15px">
              Verify Email
            </SolidButton>
          </div>
        </Form.Item>
      </CustomForm>
    </div>
  );
}

ForgotPasswordEmailForm.propTypes = {
  signIn: PropTypes.func,
};

export default memo(ForgotPasswordEmailForm);
