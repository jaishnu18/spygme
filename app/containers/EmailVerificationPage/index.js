/**
 *
 * EmailVerificationPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Title from 'antd/lib/typography/Title';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import makeSelectEmailVerificationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { verifyEmailStart } from './actions';

export function EmailVerificationPage(props) {
  useInjectReducer({ key: 'emailVerificationPage', reducer });
  useInjectSaga({ key: 'emailVerificationPage', saga });

  useEffect(() => {
    const { token } = props;
    props.verifyEmail({ token });
  }, []);

  console.log(props.state.isVerified);

  return (
    <div>
      <Helmet>
        <title>EmailVerificationPage</title>
        <meta
          name="description"
          content="Description of EmailVerificationPage"
        />
      </Helmet>
      <Row
        justify="center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '10vh',
        }}
      >
        <Col style={{ display: 'flex', justifyContent: 'center' }}>
          {props.state.isVerified && props.state.isVerified === 'Success' ? (
            <Title>Successfully Verified Please log in</Title>
          ) : (
            <Title>Failed to verify Sign up again</Title>
          )}
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => history.push('/auth')}>Log In</Button>
        </Col>
      </Row>
    </div>
  );
}

EmailVerificationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectEmailVerificationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(EmailVerificationPage);
