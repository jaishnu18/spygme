/**
 *
 * GradedArcConsistency
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
import makeSelectGradedArcConsistency from './selectors';
import reducer from './reducer';
import saga from './saga';

export function GradedArcConsistency() {
  useInjectReducer({ key: 'gradedArcConsistency', reducer });
  useInjectSaga({ key: 'gradedArcConsistency', saga });

  return (
    <div>
      <Helmet>
        <title>GradedArcConsistency</title>
        <meta
          name="description"
          content="Description of GradedArcConsistency"
        />
      </Helmet>
    </div>
  );
}

GradedArcConsistency.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gradedArcConsistency: makeSelectGradedArcConsistency(),
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
)(GradedArcConsistency);
