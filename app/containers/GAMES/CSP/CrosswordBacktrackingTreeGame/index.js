/**
 *
 * CrosswordBacktrackingTreeGame
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
import makeSelectCrosswordBacktrackingTreeGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import { start, end } from 'utils/timerFunctions';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import GameComponent from 'components/GAMES/CSP/CrosswordBacktrackingTreeGame';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import notification from 'antd/lib/notification';

import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import moment from 'moment';

export function CrosswordBacktrackingTreeGame(props) {
  useInjectReducer({ key: 'crosswordBacktrackingTreeGame', reducer });
  useInjectSaga({ key: 'crosswordBacktrackingTreeGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(-1);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);

  const { level } = props;
  const { gameId } = props;
  const { conceptId } = props;
  const { topicId } = props;

  useEffect(() => {
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

  useEffect(() => {
    props.getGameData(level);
    start(setStartTime);
  }, [level]);

  console.log(props.state);
  useEffect(() => {
    if (props.state.gameData) {
      // const nodesLen = props.state.gameData.nodes.length;
      // const bagSize = props.state.gameData.bag_size;
      // const newArr = new Array(nodesLen);
      // for (let i = 0; i < nodesLen; i += 1)
      //   newArr[i] = new Array(bagSize).fill(true);
      // setValue(newArr);
    }
  }, [props.state.gameData]);

  const { gameData } = props.state;
  const { evaluatedAnswer } = props.state;

  const submit = values => {
    const secs = end(startTime);
    const response = {};

    gameData.response = value;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = level;
    gameData.gameId = gameId;
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>CrosswordBacktrackingTreeGame</title>
        <meta
          name="description"
          content="Description of CrosswordBacktrackingTreeGame"
        />
      </Helmet>
      {props.state.gameData && (
        <>
          <GameBar
            name="Crossword Backtracking Tree"
            level={level}
            attempts={props.state.gameData.attempt}
            maxLevel={3}
            evaluatedAnswer={evaluatedAnswer}
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
            level={level}
            submit={submit}
            setValue={setValue}
            value={value}
          />
        </>
      )}
    </div>
  );
}

CrosswordBacktrackingTreeGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectCrosswordBacktrackingTreeGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: token => dispatch(getGamesDataStart(token)),
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
)(CrosswordBacktrackingTreeGame);
