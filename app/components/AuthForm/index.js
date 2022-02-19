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
import Radio from 'antd/lib/radio';
import history from 'utils/history';

import React, { memo } from 'react';
import Section from 'components/Section';
import H4 from 'components/atoms/H4';
import { GoogleLogin } from 'react-google-login';
import { SHADOW1, GOOGLE_CLIENT_ID } from 'utils/constants';
import PropTypes from 'prop-types';
import CustomCard from 'components/CustomCard';
import GoogleOutlined from '@ant-design/icons/GoogleOutlined';
import Title from 'antd/lib/typography/Title';
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
          style={{
            fontWeight: 500,
          }}
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
            <Title level={4}>SIGN IN TO YOUR ACCOUNT</Title>

            {props.errorMessages ? (
              props.errorMessages.map(errorMessage => (
                <Alert
                  style={{ marginTop: '10px' }}
                  message={JSON.stringify(errorMessage).substring(
                    1,
                    JSON.stringify(errorMessage).length - 1,
                  )}
                  type="error"
                  showIcon
                />
              ))
            ) : (
              <span />
            )}

            <Tabs
              defaultActiveKey="2"
              style={{ marginTop: '10px', fontWeight: 500 }}
              onChange={() => {
                props.resetErrorMessages();
              }}
            >
              <TabPane tab="New User" key="1">
                <Radio.Group buttonStyle="solid" defaultValue={props.userRole}>
                  <Radio.Button
                    onClick={() => props.setUserRole('Student')}
                    value="Student"
                  >
                    Student
                  </Radio.Button>
                  <Radio.Button
                    onClick={() => props.setUserRole('Teacher')}
                    value="Teacher"
                  >
                    Teacher
                  </Radio.Button>
                  <Radio.Button
                    onClick={() => props.setUserRole('Others')}
                    value="Others"
                  >
                    Others
                  </Radio.Button>
                </Radio.Group>
                <Form
                  name="basic"
                  style={{ marginTop: '20px' }}
                  labelCol={{ span: 6 }}
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
                        message: 'Please input your Name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

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

                  {props.userRole === 'Student' && (
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
                      <InputNumber max="12" min='4' />

                    </Form.Item>
                  )}

                  <Form.Item
                    label={
                      props.userRole === 'Others'
                        ? 'Organisation'
                        : 'School/Institution'
                    }
                    name="organisation"
                    rules={[
                      {
                        required: true,
                        message:
                          'Please input your School/Institution/Organisation!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    extra="Password length must be atleast 6 characters"
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

                  <Form.Item wrapperCol={{ span: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '30%', fontWeight: 500 }}
                      >
                        Sign Up
                      </Button>
                    </div>
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
              <TabPane tab="Existing User" key="2">
                <Form
                  name="basic"
                  style={{ marginTop: '20px' }}
                  labelCol={{ span: 5 }}
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

                  <Form.Item wrapperCol={{ span: 24 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '50%', fontWeight: 500 }}
                      >
                        Sign In
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => {
                          history.push('/forgot-password');
                        }}
                        style={{
                          width: '50%',
                          marginTop: '12px',
                          fontWeight: 500,
                        }}
                      >
                        Forgot Password?
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
                <Divider>or</Divider>

                <div style={{ textAlign: 'center' }}>
                  <GoogleButton
                    text="Sign In with Google"
                    onSuccess={props.googleSignIn}
                  />
                </div>
                <div style={{ marginTop: '12px', textAlign: 'center' }} />
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
