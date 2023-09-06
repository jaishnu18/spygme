/**
 *
 * GradedFindSubsetsOfFeature
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import message from 'antd/lib/message';
import ExamInstruction from 'components/ExamInstruction';
import GameComponent from 'components/GAMES/DecisionTreeLearning/GradedFindSubsetsOfFeatureComponent';
import makeSelectGradedFindSubsetsOfFeature from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getGameDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function GradedFindSubsetsOfFeature(props) {
  useInjectReducer({ key: 'gradedFindSubsetsOfFeature', reducer });
  useInjectSaga({ key: 'gradedFindSubsetsOfFeature', saga });

  const maxLevel = 3;

  const [currentLevel, setCurrentLevel] = useState(-1);
  const [movement, setMovement] = useState([]);
  const [value, setValue] = useState(Array(maxLevel).fill({}));
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [timeStamps, setTimeStamps] = useState(undefined);

  useEffect(() => {
    props.getGameData();
  }, []);

  const { gameData } = props.state;
  const { evaluatedAnswer } = props.state;

  useEffect(() => {
    if (gameData) {
      const T = [];
      for (let j = 0; j < gameData.length; j += 1) {
        const dateArray = [];
        if (j === 0) {
          dateArray.push(new Date());
        }

        T.push(dateArray);
      }

      setTimeStamps(T);

      // init colors
      const nextValue = value.map((v, i) => {
        return { ...v, 'colors': new Array(gameData[i].dataset.length).fill('default') }
      });
      setValue(nextValue)
    }
  }, [gameData]);

  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback)
      message.success('Please give us your valuable feedback below!', 3);
  }, [evaluatedAnswer]);

  const submitWWW = values => {
    setAlreadyFeedback(true);
    message.success('Thanks for your feedback!', 2);
    const response = {};
    response.whatwentwrong = JSON.stringify(values);
    response.isGraded = true;
    props.putFeedback(response);
    setMovement([]);
  };

  const submitFeedback = values => {
    message.success('Thanks for your feedback!', 2);
    setAlreadyFeedback(true);
    const response = {};
    response.feedback = JSON.stringify(values);
    response.isGraded = true;
    props.putFeedback(response);
    setMovement([]);
  };

  const submit = () => {
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = {
        dataset: gameData[i].dataset,
        labels: gameData[i].labels,
        feature: gameData[i].feature,
        answer: value[i].colors.filter((color) => (color === 'default')).length === value[i].colors.length ? undefined : value[i].colors,
      };
    }

    const T = timeStamps;
    T[currentLevel].push(new Date());
    setTimeStamps(T);

    response.studentResponse = gameData;
    response.timeStamps = timeStamps;
    response.gameId = props.gameId;

    props.evaluateResponse(response);
    setMovement([]);
  };

  return (
    <div>
      <Helmet>
        <title>GradedFindSubsetsOfFeature</title>
        <meta
          name="description"
          content="Description of GradedFindSubsetsOfFeature"
        />
      </Helmet>

      {currentLevel === -1 && (
        <ExamInstruction setCurrentLevel={setCurrentLevel} saveRequired />
      )}

      {currentLevel !== -1 && gameData && value && (
        <>
          <GameComponent
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            submit={submit}
            setMovement={setMovement}
            movement={movement}
            setValue={setValue}
            value={value}
            maxLevel={maxLevel}
            timeStamps={timeStamps}
            setTimeStamps={setTimeStamps}
            submitFeedback={submitFeedback}
            submitWWW={submitWWW}
          />
        </>
      )}
    </div>
  );
}

GradedFindSubsetsOfFeature.propTypes = {
  getGameData: PropTypes.func.isRequired,
  evaluateResponse: PropTypes.func.isRequired,
  putFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedFindSubsetsOfFeature(),
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
)(GradedFindSubsetsOfFeature);
