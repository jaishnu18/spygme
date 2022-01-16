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
import makeSelectFindCrosswordNodes from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function FindCrosswordNodes(props) {
  useInjectReducer({ key: 'findCrosswordNodes', reducer });
  useInjectSaga({ key: 'findCrosswordNodes', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(undefined);
  const [evaluatedAnswer, setEvaluatedAnswer] = useState(0);

  const { level } = props;
  const { gameId } = props;

  useEffect(() => {
    props.getGameData(level);
    start(setStartTime);
  }, [level]);

  useEffect(() => {
    setValue({
      nodes: [{ node: null, row: null, col: null }],
    });
  }, [props.state.gameData]);

  const submit = values => {
    const secs = end(startTime);
    const { gameData } = props.state;
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
            totalLevels={props.state.gameData.maxLevels}
            evaluatedAnswer={evaluatedAnswer}
          />

          <Row style={{ width: '100%' }}>
            <Col>
              <GameDescription
                description={props.state.gameData.gameDescription}
              />
            </Col>
          </Row>
          <GameComponent
            gameData={props.state.gameData}
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
