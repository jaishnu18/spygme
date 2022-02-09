/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/**
 *
 * GradedDrawCrosswordGraph
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameComponent from 'components/GAMES/CSP/GradedDrawCrosswordGraph';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGradedDrawCrosswordGraph from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import ExamInstruction from 'components/ExamInstruction';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import notification from 'antd/lib/notification';

export function GradedDrawCrosswordGraph(props) {
  useInjectReducer({ key: 'gradedDrawCrosswordGraph', reducer });
  useInjectSaga({ key: 'gradedDrawCrosswordGraph', saga });

  const [currentLevel, setCurrentLevel] = useState(-1);
  const [value, setValue] = useState(undefined);
  const [AcrossNodes, setAcrossNodes] = useState([]);
  const [DownNodes, setDownNodes] = useState([]);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [timeStamps, setTimeStamps] = useState(undefined);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      const { gameData } = props.state;

      const A = [];
      const D = [];
      for (let k = 0; k < gameData.length; k += 1) {
        const ac = [];
        const dn = [];
        gameData[k].ptr = -1;
        for (let i = 0; i < gameData[k].nodes.length; i += 1) {
          if (gameData[k].nodes[i][2] === 65) {
            // across
            ac.push(`${gameData[k].nodes[i][0]}-${gameData[k].nodes[i][1]}-A`);
          } else {
            // down
            dn.push(`${gameData[k].nodes[i][0]}-${gameData[k].nodes[i][1]}-D`);
            if (gameData[k].ptr === -1) {
              gameData[k].ptr = i;
            }
          }
        }

        A.push(ac);
        D.push(dn);
      }
      setAcrossNodes(A);
      setDownNodes(D);

      setValue(
        new Array(props.state.gameData.length).fill({
          nodes: [{ across: null, down: null }],
        }),
      );

      const T = [];
      for (let j = 0; j < props.state.gameData.length; j += 1) {
        const dateArray = [];
        if (j === 0) {
          dateArray.push(new Date());
        }

        T.push(dateArray);
      }

      setTimeStamps(T);
    }
  }, [props.state.gameData]);

  useEffect(() => {}, [props.state.gameData]);
  
  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback) {
      setAlreadyFeedback(true);
      const practiceGamesFeedback = (
        <GradedGamesFeedback saveFeedback={props.saveFeedback} />
      );
      const args = {
        message: 'Feedback',
        description: practiceGamesFeedback,
        duration: 0, key:'feedback',
      };
      notification.open(args);
      if (evaluatedAnswer.score !== 1) {
        const practiceGamesFeedback = (
          <GradedGamesFeedback whatWentWrong saveFeedback={props.saveFeedback} />
        );
        const args = {
          message: 'Why you made mistake?',
          description: practiceGamesFeedback,
          duration: 0,
          placement: 'topLeft', key:'www'
        };
        notification.open(args);
      }
    }
  }, [props.state]);
  
  const { evaluatedAnswer } = props.state;

  const submit = () => {
    const res = [];
    for (let k = 0; k < props.state.gameData.length; k += 1) {
      console.log(value[k].nodes);
      const currLevArr = [];
      for (const item in value[k].nodes) {
        if (value[k].nodes[item].across && value[k].nodes[item].down) {
          const arr1 = value[k].nodes[item].across.split('-');
          const arr2 = value[k].nodes[item].down.split('-');
          const newArr = [];
          if (arr1[0] && arr1[1] && arr1[2]) {
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
          }
          if (arr2[0] && arr2[1] && arr2[2]) {
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
          }
          currLevArr.push(newArr);
        }
      }
      res.push(currLevArr);
    }

    const { gameData } = props.state;
    console.log(props);
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = res[i];
    }

    const T = timeStamps;
    T[currentLevel].push(new Date());
    setTimeStamps(T);

    response.studentResponse = gameData;
    response.timeStamps = timeStamps;
    response.gameId = props.gameId;

    console.log(response);

    props.checkStudentResponse(response);
  };

  console.log(props.state.evaluatedAnswer);

  return (
    <div>
      <Helmet>
        <title>GradedDrawCrosswordGraph</title>
        <meta
          name="description"
          content="Description of GradedDrawCrosswordGraph"
        />
      </Helmet>
      {
        currentLevel === -1 &&
        <ExamInstruction setCurrentLevel={setCurrentLevel} saveRequired/>
      }
      {currentLevel !== -1 && props.state.gameData && value && (
        <>
          <GameComponent
            gameData={props.state.gameData}
            evaluatedAnswer={props.state.evaluatedAnswer}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            submit={submit}
            setValue={setValue}
            value={value}
            maxLevel={3}
            AcrossNodes={AcrossNodes}
            DownNodes={DownNodes}
            timeStamps={timeStamps}
            setTimeStamps={setTimeStamps}
          />
        </>
      )}
    </div>
  );
}

GradedDrawCrosswordGraph.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedDrawCrosswordGraph(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: () => dispatch(getGamesDataStart()),
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
)(GradedDrawCrosswordGraph);
