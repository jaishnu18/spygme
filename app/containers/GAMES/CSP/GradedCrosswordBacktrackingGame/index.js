/**
 *
 * GradedCrosswordBacktrackingGame
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
import makeSelectGradedCrosswordBacktrackingGame from './selectors';
import reducer from './reducer';
import saga from './saga';

export function GradedCrosswordBacktrackingGame() {
  useInjectReducer({ key: 'gradedCrosswordBacktrackingGame', reducer });
  useInjectSaga({ key: 'gradedCrosswordBacktrackingGame', saga });

  return (
    <div>
      <Helmet>
        <title>GradedCrosswordBacktrackingGame</title>
        <meta
          name="description"
          content="Description of GradedCrosswordBacktrackingGame"
        />
      </Helmet>
    </div>
  );
}

GradedCrosswordBacktrackingGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gradedCrosswordBacktrackingGame: makeSelectGradedCrosswordBacktrackingGame(),
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
)(GradedCrosswordBacktrackingGame);
