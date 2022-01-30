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
import makeSelectGradedMatchExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import NavigationBar from 'components/NavigationBar';
import GameComponent from 'components/GAMES/PropositionalLogic/GradedMatchExpressionGame';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import notification from 'antd/lib/notification';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function GradedMatchExpressionGame(props) {
  useInjectReducer({ key: 'gradedMatchExpressionGame', reducer });
  useInjectSaga({ key: 'gradedMatchExpressionGame', saga });

  const [currentLevel, setCurrentLevel] = useState(0);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);

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
  console.log(value);
  const submit = () => {
    const { gameData } = props.state;
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = value[i];
    }

    response.studentResponse = gameData;
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
      {props.state.gameData && value && (
        <>
          <NavigationBar
            gradedGame
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            maxLevel={4}
            submit={submit}
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
