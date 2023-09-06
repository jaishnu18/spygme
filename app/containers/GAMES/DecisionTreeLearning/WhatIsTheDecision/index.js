/**
 *
 * WhatIsTheDecision
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameBar from 'components/GameBar';

import message from 'antd/lib/message';
import GameComponent from 'components/GAMES/DecisionTreeLearning/WhatIsTheDecisionComponent';
import { start, end } from 'utils/timerFunctions';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectWhatIsTheDecision from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getGameDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function WhatIsTheDecision(props) {
  useInjectReducer({ key: 'whatIsTheDecision', reducer });
  useInjectSaga({ key: 'whatIsTheDecision', saga });

  const [startTime, setStartTime] = useState(0);
  const [movement, setMovement] = useState([]);
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [components, setComponents] = useState([]);

  const { topicId } = props;
  const { conceptId } = props;
  const { gameId } = props;
  const { level } = props;

  useEffect(() => {
    props.getGameData(level);
    start(setStartTime);
  }, [level]);

  const { gameData } = props.state;

  useEffect(() => {
    if (gameData && gameData.readingMaterialsNotRead) {
      message.warn(
        'It seems like you have not read the reading materials. Please have a look at them for better performance',
        3,
      );
    }
  }, [gameData]);

  const { evaluatedAnswer } = props.state;

  useEffect(() => {
    if (evaluatedAnswer)
      message.success('Please give us your valuable feedback below!', 3);
  }, [evaluatedAnswer]);

  const submitWWW = values => {
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    response.movement = JSON.stringify(movement);
    setMovement([]);
    props.putFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.feedback = JSON.stringify(values);
    response.movement = JSON.stringify(movement);
    setMovement([]);
    props.putFeedback(response);
  };

  const submit = value => {
    const secs = end(startTime);
    const response = {};

    gameData.response = {
      dataset: gameData.dataset,
      labels: gameData.labels,
      input: gameData.input,
      answer: value.output,
    };
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = level;
    gameData.gameId = gameId;
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

    props.evaluateResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>WhatIsTheDecision</title>
        <meta name="description" content="Description of WhatIsTheDecision" />
      </Helmet>

      {gameData && (
        <>
          <GameBar
            name="Find Missing Node"
            level={level}
            attempts={gameData.attempt}
            maxLevel={3}
            evaluatedAnswer={evaluatedAnswer}
            conceptId={conceptId}
            topicId={topicId}
            saveFeedback={props.putFeedback}
            movement={movement}
            setMovement={setMovement}
            components={components}
            setComponents={setComponents}
          />

          <GameComponent
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
            animate
            visualize
            level={level}
            submit={submit}
            movement={movement}
            setMovement={setMovement}
            attempts={gameData.attempt}
            submitWWW={submitWWW}
            submitFeedback={submitFeedback}
            components={components}
            setComponents={setComponents}
          />
        </>
      )}
    </div>
  );
}

WhatIsTheDecision.propTypes = {
  getGameData: PropTypes.func.isRequired,
  evaluateResponse: PropTypes.func.isRequired,
  putFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectWhatIsTheDecision(),
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
)(WhatIsTheDecision);
