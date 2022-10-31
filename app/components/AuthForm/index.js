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

import React, { memo, useState } from 'react';
import Section from 'components/Section';
import H4 from 'components/atoms/H4';
import { GoogleLogin } from 'react-google-login';
import { SHADOW1, GOOGLE_CLIENT_ID } from 'utils/constants';
import AuthImage from 'images/AuthImage.jpg';
import PropTypes from 'prop-types';
import CustomCard from 'components/CustomCard';
import GoogleOutlined from '@ant-design/icons/GoogleOutlined';
import Title from 'antd/lib/typography/Title';
<<<<<<< HEAD
import styled from 'styled-components';
import useMediaQuery from '../../utils/useMediaQuery';
=======
import Select from 'antd/lib/select';
const { Option } = Select;
// import styled from 'styled-components';
>>>>>>> origin/bbiswabasu2

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
<<<<<<< HEAD
  const isDesktop = useMediaQuery('(min-width: 960px)');

=======
  const { schoolList } = props;
  const [filteredSchoolList, setFilteredSchoolList] = useState(new Array(0));
  const [getSchoolStarted, setGetSchoolStarted] = useState(false);
>>>>>>> origin/bbiswabasu2
  return (
    <StyledRow
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 80px)',
      }}
    >
      <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 0 }} xl={{ span: 12 }}>
        <div className="slide-right">
          <img
            src={AuthImage}
            alt="done"
            style={{
              width: '100%',
              height: 'calc(100vh - 80px)',
              objectFit: 'cover',
            }}
          />
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
<<<<<<< HEAD
        md={{ span: 12 }}
        xl={{ span: 12 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="fadeout" style={{ width: isDesktop && '60%' }}>
          <CustomCard
            height="80%"
            shadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
            borderRadius="8px"
          >
            <Title level={4}>SIGN IN TO YOUR ACCOUNT</Title>
=======
        md={{ span: 23 }}
        xl={{ span: 23 }}
        style={{ display: 'flex' }}
      >
        <Row style={{ width: '100%' }}>
          <Col span={7}>
            <img
              src={AuthImage}
              alt="done"
              // style={{ width: '100%', height: 'max-content' }}
              style={{
                width: '100%',
              }}
            />
          </Col>
          <Col span={14}>
            <CustomCard shadow={SHADOW1} borderRadius="8px">
              <Title level={4}>SIGN IN TO YOUR ACCOUNT</Title>
>>>>>>> origin/bbiswabasu2

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
                        message: 'Please input your Name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

<<<<<<< HEAD
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
=======
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
                        <InputNumber />
                      </Form.Item>
                    )}

                    {props.userRole !== 'Others' &&
                      <Form.Item
                        label={
                          'Pincode'
                        }
                        name="pincode"
                        rules={[
                          {
                            required: true,
                            message:
                              'Please input your School/Institution pincode!',
                          },
                        ]}
                      >
                        <InputNumber max={999999} onChange={(value) => {
                          let filteredList = [];
                          if (!schoolList && !getSchoolStarted) {
                            props.getSchoolList();
                            setGetSchoolStarted(true);
                          }
                          if (value >= 100000) {
                            for (let i = 0; i < schoolList.length; i++) {
                              if (schoolList[i].pin_code == value) {
                                filteredList.push(schoolList[i]);
                              }
                            }
                          }
                          setFilteredSchoolList(filteredList);
                        }} />
                      </Form.Item>
                    }
>>>>>>> origin/bbiswabasu2
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
<<<<<<< HEAD
                      <InputNumber max="12" min="4" />
=======
                      <Select
                        showSearch
                        optionFilterProp="children"
                        onChange={props.onFilter}
                        style={{ width: '100%' }}
                        allowClear >
                        {
                          filteredSchoolList.map((key, idx) => (
                            <Option value={`${key.id}-${key.name}`}>{key.name}</Option>
                          ))
                        }
                      </Select>
>>>>>>> origin/bbiswabasu2
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
                        style={{
                          width: isDesktop ? '30%' : '100%',
                          fontWeight: 500,
                        }}
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
                        style={{
                          width: isDesktop ? '45%' : '100%',
                          fontWeight: 500,
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => {
                          history.push('/forgot-password');
                        }}
                        style={{
                          width: isDesktop ? '45%' : '100%',
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
        </div>
      </Col>
    </StyledRow>
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

const StyledRow = styled(Row)`
  .slide-right,
  .slide-left {
    width: 100%;
  }

  /***** Slide Right *****/
  .slide-right {
    animation: 1s slide-right;
  }
  @keyframes slide-right {
    from {
      margin-left: -100%;
    }
    to {
      margin-left: 0%;
    }
  }

  .fadein {
    opacity: 0 !important;
    animation: fadeInUp 4s !important;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0 !important;
      -webkit-transform: translate3d(0, 100%, 0) !important;
      transform: translate3d(0, 100%, 0) !important;
    }

    to {
      opacity: 1 !important;
      -webkit-transform: none !important;
      transform: none !important;
    }
  }
`;
