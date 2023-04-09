/**
 *
 * ScoreYourPosition
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameBar from 'components/GameBar';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectScoreYourPosition from './selectors';
import ScoreYourPositionGame from '../../../../components/GAMES/GameTrees/ScoreYourPosition';
import reducer from './reducer';
import saga from './saga';

import {
  getGameDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function ScoreYourPosition() {
  useInjectReducer({ key: 'scoreYourPosition', reducer });
  useInjectSaga({ key: 'scoreYourPosition', saga });

  useEffect(() => {}, []);

  return (
    <div>
      <Helmet>
        <title>ScoreYourPosition</title>
        <meta name="description" content="Description of ScoreYourPosition" />
      </Helmet>

      {1 && 1 && (
        <>
          <GameBar
            name="Score your position"
            // level={1}
            // attempts={props.state.gameData.attempt}
            // maxLevel="3"
            // evaluatedAnswer={evaluatedAnswer}
            // conceptId={conceptId}
            // topicId={topicId}
            // saveFeedback={props.saveFeedback}
            // movement={movement}
            // setMovement={setMovement}
          />
          <ScoreYourPositionGame />
        </>
      )}
    </div>
  );
}

ScoreYourPosition.propTypes = {
  getGameData: PropTypes.func.isRequired,
  evaluateResponse: PropTypes.func.isRequired,
  putFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectScoreYourPosition(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: payload => dispatch(getGameDataStart(payload)),
    evaluateResponse: payload => dispatch(evaluateResponseStart(payload)),
    putFeedback: payload => dispatch(putFeedbackStart(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ScoreYourPosition);
