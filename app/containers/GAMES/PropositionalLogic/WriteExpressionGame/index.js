/**
 *
 * WriteExpressionGame
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
import makeSelectWriteExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';

export function WriteExpressionGame() {
  useInjectReducer({ key: 'writeExpressionGame', reducer });
  useInjectSaga({ key: 'writeExpressionGame', saga });

  return (
    <div>
      <Helmet>
        <title>WriteExpressionGame</title>
        <meta name="description" content="Description of WriteExpressionGame" />
      </Helmet>
    </div>
  );
}

WriteExpressionGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  writeExpressionGame: makeSelectWriteExpressionGame(),
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
)(WriteExpressionGame);
