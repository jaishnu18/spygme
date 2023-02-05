/**
 *
 * FindCrosswordNodes
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { start, end } from 'utils/timerFunctions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import GameComponent from 'components/GAMES/CSP/FindCrosswordNodesGame';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import moment from 'moment';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import notification from 'antd/lib/notification';
import Title from 'antd/lib/typography/Title';
import message from 'antd/lib/message';
import makeSelectFindCrosswordNodes from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';

export function FindCrosswordNodes(props) {
  useInjectReducer({ key: 'findCrosswordNodes', reducer });
  useInjectSaga({ key: 'findCrosswordNodes', saga });

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
  const { visitedGameData } = props;

  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback)
      message.success('Please give us your valuable feedback below!', 3);
  }, [props.state]);

  useEffect(() => {
    props.getGameData(level);
    start(setStartTime);
  }, [level]);

  useEffect(() => {
    setValue({
      nodes: [{ node: null, row: null, col: null }],
    });
    if (props.state.gameData && props.state.gameData.readingMaterialsNotRead) {
      message.warn(
        'It seems like you have not read the reading materials. Please have a look at them for better performance',
        3,
      );
    }
  }, [props.state.gameData]);

  const { gameData } = props.state;
  const { evaluatedAnswer } = props.state;

  const submitWWW = values => {
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    response.movement = JSON.stringify(movement);
    setMovement([]);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.feedback = JSON.stringify(values);
    response.movement = JSON.stringify(movement);
    setMovement([]);
    props.saveFeedback(response);
  };

  const submit = values => {
    const secs = end(startTime);
    const response = {};

    gameData.response = values.nodes;
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

  // console.log(props.state.gameData);

  return (
    <div>
      <Helmet>
        <title>FindCrosswordNodes</title>
        <meta name="description" content="Description of FindCrosswordNodes" />
      </Helmet>

      {props.state.gameData && value && (
        <>
          <GameBar
            name="Find Crossword Nodes"
            level={level}
            attempts={props.state.gameData.attempt}
            maxLevel="3"
            evaluatedAnswer={evaluatedAnswer}
            conceptId={conceptId}
            topicId={topicId}
            saveFeedback={props.saveFeedback}
            movement={movement}
            setMovement={setMovement}
            components={components}
            setComponents={setComponents}
          />
          <GameComponent
            gameData={visitedGameData || gameData}
            evaluatedAnswer={evaluatedAnswer}
            animate
            visualize
            level={level}
            submit={submit}
            setValue={setValue}
            value={value}
            movement={movement}
            setMovement={setMovement}
            attempts={props.state.gameData.attempt}
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

FindCrosswordNodes.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectFindCrosswordNodes(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: token => dispatch(getGamesDataStart(token)),
    checkStudentResponse: response => dispatch(evaluateResponseStart(response)),
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
)(FindCrosswordNodes);
