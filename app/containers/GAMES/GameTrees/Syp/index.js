/**
 *
 * Syp
 *
 */

import React, { memo, useEffect, useState, props } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { start, end } from 'utils/timerFunctions';
import message from 'antd/lib/message';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import moment from 'moment';
import GameBar from '../../../../components/GAMES/GameTrees/components/GameBar';
import makeSelectSyp from './selectors';
import SypGame from '../../../../components/GAMES/GameTrees/Syp';
import reducer from './reducer';
import saga from './saga';

import {
  getGameDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function Syp(props) {
  useInjectReducer({ key: 'syp', reducer });
  useInjectSaga({ key: 'syp', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [movement, setMovement] = useState([]);
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [components, setComponents] = useState([]);

  const { level } = props;
  const { gameId } = props;
  const { conceptId } = props;
  const { topicId } = props;
  console.log('hhh', props);
  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback)
      message.success('Please give us your valuable feedback below!', 3);
  }, [props.state]);

  useEffect(() => {
    console.log('insideuseeffect');
    props.getGameData(level);
    start(setStartTime);
  }, [level]);

  useEffect(() => {
    if (props.state.gameData) {
      setValue([]);
    }

    if (props.state.gameData && props.state.gameData.readingMaterialsNotRead) {
      message.warn(
        'It seems like you have not read the reading materials. Please have a look at them for better performance',
        3,
      );
    }
  }, [props.state.gameData]);

  const { gameData } = props.state;
  console.log('123', gameData);
  const { evaluatedAnswer } = props.state;

  const submit = values => {
    const secs = end(startTime);
    const response = {};

    gameData.response = value;
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
    props.checkStudentResponse(response);
  };

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

  return (
    <div>
      <Helmet>
        <title>Syp</title>
        <meta name="description" content="Description of Syp" />
      </Helmet>
      <GameBar
        name="SYP"
        level={level}
        // attempts={props.state.gameData.attempt}
        maxLevel={2}
        evaluatedAnswer={evaluatedAnswer}
        conceptId={conceptId}
        topicId={topicId}
        saveFeedback={props.saveFeedback}
        movement={0}
        setMovement={setMovement}
        components={components}
        setComponents={setComponents}
      />
      <SypGame
        gameData={gameData}
        evaluatedAnswer={evaluatedAnswer}
        level={level}
        submit={submit}
        setValue={setValue}
        value={value}
        submitWWW={submitWWW}
        submitFeedback={submitFeedback}
        movement={movement}
        setMovement={setMovement}
        components={components}
        setComponents={setComponents}
      />
      <div />
    </div>
  );
}

Syp.propTypes = {
  getGameData: PropTypes.func.isRequired,
  checkStudentResponse: PropTypes.func.isRequired,
  putFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectSyp(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: payload => dispatch(getGameDataStart(payload)),
    checkStudentResponse: payload => dispatch(evaluateResponseStart(payload)),
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
)(Syp);
