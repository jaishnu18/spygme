/**
 *
 * EvaluateAllNodesGame
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { start, end } from 'utils/timerFunctions';
import moment from 'moment';
import GameBar from 'components/GameBar';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';
import GameComponent from 'components/GAMES/PropositionalLogic/EvaluateAllNodesGame';
import GameDescription from 'components/GameDescription';
import notification from 'antd/lib/notification';


import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEvaluateAllNodesGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getExpressionStart,
  evaluateExpressionStart,
  putFeedbackStart,
  changeResponse
} from './actions';

export function EvaluateAllNodesGame(props) {
  useInjectReducer({ key: 'evaluateAllNodesGame', reducer });
  useInjectSaga({ key: 'evaluateAllNodesGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(arr);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);

  useEffect(() => {
    props.getGameData(props.level);
    start(setStartTime);
  }, [props.level]);

  useEffect(() => {
    setValue(new Array(props.state.num_nodes).fill(-1));
    if (evaluatedAnswer && !alreadyFeedback) {
      setAlreadyFeedback(true);
      const practiceGamesFeedback = (
        <PracticeGamesFeedback saveFeedback={props.saveFeedback} />
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
          <PracticeGamesFeedback
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

  const { gameData } = props.state;
  const { evaluatedAnswer } = props.state;
  const { conceptId } = props;
  const { topicId } = props;
  const { arr } = props.state;

  const submitWWW = values => {
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.feedback = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submit = () => {
    const secs = end(startTime);
    const response = {};
    gameData.response = arr;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = parseInt(props.level);
    gameData.gameId = parseInt(props.gameId);
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  const changeResponseFunction = array => {
    props.changeResponseArray(array);
  };

  return (
    <div>
      <Helmet>
        <title>EvaluateAllNodesGame</title>
        <meta
          name="description"
          content="Description of EvaluateAllNodesGame"
        />
      </Helmet>
      {gameData && arr && (
        <>
          <GameBar
            name="Evaluate All Nodes"
            level={props.level}
            attempts={gameData.attempt}
            maxLevel={4}
            evaluatedAnswer={evaluatedAnswer}
            conceptId={conceptId}
            topicId={topicId}
            saveFeedback={props.saveFeedback}
          />

          <Row style={{ width: '100%' }}>
            <Col>
              <GameDescription gameData={gameData} evaluatedAnswer={evaluatedAnswer} />
            </Col>
          </Row>
          <GameComponent
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
            level={props.level}
            submit={submit}
            value={arr}
            changeResponse={changeResponseFunction}
          />
        </>
      )}
    </div>
  );
}

EvaluateAllNodesGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
  changeResponseArray: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectEvaluateAllNodesGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: token => dispatch(getExpressionStart(token)),
    checkStudentResponse: response => dispatch(evaluateExpressionStart(response)),
    saveFeedback: feedback => dispatch(putFeedbackStart(feedback)),
    changeResponseArray: response => dispatch(changeResponse(response)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EvaluateAllNodesGame);
