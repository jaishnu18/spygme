/**
 *
 * ForgotPasswordPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Section from 'components/Section';
import Title from 'antd/lib/typography/Title';
import makeSelectForgotPasswordPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { forgotPasswordStart } from './actions';

export function ForgotPasswordPage(props) {
  useInjectReducer({ key: 'forgotPasswordPage', reducer });
  useInjectSaga({ key: 'forgotPasswordPage', saga });

  const onFinish = values => {
    props.forgotPasswordEmailVerify(values);
  };

  return (
    <div>
      <Helmet>
        <title>ForgotPasswordPage</title>
        <meta name="description" content="Description of ForgotPasswordPage" />
      </Helmet>
      <Section height="calc(100vh - 64px)">
        <Row justify="center">
          <Col
            xs={{ span: 24 }}
            xl={{ span: 10 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              border: '1px solid',
              padding: '30px',
              flexDirection: 'column',
            }}
          >
            <Title style={{ textAlign: 'center' }}>Reset your Password</Title>
            <div>
              <Form
                name="Forgot Password"
                style={{ marginTop: '20px' }}
                onFinish={onFinish}
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Send Verification Link
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Section>
    </div>
  );
}

ForgotPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgotPasswordPage: makeSelectForgotPasswordPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    forgotPasswordEmailVerify: payload =>
      dispatch(forgotPasswordStart(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ForgotPasswordPage);
