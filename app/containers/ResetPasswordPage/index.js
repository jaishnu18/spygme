/* eslint-disable no-param-reassign */
/**
 *
 * ResetPasswordPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Section from 'components/Section';
import Title from 'antd/lib/typography/Title';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import makeSelectResetPasswordPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { verifyEmailStart, changePasswordStart } from './actions';
import jwtDecode from 'jwt-decode';

export function ResetPasswordPage(props) {
  useInjectReducer({ key: 'resetPasswordPage', reducer });
  useInjectSaga({ key: 'resetPasswordPage', saga });

  useEffect(() => {
    const { token } = props;
  }, []);

  console.log(props.state.isVerified);

  const onFinish = values => {
    values.token = props.token;
    props.resetPassword(values);
  };

  return (
    <div>
      <Helmet>
        <title>ResetPasswordPage</title>
        <meta name="description" content="Description of ResetPasswordPage" />
      </Helmet>
      <Row>
        <>
          <Form
            name="Reset Password"
            style={{ marginTop: '20px' }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="New Password"
              name="password"
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
              label="Confirm Password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email Address!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Change Password
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
        {/* ) : (
          <>
            <Title style={{ textAlign: 'center' }}>
              We failed to verify your Email. Please Try Again.
            </Title>
            <Button
              onClick={() => {
                history.push('/forgot-password');
              }}
            />
          </>
        )} */}
      </Row>
    </div>
  );
}

ResetPasswordPage.propTypes = {
  state: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectResetPasswordPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: payload => dispatch(changePasswordStart(payload)),
    verifyEmail: email => dispatch(verifyEmailStart(email)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ResetPasswordPage);
