/**
 *
 * GradedDrawCrosswordGraph
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameComponent from 'components/GAMES/CSP/GradedDrawCrosswordGraph';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGradedDrawCrosswordGraph from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function GradedDrawCrosswordGraph(props) {
  useInjectReducer({ key: 'gradedDrawCrosswordGraph', reducer });
  useInjectSaga({ key: 'gradedDrawCrosswordGraph', saga });

  const [currentLevel, setCurrentLevel] = useState(0);
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      setValue(
        new Array(props.state.gameData.length).fill({
          nodes: [{ node: null, row: null, col: null }],
        }),
      );
    }
  }, [props.state.gameData]);

  const submit = values => {
    console.log(values);
    for (let i = 0; i < values.length; i += 1) {
      values[i].submit();
    }

    console.log(value);
    const { gameData } = props.state;
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = value[i];
    }

    response.studentResponse = gameData;
    response.gameId = props.gameId;

    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>GradedDrawCrosswordGraph</title>
        <meta
          name="description"
          content="Description of GradedDrawCrosswordGraph"
        />
      </Helmet>
      {props.state.gameData && value && (
        <>
          <GameComponent
            gameData={props.state.gameData}
            evaluatedAnswer={props.state.evaluatedAnswer}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            submit={submit}
            setValue={setValue}
            value={value}
            maxLevel="3"
          />
        </>
      )}
    </div>
  );
}

GradedDrawCrosswordGraph.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedDrawCrosswordGraph(),
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
)(GradedDrawCrosswordGraph);
