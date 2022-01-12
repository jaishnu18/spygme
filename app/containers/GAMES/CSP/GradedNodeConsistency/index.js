/**
 *
 * GradedNodeConsistency
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
import makeSelectGradedNodeConsistency from './selectors';
import reducer from './reducer';
import saga from './saga';

export function GradedNodeConsistency() {
  useInjectReducer({ key: 'gradedNodeConsistency', reducer });
  useInjectSaga({ key: 'gradedNodeConsistency', saga });

  return (
    <div>
      <Helmet>
        <title>GradedNodeConsistency</title>
        <meta
          name="description"
          content="Description of GradedNodeConsistency"
        />
      </Helmet>
    </div>
  );
}

GradedNodeConsistency.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gradedNodeConsistency: makeSelectGradedNodeConsistency(),
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
)(GradedNodeConsistency);
