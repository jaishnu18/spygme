/**
 *
 * CustomProfile
 *
 */

import React, { memo } from 'react';
import { Row, Col, Button, Alert, Form, Input } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import CustomCard from 'components/CustomCard';
import { SHADOW1 } from 'utils/constants';

function CustomProfile(props) {
  const { profile } = props;

  return profile ? (
    <Row gutter={[32, 0]}>
      <Col
        sm={{ span: 24 }}
        md={{ span: 20, offset: 2 }}
        lg={{ span: 20, offset: 2 }}
        xl={{ span: 16, offset: 4 }}
      >
        <div style={{ fontSize: '24px', fontWeight: 600, color: 'white' }}>
          MY PROFILE
        </div>

        <Row
          gutter={[32, 32]}
          justify="space-around"
          style={{ marginTop: '20px' }}
        >
          <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <CustomCard shadow={SHADOW1} borderRadius="8px">
              <div style={{ fontSize: '18px', fontWeight: 600 }}>
                CONTACT INFORMATION
              </div>
              <Form
                name="profileForm"
                style={{ marginTop: '25px' }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{
                  name: profile.name,
                  email: profile.email,
                  phoneNumber: profile.phone_number,
                  __class: profile.class,
                  school: profile.school_name,
                }}
                onFinish={props.handleEditProfile}
                autoComplete="off"
              >
                <Form.Item label="Name" name="name">
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Phone" name="phoneNumber">
                  <Input />
                </Form.Item>
                <Form.Item label="Class" name="__class">
                  <Input />
                </Form.Item>
                <Form.Item label="School" name="school">
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6 }}>
                  <div style={{ display: 'flex' }}>
                    <Button
                      style={{ marginLeft: 'auto' }}
                      type="primary"
                      htmlType="submit"
                    >
                      Update Profile
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </CustomCard>
          </Col>
          <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
            <CustomCard shadow={SHADOW1} borderRadius="8px">
              <div style={{ fontSize: '18px', fontWeight: 600 }}>
                CHANGE PASSWORD
              </div>

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

              <Form
                name="changePasswordForm"
                style={{ marginTop: '25px' }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={props.handleChangePassword}
                autoComplete="off"
              >
                <Form.Item
                  label="Old Password"
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
                  label="New Password"
                  name="passwordNew"
                  rules={[
                    {
                      required: true,
                      message: 'Please input new password!',
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
                      message: 'Please input confirm password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8 }}>
                  <div style={{ display: 'flex' }}>
                    <Button
                      style={{ marginLeft: 'auto' }}
                      type="primary"
                      htmlType="submit"
                    >
                      Change Password
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </CustomCard>
          </Col>
        </Row>
      </Col>
    </Row>
  ) : (
    <span />
  );
}

CustomProfile.propTypes = {
  profile: PropTypes.object,
  handleEditProfile: PropTypes.func,
  handleChangePassword: PropTypes.func,
  errorMessages: PropTypes.array,
};

export default memo(CustomProfile);
