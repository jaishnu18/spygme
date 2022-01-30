/**
 *
 * NotFoundPage
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Result from 'antd/lib/result';
import CustomButton from 'components/atoms/CustomButton';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div>
      <Helmet>
        <title>NotFoundPage</title>
        <meta name="description" content="Description of NotFoundPage" />
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <CustomButton type="primary">Back Home</CustomButton>
          </Link>
        }
      />
      ,
    </div>
  );
}

NotFoundPage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NotFoundPage);
