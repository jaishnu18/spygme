/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/**
 *
 * DrawCrosswordGraphGame
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { start, end } from 'utils/timerFunctions';
import GameComponent from 'components/GAMES/CSP/DrawCrosswordGraph';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Col from 'antd/lib/col';
import notification from 'antd/lib/notification';
import moment from 'moment';
import Row from 'antd/lib/row';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import saga from './saga';
import reducer from './reducer';
import makeSelectDrawCrosswordGraphGame from './selectors';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';

import Title from 'antd/lib/typography/Title';
import message from 'antd/lib/message';

export function DrawCrosswordGraphGame(props) {
  useInjectReducer({ key: 'drawCrosswordGraphGame', reducer });
  useInjectSaga({ key: 'drawCrosswordGraphGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [AcrossNodes, setAcrossNodes] = useState([]);
  const [DownNodes, setDownNodes] = useState([]);
  const [movement, setMovement] = useState([]);
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [components, setComponents] = useState([]);

  const { level } = props;
  const { gameId } = props;
  const { conceptId } = props;
  const { topicId } = props;

  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback)
      message.success('Please give us your valuable feedback below!', 3);
  }, [props.state]);

  useEffect(() => {
    props.getGameData(level);
    start(setStartTime);
  }, [level]);

  useEffect(() => {
    if (props.state.gameData) {
      const { gameData } = props.state;

      const elements = [];
      const ac = [];
      const dn = [];
      gameData.ptr = -1;
      for (let i = 0; i < gameData.nodes.length; i += 1) {
        if (gameData.nodes[i][2] === 65) {
          // across
          ac.push(`${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-A`);
          const obj = {
            data: {
              id: `${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-${
                gameData.nodes[i][2] === 65 ? 'A' : 'D'
              }`,
              label: `${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-${
                gameData.nodes[i][2] === 65 ? 'A' : 'D'
              }`,
            },
            position: {
              x: 100 * (i + 1),
              y: 100,
            },
          };
          elements.push(obj);
        } else {
          // down
          dn.push(`${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-D`);
          if (gameData.ptr === -1) {
            gameData.ptr = i;
          }
          const obj = {
            data: {
              id: `${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-${
                gameData.nodes[i][2] === 65 ? 'A' : 'D'
              }`,
              label: `${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-${
                gameData.nodes[i][2] === 65 ? 'A' : 'D'
              }`,
            },
            position: {
              x: 100 * (i - gameData.ptr + 1),
              y: 400,
            },
          };
          elements.push(obj);
        }
      }

      setAcrossNodes(ac);
      setDownNodes(dn);

      setValue({
        nodes: [{ across: null, down: null }],
      });

      if (props.state.gameData.readingMaterialsNotRead) {
        message.warn(
          'It seems like you have not read the reading materials. Please have a look at them for better performance',
          3,
        );
      }
    }
  }, [props.state.gameData]);

  const { gameData } = props.state;
  const { evaluatedAnswer } = props.state;

  const submit = values => {
    const secs = end(startTime);
    const response = {};

    const res = [];
    for (const item in values.nodes) {
      const arr1 = values.nodes[item].across.split('-');
      const arr2 = values.nodes[item].down.split('-');
      const newArr = [];
      for (let i = 0; i < arr1.length; i += 1) {
        if (i === 2) {
          if (arr1[i] === 'A') {
            newArr.push(65);
          } else {
            newArr.push(68);
          }
        } else {
          newArr.push(parseInt(arr1[i]));
        }
      }
      for (let i = 0; i < arr2.length; i += 1) {
        if (i === 2) {
          if (arr2[i] === 'A') {
            newArr.push(65);
          } else {
            newArr.push(68);
          }
        } else {
          newArr.push(parseInt(arr2[i]));
        }
      }

      console.log(newArr);
      res.push(newArr);
    }

    gameData.response = res;
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
    console.log('DSF');
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.feedback = JSON.stringify(values);
    props.saveFeedback(response);
  };

  console.log(props.state.gameData);

  return (
    <div>
      <Helmet>
        <title>DrawCrosswordGraphGame</title>
        <meta
          name="description"
          content="Description of DrawCrosswordGraphGame"
        />
      </Helmet>
      {props.state.gameData && value && (
        <>
          <GameBar
            name="Draw Crossword Graph"
            level={level}
            attempts={props.state.gameData.attempt}
            maxLevel={3}
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
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
            animate
            visualize
            level={level}
            submit={submit}
            setValue={setValue}
            value={value}
            AcrossNodes={AcrossNodes}
            DownNodes={DownNodes}
            submitWWW={submitWWW}
            submitFeedback={submitFeedback}
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

DrawCrosswordGraphGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectDrawCrosswordGraphGame(),
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
)(DrawCrosswordGraphGame);
