/* eslint-disable radix */
/* eslint-disable react/prop-types */
/**
 *
 * ExpressionEvaluationGame
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import { start, end } from 'utils/timerFunctions';
import moment from 'moment';
import GameComponent from 'components/GAMES/PropositionalLogic/ExpressionEvaluationGame';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';
import makeSelectExpressionEvaluationGame from './selectors';
import notification from 'antd/lib/notification';

import reducer from './reducer';
import saga from './saga';
import {
  getExpressionStart,
  evaluateExpressionStart,
  putFeedbackStart,
} from './actions';

export function ExpressionEvaluationGame(props) {
  useInjectReducer({ key: 'expressionEvaluationGame', reducer });
  useInjectSaga({ key: 'expressionEvaluationGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(-1);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);

  useEffect(() => {
    props.getGameData(props.level);
    start(setStartTime);
  }, [props.level]);

  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback) {
      setAlreadyFeedback(true);
      const practiceGamesFeedback = <PracticeGamesFeedback submitFeedback={submitFeedback} />
      const args = {
        message: 'Feedback',
        description:
          practiceGamesFeedback,
        duration: 0,
      };
      notification.open(args);
      if (evaluatedAnswer.score !== 1) {
        const practiceGamesFeedback = <PracticeGamesFeedback whatWentWrong submitWWW={submitWWW} />
        const args = {
          message: 'Why you made mistake?',
          description:
            practiceGamesFeedback,
          duration: 0,
          placement: 'topLeft',
        };
        notification.open(args);
      }
    }
  }, [props.expressionEvaluationGame]);

  const { gameData } = props.expressionEvaluationGame;
  const { evaluatedAnswer } = props.expressionEvaluationGame;
  const { conceptId } = props;
  const { topicId } = props;

  console.log(props);

  const submitWWW = values => {
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.feedback = JSON.stringify(values);
    props.saveFeedback(response);
  }

  const submit = () => {
    const secs = end(startTime);
    const response = {};
    gameData.response = value;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = parseInt(props.level);
    gameData.gameId = parseInt(props.gameId);
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>ExpressionEvaluationGame</title>
        <meta
          name="description"
          content="Description of ExpressionEvaluationGame"
        />
      </Helmet>

      {gameData && (
        <>
          <GameBar
            name="Expression Evaluation"
            level={props.level}
            attempts={gameData.attempt}
            maxLevel="4"
            evaluatedAnswer={evaluatedAnswer}
            conceptId={conceptId}
            topicId={topicId}
          />

          <Row style={{ width: '100%' }}>
            <Col>
              <GameDescription description={gameData.gameDescription} />
            </Col>
          </Row>
          <GameComponent
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
            animate
            visualize
            level={props.level}
            submit={submit}
            setValue={setValue}
          />
        </>
      )}
    </div>
  );
}

ExpressionEvaluationGame.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  expressionEvaluationGame: PropTypes.object,
  getGameData: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
  checkStudentResponse: PropTypes.func.isRequired,
  // saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  expressionEvaluationGame: makeSelectExpressionEvaluationGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: level => dispatch(getExpressionStart(level)),
    checkStudentResponse: level => dispatch(evaluateExpressionStart(level)),
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
)(ExpressionEvaluationGame);
