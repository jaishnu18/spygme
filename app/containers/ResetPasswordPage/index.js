/**
 *
 * ResetPasswordPage
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
import makeSelectResetPasswordPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ResetPasswordPage() {
  useInjectReducer({ key: 'resetPasswordPage', reducer });
  useInjectSaga({ key: 'resetPasswordPage', saga });

  return (
    <div>
      <Helmet>
        <title>ResetPasswordPage</title>
        <meta name="description" content="Description of ResetPasswordPage" />
      </Helmet>
    </div>
  );
}

ResetPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetPasswordPage: makeSelectResetPasswordPage(),
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
)(ResetPasswordPage);
