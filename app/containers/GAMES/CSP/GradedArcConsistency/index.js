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
import message from 'antd/lib/message';

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

  useEffect(() => {
    if (props.state.evaluatedAnswer && !alreadyFeedback)
      message.success('Please give us your valuable feedback below!', 3);
  }, [props.state.evaluatedAnswer]);

  const submitWWW = values => {
    setAlreadyFeedback(true);
    message.success('Thanks for your feedback!', 2);
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    response.isGraded = true;
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    message.success('Thanks for your feedback!', 2);
    setAlreadyFeedback(true);
    const response = {};
    response.feedback = JSON.stringify(values);
    response.isGraded = true;
    props.saveFeedback(response);
  };
  
  return (
    <div>
      <Helmet>
        <title>GradedArcConsistency</title>
        <meta
          name="description"
          content="Description of GradedArcConsistency"
        />
      </Helmet>
      {currentLevel === -1 && (
        <ExamInstruction
          evaluatedAnswer={props.state.evaluatedAnswer}
          setCurrentLevel={setCurrentLevel}
        />
      )}
      {currentLevel !== -1 && props.state.gameData && value1 && value2 && (
        <>
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
            submitWWW={submitWWW}
            submitFeedback={submitFeedback}
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
