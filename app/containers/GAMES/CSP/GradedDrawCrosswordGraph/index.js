/**
 *
 * GradedDrawCrosswordGraph
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
import makeSelectGradedDrawCrosswordGraph from './selectors';
import reducer from './reducer';
import saga from './saga';

export function GradedDrawCrosswordGraph() {
  useInjectReducer({ key: 'gradedDrawCrosswordGraph', reducer });
  useInjectSaga({ key: 'gradedDrawCrosswordGraph', saga });

  return (
    <div>
      <Helmet>
        <title>GradedDrawCrosswordGraph</title>
        <meta
          name="description"
          content="Description of GradedDrawCrosswordGraph"
        />
      </Helmet>
    </div>
  );
}

GradedDrawCrosswordGraph.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gradedDrawCrosswordGraph: makeSelectGradedDrawCrosswordGraph(),
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
)(GradedDrawCrosswordGraph);
