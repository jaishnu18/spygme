/**
 *
 * MyProfileComponent
 *
 */

import React, { memo, useState } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import InputNumber from 'antd/lib/input-number';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import CustomCard from 'components/CustomCard';
import { SHADOW1 } from 'utils/constants';
import H1 from 'components/atoms/H1';
import Select from 'antd/lib/select';

import BgProfile from 'images/bgProfile.jpg';
import useMediaQuery from '../../utils/useMediaQuery';
const { Option } = Select;
function MyProfileComponent(props) {
  const { profile } = props;
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const { schoolList } = props;
  const [filteredSchoolList, setFilteredSchoolList] = useState(new Array(0));
  const [getSchoolStarted, setGetSchoolStarted] = useState(false);
  return profile ? (
    <Row
      style={{
        backgroundImage: `url(${BgProfile})`,
        backgroundSize: 'cover',
        padding: '20px',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Col style={{ padding: '16px' }} xl={{ span: 24 }}>
        <H1 fontSize="30" textAlign="center" fontWeight="700">
          MY PROFILE
        </H1>
      </Col>
      <Col
        sm={{ span: 24 }}
        xl={{ span: 10 }}
        style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}
      >
        <CustomCard shadow={SHADOW1} borderRadius="8px" width="50%">
          <H1 style={{ fontSize: '18px', fontWeight: 600 }}>
            CONTACT INFORMATION
          </H1>
          <Form
            name="profileForm"
            style={{ marginTop: '25px' }}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            initialValues={{
              name: profile.name,
              email: profile.email,
              phoneNumber: profile.phone_number,
              __class: profile.class,
              school: profile.organisation,
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
            {(!profile.role || profile.role === 'Student') && (
              <Form.Item label="Class" name="__class">
                <InputNumber min="4" max="12" />
              </Form.Item>
            )}
            {profile.role && profile.role !== 'Others' && (
              <Form.Item label="Pincode" name="pincode">
                <InputNumber
                  max={999999}
                  onChange={value => {
                    const filteredList = [];
                    if (!schoolList && !getSchoolStarted) {
                      props.getSchoolList();
                      setGetSchoolStarted(true);
                    }
                    if (value >= 100000) {
                      for (let i = 0; i < schoolList.length; i += 1) {
                        if (schoolList[i].pin_code === value) {
                          filteredList.push(schoolList[i]);
                        }
                      }
                    }
                    setFilteredSchoolList(filteredList);
                  }}
                />
              </Form.Item>
            )}
            {props.userRole !== 'Others' ? (
              <Form.Item label="School/Institution" name="school">
                <Select
                  showSearch
                  optionFilterProp="children"
                  onChange={props.onFilter}
                  style={{ width: '100%' }}
                  allowClear
                >
                  {filteredSchoolList.map((key, idx) => (
                    <Option value={`${key.id}-${key.name}`}>{key.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item label="Organisation" name="school">
                <Input />
              </Form.Item>
            )}

            {!profile.role && (
              <Form.Item
                label="Role"
                name="role"
                extra="Once set cannot be changed."
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="Student">Student</Radio.Button>
                  <Radio.Button value="Teacher">Teacher</Radio.Button>
                  <Radio.Button value="Others">Others</Radio.Button>
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item wrapperCol={{ offset: isDesktop && 6 }}>
              <div style={{ display: 'flex' }}>
                <Button
                  style={{
                    marginLeft: 'auto',
                    backgroundColor: 'var(--primaryColor)',
                    color: '#fff',
                  }}
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
      <Col
        xs={{ span: 24 }}
        xl={{ span: 10 }}
        style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}
      >
        <CustomCard shadow={SHADOW1} borderRadius="8px" width="50%">
          <H1 style={{ fontSize: '18px', fontWeight: 600 }}>CHANGE PASSWORD</H1>

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
            <Form.Item wrapperCol={{ offset: isDesktop && 8 }}>
              <div style={{ display: 'flex' }}>
                <Button
                  style={{
                    marginLeft: 'auto',
                    backgroundColor: 'var(--primaryColor)',
                    color: '#fff',
                  }}
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
  ) : (
    <span />
  );
}

MyProfileComponent.propTypes = {
  profile: PropTypes.object,
  handleEditProfile: PropTypes.func,
  handleChangePassword: PropTypes.func,
  errorMessages: PropTypes.array,
};

export default memo(MyProfileComponent);
