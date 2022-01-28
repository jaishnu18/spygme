/**
 *
 * TestNotAllowedPage
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
import makeSelectTestNotAllowedPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Result from 'antd/lib/result';
import CustomButton from 'components/atoms/CustomButton';

export function TestNotAllowedPage() {
  useInjectReducer({ key: 'testNotAllowedPage', reducer });
  useInjectSaga({ key: 'testNotAllowedPage', saga });

  return (
    <div>
      <Helmet>
        <title>TestNotAllowedPage</title>
        <meta name="description" content="Description of TestNotAllowedPage" />
      </Helmet>
      <Result
        status="403"
        title="Not Allowed"
        subTitle="Sorry, you have already attemted this graded test 3 times."
        extra={<CustomButton type="primary" onClick={() => { history.back(); }}>Back to Materials</CustomButton>}
      />
    </div>
  );
}

TestNotAllowedPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  testNotAllowedPage: makeSelectTestNotAllowedPage(),
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
)(TestNotAllowedPage);
