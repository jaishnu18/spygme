/**
 *
 * NotFoundPage
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

export function NotFoundPage() {
  return (
    <div>
      <Helmet>
        <title>NotFoundPage</title>
        <meta name="description" content="Description of NotFoundPage" />
      </Helmet>
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
