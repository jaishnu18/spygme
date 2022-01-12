/**
 *
 * GradedExpressionEvaluationGame
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
import makeSelectGradedExpressionEvaluationGame from './selectors';
import reducer from './reducer';
import saga from './saga';

export function GradedExpressionEvaluationGame() {
  useInjectReducer({ key: 'gradedExpressionEvaluationGame', reducer });
  useInjectSaga({ key: 'gradedExpressionEvaluationGame', saga });

  return (
    <div>
      <Helmet>
        <title>GradedExpressionEvaluationGame</title>
        <meta
          name="description"
          content="Description of GradedExpressionEvaluationGame"
        />
      </Helmet>
    </div>
  );
}

GradedExpressionEvaluationGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gradedExpressionEvaluationGame: makeSelectGradedExpressionEvaluationGame(),
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
)(GradedExpressionEvaluationGame);
