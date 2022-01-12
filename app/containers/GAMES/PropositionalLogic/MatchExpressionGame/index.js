/**
 *
 * MatchExpressionGame
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
import makeSelectMatchExpressionGame from './selectors';
import GameBar from 'components/GameBar';
import GameDescription from 'components/GameDescription';
import { start, end } from 'utils/timerFunctions';
import moment from 'moment';
import GameComponent from 'components/GAMES/PropositionalLogic/MatchExpressionGame';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function MatchExpressionGame(props) {
  useInjectReducer({ key: 'matchExpressionGame', reducer });
  useInjectSaga({ key: 'matchExpressionGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    props.getGameData(props.level);
    start(setStartTime);

  }, [props.level]);

  const { gameData } = props.matchExpressionGame;
  const { evaluatedAnswer } = props.matchExpressionGame;
  const { arr } = props.matchExpressionGame;

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
        <title>Match Expression Game</title>
        <meta name="description" content="Description of MatchExpressionGame" />
      </Helmet>
      {gameData && value && (
        <>
          <GameBar
            name="Match Expression"
            level={props.level}
            attempts={gameData.attempt}
            totalLevels={gameData.maxLevels}
            evaluatedAnswer={evaluatedAnswer}
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
            setValue={setValue}
            value={arr}
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
};

const mapStateToProps = createStructuredSelector({
  matchExpressionGame: makeSelectMatchExpressionGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: level => dispatch(getGamesDataStart(level)),
    checkStudentResponse: level => dispatch(evaluateResponseStart(level)),
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
)(MatchExpressionGame);
