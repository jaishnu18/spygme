/**
 *
 * FindCrosswordNodes
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { start, end } from 'utils/timerFunctions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import GameComponent from 'components/GAMES/CSP/FindCrosswordNodesGame';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import moment from 'moment';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import notification from 'antd/lib/notification';
import makeSelectFindCrosswordNodes from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import PracticeGamesFeedback from '../../../../components/FEEDBACK/PracticeGamesFeedback';

export function FindCrosswordNodes(props) {
  useInjectReducer({ key: 'findCrosswordNodes', reducer });
  useInjectSaga({ key: 'findCrosswordNodes', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);

  const { level } = props;
  const { gameId } = props;
  const { conceptId } = props;
  const { topicId } = props;
  const { visitedGameData } = props;

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
        const args1 = {
          message: 'Why you made mistake?',
          description: practiceGamesFeedback,
          duration: 0,
          placement: 'topLeft',
          key: 'www',
        };
        notification.open(args1);
      }
    }
  }, [props.state]);

  useEffect(() => {
    props.getGameData(level);
    start(setStartTime);
  }, [level]);

  useEffect(() => {
    setValue({
      nodes: [{ node: null, row: null, col: null }],
    });
  }, [props.state.gameData]);

  const { gameData } = props.state;
  const { evaluatedAnswer } = props.state;

  const submit = values => {
    const secs = end(startTime);
    const response = {};

    gameData.response = values.nodes;
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
        <title>FindCrosswordNodes</title>
        <meta name="description" content="Description of FindCrosswordNodes" />
      </Helmet>

      {props.state.gameData && value && (
        <>
          <GameBar
            name="Find Crossword Nodes"
            level={level}
            attempts={props.state.gameData.attempt}
            maxLevel="3"
            evaluatedAnswer={evaluatedAnswer}
            conceptId={conceptId}
            topicId={topicId}
            saveFeedback={props.saveFeedback}
          />

          <Row style={{ width: '100%' }}>
            <Col>
              <GameDescription
                gameData={visitedGameData || gameData}
                evaluatedAnswer={evaluatedAnswer}
              />
            </Col>
          </Row>
          <GameComponent
            gameData={visitedGameData || gameData}
            evaluatedAnswer={evaluatedAnswer}
            animate
            visualize
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

FindCrosswordNodes.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectFindCrosswordNodes(),
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
)(FindCrosswordNodes);
