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
import makeSelectForgotPasswordPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ForgotPasswordPage() {
  useInjectReducer({ key: 'forgotPasswordPage', reducer });
  useInjectSaga({ key: 'forgotPasswordPage', saga });

  return (
    <div>
      <Helmet>
        <title>ForgotPasswordPage</title>
        <meta name="description" content="Description of ForgotPasswordPage" />
      </Helmet>
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
    dispatch,
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
