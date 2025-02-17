/**
 *
 * GradedMatchExpressionGame
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
import GameComponent from 'components/GAMES/PropositionalLogic/GradedMatchExpressionGame';
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
import makeSelectGradedMatchExpressionGame from './selectors';

export function GradedMatchExpressionGame(props) {
  useInjectReducer({ key: 'gradedMatchExpressionGame', reducer });
  useInjectSaga({ key: 'gradedMatchExpressionGame', saga });

  const [currentLevel, setCurrentLevel] = useState(-1);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [timeStamps, setTimeStamps] = useState(undefined);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      const initArray = new Array(props.state.gameData.length);
      for (let i = 0; i < props.state.gameData.length; i += 1) {
        if (props.state.gameData[i].exp_to_display) {
          initArray[i] = new Array(
            props.state.gameData[i].exp_to_display.length,
          ).fill(-1);
        }
      }
      setValue(initArray);

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

  const { evaluatedAnswer } = props.state;
  console.log(value);
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
        <title>GradedMatchExpressionGame</title>
        <meta
          name="description"
          content="Description of GradedMatchExpressionGame"
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
            heading="Match Expression"
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

GradedMatchExpressionGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedMatchExpressionGame(),
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
)(GradedMatchExpressionGame);
