/* eslint-disable react/prop-types */
/**
 *
 * OnBoardingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOnBoardingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { activateAccountStart } from './actions';

export function OnBoardingPage(props) {
  useInjectReducer({ key: 'onBoardingPage', reducer });
  useInjectSaga({ key: 'onBoardingPage', saga });

  const activateAccount = () => {
    const { token } = props.match.params;
    props.activateUser(token);
  };

  return (
    <div>
      <Helmet>
        <title>OnBoardingPage</title>
        <meta name="description" content="Description of OnBoardingPage" />
      </Helmet>
      <div />
      <Button onClick={activateAccount}>Activate Account</Button>
    </div>
  );
}

OnBoardingPage.propTypes = {
  activateUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  onBoardingPage: makeSelectOnBoardingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    activateUser: token => dispatch(activateAccountStart(token)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OnBoardingPage);
