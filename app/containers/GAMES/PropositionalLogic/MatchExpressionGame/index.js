/**
 *
 * MatchExpressionGame
 *
 */

import React, { memo, useEffect, useState, useSelector } from 'react';
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
import GameComponent from 'components/GAMES/PropositionalLogic/MatchExpressionGame';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';
import makeSelectMatchExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import notification from 'antd/lib/notification';

import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
  changeResponse,
} from './actions';

export function MatchExpressionGame(props) {
  useInjectReducer({ key: 'matchExpressionGame', reducer });
  useInjectSaga({ key: 'matchExpressionGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(arr);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);

  useEffect(() => {
    props.getGameData(props.level);
    start(setStartTime);
  }, [props.level]);

  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback) {
      setAlreadyFeedback(true);
      const practiceGamesFeedback = <PracticeGamesFeedback saveFeedback={props.saveFeedback} />
      const args = {
        message: 'Feedback',
        description:
          practiceGamesFeedback,
        duration: 0, key: 'feedback',
      };
      notification.open(args);
      if (evaluatedAnswer.score !== 1) {
        const practiceGamesFeedback = <PracticeGamesFeedback whatWentWrong saveFeedback={props.saveFeedback} />
        const args = {
          message: 'Why you made mistake?',
          description:
            practiceGamesFeedback,
          duration: 0,
          placement: 'topLeft', key: 'www'
        };
        notification.open(args);
      }
    }
  }, [props.matchExpressionGame]);

  const { gameData } = props.matchExpressionGame;
  const { arr } = props.matchExpressionGame;
  const { evaluatedAnswer } = props.matchExpressionGame;
  const { conceptId } = props;
  const { topicId } = props;

  const submitWWW = values => {
    console.log("DSF");
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
        <title>Match Expression Game</title>
        <meta name="description" content="Description of MatchExpressionGame" />
      </Helmet>
      {gameData && arr && (
        <>
          <GameBar
            name="Match Expression"
            level={props.level}
            attempts={gameData.attempt}
            totalLevels={gameData.maxLevels}
            evaluatedAnswer={evaluatedAnswer}
            maxLevel={4}
            conceptId={conceptId}
            topicId={topicId}
            saveFeedback={props.saveFeedback}
          />

          <Row style={{ width: '100%' }}>
            <Col>
              <GameDescription description={gameData.gameDescription} />
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

MatchExpressionGame.propTypes = {
  matchExpressionGame: PropTypes.object,
  getGameData: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
  checkStudentResponse: PropTypes.func.isRequired,
  changeResponseArray: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  matchExpressionGame: makeSelectMatchExpressionGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: level => dispatch(getGamesDataStart(level)),
    checkStudentResponse: level => dispatch(evaluateResponseStart(level)),
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
)(MatchExpressionGame);
