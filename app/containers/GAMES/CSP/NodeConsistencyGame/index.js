/**
 *
 * NodeConsistencyGame
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import GameComponent from 'components/GAMES/CSP/NodeConsistency';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNodeConsistencyGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function NodeConsistencyGame() {
  useInjectReducer({ key: 'nodeConsistencyGame', reducer });
  useInjectSaga({ key: 'nodeConsistencyGame', saga });

  return (
    <div>
      <Helmet>
        <title>NodeConsistencyGame</title>
        <meta name="description" content="Description of NodeConsistencyGame" />
      </Helmet>
    </div>
  );
}

NodeConsistencyGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nodeConsistencyGame: makeSelectNodeConsistencyGame(),
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
)(NodeConsistencyGame);
