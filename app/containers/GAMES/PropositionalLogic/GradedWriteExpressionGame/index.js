/**
 *
 * GradedWriteExpressionGame
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
import makeSelectGradedWriteExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import NavigationBar from 'components/NavigationBar';
import GameComponent from 'components/GAMES/PropositionalLogic/GradedWriteExpressionGame';
import { getGamesDataStart, evaluateResponseStart } from './actions';

export function GradedWriteExpressionGame(props) {
  useInjectReducer({ key: 'gradedWriteExpressionGame', reducer });
  useInjectSaga({ key: 'gradedWriteExpressionGame', saga });

  const [currentLevel, setCurrentLevel] = useState(0);
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      setValue(
        new Array(props.state.gameData.length).fill('$$$')
      );
    }
  }, [props.state.gameData]);

  const submit = () => {
    const { gameData } = props.state;
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = value[i];
    }

    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>GradedWriteExpressionGame</title>
        <meta
          name="description"
          content="Description of GradedWriteExpressionGame"
        />
      </Helmet>
      {props.state.gameData && value && (
        <>
          <NavigationBar
            gradedGame
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            maxLevel="4"
            submit={submit}
          />
          <GameComponent
            gameData={props.state.gameData}
            evaluatedAnswer={props.state.evaluatedAnswer}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            submit={submit}
            setValue={setValue}
            value={value}
            maxLevel="4"
          />
        </>
      )}
    </div>
  );
}

GradedWriteExpressionGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedWriteExpressionGame(),
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
)(GradedWriteExpressionGame);
