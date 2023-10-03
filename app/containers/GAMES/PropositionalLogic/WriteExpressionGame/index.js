/* eslint-disable radix */
/* eslint-disable react/prop-types */
/**
 *
 * WriteExpressionGame
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import { start, end } from 'utils/timerFunctions';
import moment from 'moment';
import GameComponent from 'components/GAMES/PropositionalLogic/WriteExpressionGame';
import Title from 'antd/lib/typography/Title';
import message from 'antd/lib/message';
import makeSelectWriteExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';
import VideoRecorder from 'components/VideoRecorder';

import {
  getGraphStart,
  evaluateExpressionStart,
  putFeedbackStart,
} from './actions';

export function WriteExpressionGame(props) {
  useInjectReducer({ key: 'writeExpressionGame', reducer });
  useInjectSaga({ key: 'writeExpressionGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState('$');
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [movement, setMovement] = useState([]);
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [components, setComponents] = useState([]);

  useEffect(() => {
    props.getGameData(props.level);
    start(setStartTime);
  }, [props.level]);

  useEffect(() => {
    if (
      evaluatedAnswer &&
      evaluatedAnswer.syntax_error === 'No syntax error' &&
      !alreadyFeedback
    )
      message.success('Please give us your valuable feedback below!', 3);

    if (
      props.writeExpressionGame &&
      props.writeExpressionGame.gameData &&
      props.writeExpressionGame.gameData.readingMaterialsNotRead
    ) {
      message.warn(
        'It seems like you have not read the reading materials. Please have a look at them for better performance',
        3,
      );
    }
  }, [props.writeExpressionGame]);

  const { gameData } = props.writeExpressionGame;
  const { evaluatedAnswer } = props.writeExpressionGame;
  const { conceptId } = props;
  const { topicId } = props;

  const submitWWW = values => {
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.feedback = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submit = () => {
    const secs = end(startTime);
    const response = {};
    gameData.response = value;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = parseInt(props.level);
    gameData.gameId = parseInt(props.gameId);
    response.studentResponse = gameData;
    response.movement = movement;
    response.initial_mouse_position = globalCoords;
    response.screen = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    };
    response.components = components;
    setMovement([]);
    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>Write Expression Game</title>
        <meta name="description" content="Description of WriteExpressionGame" />
      </Helmet>

      {gameData && (
        <>
          <GameBar
            name="Write Expression"
            level={props.level}
            attempts={gameData.attempt}
            totalLevels={gameData.maxLevels}
            evaluatedAnswer={evaluatedAnswer}
            maxLevel={4}
            conceptId={conceptId}
            topicId={topicId}
            saveFeedback={props.saveFeedback}
            movement={movement}
            setMovement={setMovement}
            components={components}
            setComponents={setComponents}
          />

          <VideoRecorder
            practise
            topicId={topicId}
            conceptId={conceptId}
            gameId={props.gameId}
            level={props.level}
          />

          <GameComponent
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
            animate
            visualize
            level={props.level}
            submit={submit}
            setValue={setValue}
            value={value}
            submitFeedback={submitFeedback}
            submitWWW={submitWWW}
            movement={movement}
            setMovement={setMovement}
            components={components}
            setComponents={setComponents}
          />
        </>
      )}
    </div>
  );
}

WriteExpressionGame.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  writeExpressionGame: PropTypes.object,
  getGameData: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
  checkStudentResponse: PropTypes.func.isRequired,
  // saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  writeExpressionGame: makeSelectWriteExpressionGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: level => dispatch(getGraphStart(level)),
    checkStudentResponse: level => dispatch(evaluateExpressionStart(level)),
    saveFeedback: feedback => dispatch(putFeedbackStart(feedback)),
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
