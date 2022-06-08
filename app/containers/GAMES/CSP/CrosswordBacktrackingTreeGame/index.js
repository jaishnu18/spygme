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
import { start, end } from 'utils/timerFunctions';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import GameComponent from 'components/GAMES/CSP/CrosswordBacktrackingTreeGame';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import notification from 'antd/lib/notification';

import moment from 'moment';
import Title from 'antd/lib/typography/Title';
import message from 'antd/lib/message';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';
import saga from './saga';
import reducer from './reducer';
import makeSelectCrosswordBacktrackingTreeGame from './selectors';

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
    if (evaluatedAnswer && !alreadyFeedback)
      message.success('Please give us your valuable feedback below!', 3);
  }, [props.state]);

  useEffect(() => {
    props.getGameData(level);
    start(setStartTime);
  }, [level]);

  useEffect(() => {
    if (props.state.gameData) {
      setValue(new Array(props.state.gameData.gridStateList.length).fill(-1));
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

  const submitWWW = values => {
    console.log('DSF');
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.feedback = JSON.stringify(values);
    props.saveFeedback(response);
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
              <GameDescription
                gameData={gameData}
                evaluatedAnswer={evaluatedAnswer}
              />
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
          {evaluatedAnswer && (
            <>
              <Title
                level={3}
                style={{
                  textAlign: 'center',
                  marginTop: '40px',
                  marginBottom: 0,
                }}
              >
                FEEDBACK
              </Title>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '40px',
                }}
              >
                <PracticeGamesFeedback
                  whatWentWrong={evaluatedAnswer.score < 1}
                  saveFeedback={submitFeedback}
                  saveWWW={submitWWW}
                  style={{ marginLeft: 'auto' }}
                />
              </div>
            </>
          )}
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
