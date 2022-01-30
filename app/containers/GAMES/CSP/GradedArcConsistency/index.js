/**
 *
 * GradedArcConsistency
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import notification from 'antd/lib/notification';
import NavigationBar from 'components/NavigationBar';
import makeSelectGradedArcConsistency from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import GameComponent from 'components/GAMES/CSP/GradedArcConsistency';
import ExamInstruction from 'components/ExamInstruction';

export function GradedArcConsistency(props) {
  useInjectReducer({ key: 'gradedArcConsistency', reducer });
  useInjectSaga({ key: 'gradedArcConsistency', saga });

  const [currentLevel, setCurrentLevel] = useState(-1);
  const [value1, setValue1] = useState(undefined);
  const [value2, setValue2] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [timeStamps, setTimeStamps] = useState(undefined);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      let nodesLen = props.state.gameData[0].nodes.length;
      let bagSize = props.state.gameData[0].bag_size;
      let newArr = new Array(nodesLen);
      for (let i = 0; i < nodesLen; i += 1)
        newArr[i] = new Array(bagSize).fill(true);
      setValue1(newArr);

      nodesLen = props.state.gameData[1].nodes.length;
      bagSize = props.state.gameData[1].bag_size;
      newArr = new Array(nodesLen);
      for (let i = 0; i < nodesLen; i += 1)
        newArr[i] = new Array(bagSize).fill(true);
      setValue2(newArr);

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
        <GradedGamesFeedback submitFeedback={submitFeedback} />
      );
      const args = {
        message: 'Feedback',
        description: practiceGamesFeedback,
        duration: 0,
      };
      notification.open(args);
      if (evaluatedAnswer.score !== 1) {
        const practiceGamesFeedback = (
          <GradedGamesFeedback whatWentWrong submitWWW={submitWWW} />
        );
        const args = {
          message: 'Why you made mistake?',
          description: practiceGamesFeedback,
          duration: 0,
          placement: 'topLeft',
        };
        notification.open(args);
      }
    }
  }, [props.state]);

  const submitWWW = values => {
    const response = {};
    response.isGraded = true;
    response.whatwentwrong = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.isGraded = true;
    response.feedback = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const { evaluatedAnswer } = props.state;

  const submit = () => {
    const { gameData } = props.state;
    const response = {};
    gameData[0].response = value1;
    gameData[1].response = value2;

    const T = timeStamps;
    T[currentLevel].push(new Date());
    setTimeStamps(T);

    response.studentResponse = gameData;
    response.timeStamps = timeStamps;
    props.checkStudentResponse(response);
  };

  console.log(props.state.evaluatedAnswer);
  return (
    <div>
      <Helmet>
        <title>GradedArcConsistency</title>
        <meta
          name="description"
          content="Description of GradedArcConsistency"
        />
      </Helmet>
      {
        currentLevel === -1 &&
        <ExamInstruction setCurrentLevel={setCurrentLevel} />
      }
      {currentLevel !== -1 && props.state.gameData && value1 && value2 && (
        <>
          <NavigationBar
            gradedGame
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            maxLevel={3}
            submit={submit}
            timeStamps={timeStamps}
            setTimeStamps={setTimeStamps}
          />
          <GameComponent
            gameData={props.state.gameData}
            evaluatedAnswer={props.state.evaluatedAnswer}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            submit={submit}
            setValue1={setValue1}
            value1={value1}
            setValue2={setValue2}
            value2={value2}
            maxLevel={2}
            timeStamps={timeStamps}
            setTimeStamps={setTimeStamps}
          />
        </>
      )}
    </div>
  );
}

GradedArcConsistency.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedArcConsistency(),
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
)(GradedArcConsistency);
