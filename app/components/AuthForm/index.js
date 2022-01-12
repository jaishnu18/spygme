/**
 *
 * AuthForm
 *
 */

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tabs from 'antd/lib/tabs';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import InputNumber from 'antd/lib/input-number';
import Divider from 'antd/lib/divider';
import Alert from 'antd/lib/alert';

import React, { memo } from 'react';
import Section from 'components/Section';
import H4 from 'components/atoms/H4';
import { GoogleLogin } from 'react-google-login';
import { SHADOW1, GOOGLE_CLIENT_ID } from 'utils/constants';
import PropTypes from 'prop-types';
import CustomCard from 'components/CustomCard';
import GoogleOutlined from '@ant-design/icons/GoogleOutlined';
// import styled from 'styled-components';

const { TabPane } = Tabs;

function GoogleButton(props) {
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      render={renderProps => (
        <Button
          type="primary"
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

function AuthForm(props) {
  return (
    <Section height="calc(100vh - 64px)">
      <Row style={{ justifyContent: 'center' }}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 10 }}
          xl={{ span: 8 }}
        >
          <CustomCard shadow={SHADOW1} borderRadius="8px">
            <H4>SIGN IN TO YOUR ACCOUNT</H4>

            {props.errorMessages ? (
              props.errorMessages.map(errorMessage => (
                <Alert
                  style={{ marginTop: '10px' }}
                  message={errorMessage}
                  type="error"
                  showIcon
                />
              ))
            ) : (
              <span />
            )}

            <Tabs defaultActiveKey="2" style={{ marginTop: '10px' }}>
              <TabPane tab="New User" key="1">
                <Form
                  name="basic"
                  style={{ marginTop: '20px' }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={props.handleSignUp}
                  onFinishFailed={props.handleError}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email Address!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email Id (personal)"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email Address!',
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
                        message: 'Please input your class!',
                      },
                    ]}
                  >
                    <InputNumber />
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
                    label="Confirm Password"
                    name="confirm_password"
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                    <Button type="primary" htmlType="submit">
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>

                <Divider>or</Divider>
                <div style={{ textAlign: 'center' }}>
                  <GoogleButton
                    text="Sign Up with Google"
                    onSuccess={props.googleSignIn}
                  />
                </div>
              </TabPane>
              <TabPane tab="Returning User" key="2">
                <Form
                  name="basic"
                  style={{ marginTop: '20px' }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={props.handleSignIn}
                  onFinishFailed={props.handleError}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email Id"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email Address!',
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
                      offset: 10,
                      span: 12,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
                <Divider>or</Divider>
                <div style={{ textAlign: 'center' }}>
                  <GoogleButton
                    text="Sign In with Google"
                    onSuccess={props.googleSignIn}
                  />
                </div>
              </TabPane>
            </Tabs>
          </CustomCard>
        </Col>
      </Row>
    </Section>
  );
}

AuthForm.propTypes = {
  handleSignUp: PropTypes.func,
  handleSignIn: PropTypes.func,
  handleError: PropTypes.func,
  googleSignIn: PropTypes.func,
  errorMessages: PropTypes.array,
};

GoogleButton.propTypes = {
  text: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default memo(AuthForm);
