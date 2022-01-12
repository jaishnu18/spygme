/**
 *
 * GradedMatchExpressionGame
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
import makeSelectGradedMatchExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';

export function GradedMatchExpressionGame() {
  useInjectReducer({ key: 'gradedMatchExpressionGame', reducer });
  useInjectSaga({ key: 'gradedMatchExpressionGame', saga });

  return (
    <div>
      <Helmet>
        <title>GradedMatchExpressionGame</title>
        <meta
          name="description"
          content="Description of GradedMatchExpressionGame"
        />
      </Helmet>
    </div>
  );
}

GradedMatchExpressionGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gradedMatchExpressionGame: makeSelectGradedMatchExpressionGame(),
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
)(GradedMatchExpressionGame);
