/**
 *
 * GradedFindCrosswordNodes
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameComponent from 'components/GAMES/CSP/GradedFindCrosswordNodes';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import NavigationBar from 'components/NavigationBar';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import notification from 'antd/lib/notification';
import makeSelectGradedFindCrosswordNodes from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function GradedFindCrosswordNodes(props) {
  useInjectReducer({ key: 'gradedFindCrosswordNodes', reducer });
  useInjectSaga({ key: 'gradedFindCrosswordNodes', saga });

  const [currentLevel, setCurrentLevel] = useState(0);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);

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

  useEffect(() => {
    if (evaluatedAnswer && !alreadyFeedback) {
      setAlreadyFeedback(true);
      const practiceGamesFeedback = (
        <GradedGamesFeedback submitFeedback={submitFeedback} />
      );
      const args = {
        message: 'Feedback',
        description: practiceGamesFeedback,
        duration: 0,
      };
      notification.open(args);
      if (evaluatedAnswer.score !== 1) {
        const practiceGamesFeedback = (
          <GradedGamesFeedback whatWentWrong submitWWW={submitWWW} />
        );
        const args = {
          message: 'Why you made mistake?',
          description: practiceGamesFeedback,
          duration: 0,
          placement: 'topLeft',
        };
        notification.open(args);
      }
    }
  }, [props.state]);

  const submitWWW = values => {
    const response = {};
    response.isGraded = true;
    response.whatwentwrong = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const submitFeedback = values => {
    const response = {};
    response.isGraded = true;
    response.feedback = JSON.stringify(values);
    props.saveFeedback(response);
  };

  const { evaluatedAnswer } = props.state;

  const submit = () => {

    console.log(value);
    const { gameData } = props.state;
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      const curValue = [];
      for (let j = 0; j < value[i].nodes.length; j++) {
        if (value[i].nodes[j].col !== null && value[i].nodes[j].row !== null && value[i].nodes[j].node !== null)
          curValue.push(value[i].nodes);
      }
      gameData[i].response = curValue;
    }

    response.studentResponse = gameData;
    response.gameId = props.gameId;

    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>GradedFindCrosswordNodes</title>
        <meta
          name="description"
          content="Description of GradedFindCrosswordNodes"
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

GradedFindCrosswordNodes.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedFindCrosswordNodes(),
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
)(GradedFindCrosswordNodes);
