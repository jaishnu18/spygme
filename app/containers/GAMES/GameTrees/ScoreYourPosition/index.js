/**
 *
 * ScoreYourPosition
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { start, end } from 'utils/timerFunctions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import message from 'antd/lib/message';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import moment from 'moment';
import GameBar from '../../../../components/GAMES/GameTrees/components/GameBar';
import makeSelectScoreYourPosition from './selectors';
import ScoreYourPositionGame from '../../../../components/GAMES/GameTrees/ScoreYourPosition';
import reducer from './reducer';
import saga from './saga';

import {
  getGameDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function ScoreYourPosition(props) {
  useInjectReducer({ key: 'scoreYourPosition', reducer });
  useInjectSaga({ key: 'scoreYourPosition', saga });

  const [startTime, setStartTime] = useState(0);
  const [movement, setMovement] = useState([]);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);

  const { level } = props;
  const { gameId } = props;
  const { conceptId } = props;
  const { topicId } = props;

  useEffect(() => {
    console.log('ttt',evaluatedAnswer);
    if (evaluatedAnswer && !alreadyFeedback)
      message.success('Please give us your valuable feedback below!', 3);
  }, [props.state]);


  useEffect(() => {
    props.getGameData(1);
    start(setStartTime);
  }, []);

  console.log('containers', props.state);

  const { gameData } = props.state;
  const { evaluatedAnswer } = props.state;
  console.log(evaluatedAnswer);

  function submit(tree) {
    const secs = end(startTime);
    const formatted = moment.utc(secs * 1000).format('mm:ss');

    const convertedTree = tree.map(Number);
    const studentResponse = {
      answer_tree: convertedTree,
      gameId: props.gameId,
      level: props.level,
      timeTaken: formatted,
    };
    props.checkStudentResponse({ studentResponse });
  }

  const submitWWW = values => {
    console.log('123',values);
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    console.log('456',values);
    const response = {};
    response.feedback = JSON.stringify(values);
    props.saveFeedback(response);
  };

  return (
    <div>
      <Helmet>
        <title>ScoreYourPosition</title>
        <meta name="description" content="Description of ScoreYourPosition" />
      </Helmet>

      {props.state.gameData && !props.state.isResponseLoading && (
        <>
          <GameBar
            name="Score your position"
            level={level}
            attempts={props.state.gameData.attempt}
            maxLevel="3"
            evaluatedAnswer={evaluatedAnswer}
            conceptId={conceptId}
            topicId={topicId}
            saveFeedback={props.saveFeedback}
            movement={0}
            setMovement={setMovement}
          />
          <ScoreYourPositionGame
            gameData={gameData}
            submit={submit}
            evaluatedAnswer={evaluatedAnswer}
            submitWWW={submitWWW}
            submitFeedback={submitFeedback}
          />
        </>
      )}
    </div>
  );
}

ScoreYourPosition.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
  //saveFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectScoreYourPosition(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: payload => dispatch(getGameDataStart(payload)),
    checkStudentResponse: response => dispatch(evaluateResponseStart(response)),
    saveFeedback: feedback=> dispatch(putFeedbackStart(feedback)),
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