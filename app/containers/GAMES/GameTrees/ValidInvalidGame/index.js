/**
 *
 * ValidInvalidGame
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

import moment from 'moment';
import message from 'antd/lib/message';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ValidInvalid from '../../../../components/GAMES/GameTrees/ValidInvalidGame';
import makeSelectValidInvalidGame from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getGameDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function ValidInvalidGame(props) {
  useInjectReducer({ key: 'validInvalidGame', reducer });
  useInjectSaga({ key: 'validInvalidGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [movement, setMovement] = useState([]);
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  // const { level } = props;
  // const { gameId } = props;
  // const { conceptId } = props;
  // const { topicId } = props;
  // const { visitedGameData } = props;

  // useEffect(() => {
  //   if (evaluatedAnswer && !alreadyFeedback)
  //     message.success('Please give us your valuable feedback below!', 3);
  // }, [props.state]);

  useEffect(() => {
    props.getGameData(1);
    start(setStartTime);
  }, []);

  console.log('containers', props.state);

  // useEffect(() => {
  //   setValue({
  //     nodes: [{ node: null, row: null, col: null }],
  //   });
  //   if (props.state.gameData && props.state.gameData.readingMaterialsNotRead) {
  //     message.warn(
  //       'It seems like you have not read the reading materials. Please have a look at them for better performance',
  //       3,
  //     );
  //   }
  // }, [props.state.gameData]);

  const { gameData } = props.state;
  // const { evaluatedAnswer } = props.state;

  // const submitWWW = values => {
  //   const response = {};
  //   response.whatwentwrong = JSON.stringify(values);
  //   response.movement = JSON.stringify(movement);
  //   setMovement([]);
  //   props.saveFeedback(response);
  // };

  // const submitFeedback = values => {
  //   const response = {};
  //   response.feedback = JSON.stringify(values);
  //   response.movement = JSON.stringify(movement);
  //   setMovement([]);
  //   props.saveFeedback(response);
  // };

  // const submit = values => {
  //   const secs = end(startTime);
  //   const response = {};

  //   gameData.response = values.nodes;
  //   const formatted = moment.utc(secs * 1000).format('mm:ss');
  //   gameData.timeTaken = formatted;
  //   gameData.level = level;
  //   gameData.gameId = gameId;
  //   response.studentResponse = gameData;
  //   response.movement = movement;
  //   response.initial_mouse_position = globalCoords;
  //   setMovement([]);
  //   props.checkStudentResponse(response);
  // };

  return (
    <div>
      <Helmet>
        <title>ValidInvalidGame</title>
        <meta name="description" content="Description of ValidInvalidGame" />
      </Helmet>

      {1 && 1 && (
        <>
          <GameBar
            name="Find Valid Invalid"
            // level={1}
            // attempts={props.state.gameData.attempt}
            // maxLevel="3"
            // evaluatedAnswer={evaluatedAnswer}
            // conceptId={conceptId}
            // topicId={topicId}
            // saveFeedback={props.saveFeedback}
            // movement={movement}
            // setMovement={setMovement}
          />
          <ValidInvalid gameData={gameData} />
        </>
      )}
    </div>
  );
}

ValidInvalidGame.propTypes = {
  getGameData: PropTypes.func.isRequired,
  evaluateResponse: PropTypes.func.isRequired,
  putFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectValidInvalidGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: payload => dispatch(getGameDataStart(payload)),
    evaluateResponse: payload => dispatch(evaluateResponseStart(payload)),
    putFeedback: payload => dispatch(putFeedbackStart(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ValidInvalidGame);
