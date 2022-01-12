/**
 *
 * GradedWriteExpressionGame
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
import makeSelectGradedWriteExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';

export function GradedWriteExpressionGame() {
  useInjectReducer({ key: 'gradedWriteExpressionGame', reducer });
  useInjectSaga({ key: 'gradedWriteExpressionGame', saga });

  return (
    <div>
      <Helmet>
        <title>GradedWriteExpressionGame</title>
        <meta
          name="description"
          content="Description of GradedWriteExpressionGame"
        />
      </Helmet>
    </div>
  );
}

GradedWriteExpressionGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gradedWriteExpressionGame: makeSelectGradedWriteExpressionGame(),
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
)(GradedWriteExpressionGame);
