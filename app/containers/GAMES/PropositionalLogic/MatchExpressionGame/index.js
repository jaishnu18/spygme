/**
 *
 * MatchExpressionGame
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
import makeSelectMatchExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';

export function MatchExpressionGame() {
  useInjectReducer({ key: 'matchExpressionGame', reducer });
  useInjectSaga({ key: 'matchExpressionGame', saga });

  return (
    <div>
      <Helmet>
        <title>MatchExpressionGame</title>
        <meta name="description" content="Description of MatchExpressionGame" />
      </Helmet>
    </div>
  );
}

MatchExpressionGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  matchExpressionGame: makeSelectMatchExpressionGame(),
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
)(MatchExpressionGame);
