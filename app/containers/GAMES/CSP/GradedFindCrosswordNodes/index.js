/**
 *
 * GradedFindCrosswordNodes
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameComponent from 'components/GAMES/CSP/GradedFindCrosswordNodes';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import NavigationBar from 'components/NavigationBar';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import notification from 'antd/lib/notification';
import makeSelectGradedFindCrosswordNodes from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import ExamInstruction from 'components/ExamInstruction';

export function GradedFindCrosswordNodes(props) {
  useInjectReducer({ key: 'gradedFindCrosswordNodes', reducer });
  useInjectSaga({ key: 'gradedFindCrosswordNodes', saga });

  const [currentLevel, setCurrentLevel] = useState(-1);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [timeStamps, setTimeStamps] = useState(undefined);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      setValue(
        new Array(props.state.gameData.length).fill({
          nodes: [{ node: null, row: null, col: null }],
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

  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback) {
      setAlreadyFeedback(true);
      const practiceGamesFeedback = (
        <GradedGamesFeedback saveFeedback={props.saveFeedback} />
      );
      const args = {
        message: 'Feedback',
        description: practiceGamesFeedback,
        duration: 0,
        key: 'feedback',
      };
      notification.open(args);
      if (evaluatedAnswer.score !== 1) {
        const practiceGamesFeedback = (
          <GradedGamesFeedback
            whatWentWrong
            saveFeedback={props.saveFeedback}
          />
        );
        const args = {
          message: 'Why you made mistake?',
          description: practiceGamesFeedback,
          duration: 0,
          placement: 'topLeft',
          key: 'www',
        };
        notification.open(args);
      }
    }
  }, [props.state]);

  const { evaluatedAnswer } = props.state;

  const submit = () => {
    const { gameData } = props.state;
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      const nodes = [];
      for (let j = 0; j < value[i].nodes.length; j += 1) {
        const T = value[i].nodes[j];
        if (T.node && T.row && T.col) {
          nodes.push(T);
        }
      }
      gameData[i].response = nodes;
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

  console.log('evaluatedAnswer');
  console.log(evaluatedAnswer);

  return (
    <div>
      <Helmet>
        <title>GradedFindCrosswordNodes</title>
        <meta
          name="description"
          content="Description of GradedFindCrosswordNodes"
        />
      </Helmet>
      {currentLevel === -1 && (
        <ExamInstruction setCurrentLevel={setCurrentLevel} saveRequired />
      )}
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
            timeStamps={timeStamps}
            setTimeStamps={setTimeStamps}
          />
        </>
      )}
    </div>
  );
}

GradedFindCrosswordNodes.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedFindCrosswordNodes(),
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
)(GradedFindCrosswordNodes);
