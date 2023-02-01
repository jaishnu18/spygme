/**
 *
 * GradedWriteExpressionGame
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
import NavigationBar from 'components/NavigationBar';
import GameComponent from 'components/GAMES/PropositionalLogic/GradedWriteExpressionGame';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import notification from 'antd/lib/notification';
import ExamInstruction from 'components/ExamInstruction';
import message from 'antd/lib/message';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import makeSelectGradedWriteExpressionGame from './selectors';

export function GradedWriteExpressionGame(props) {
  useInjectReducer({ key: 'gradedWriteExpressionGame', reducer });
  useInjectSaga({ key: 'gradedWriteExpressionGame', saga });

  const [currentLevel, setCurrentLevel] = useState(-1);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [timeStamps, setTimeStamps] = useState(undefined);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      setValue(new Array(props.state.gameData.length).fill('$$$'));
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

  const submit = () => {
    const { gameData } = props.state;
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = value[i];
    }

    const T = timeStamps;
    T[currentLevel].push(new Date());
    setTimeStamps(T);

    response.studentResponse = gameData;
    response.timeStamps = timeStamps;
    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>GradedWriteExpressionGame</title>
        <meta
          name="description"
          content="Description of GradedWriteExpressionGame"
        />
      </Helmet>
      {currentLevel === -1 && (
        <ExamInstruction
          evaluatedAnswer={props.state.evaluatedAnswer}
          setCurrentLevel={setCurrentLevel}
        />
      )}
      {currentLevel !== -1 && props.state.gameData && value && (
        <>
          <NavigationBar
            gradedGame
            heading="Write Expression"
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            maxLevel={4}
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
            setValue={setValue}
            value={value}
            maxLevel={4}
            timeStamps={timeStamps}
            setTimeStamps={setTimeStamps}
            submitFeedback={submitFeedback}
            submitWWW={submitWWW}
          />
        </>
      )}
    </div>
  );
}

GradedWriteExpressionGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedWriteExpressionGame(),
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
)(GradedWriteExpressionGame);
