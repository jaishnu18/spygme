/**
 *
 * GradedEvaluateAllNodesGame
 *
 */

import React, { memo,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGradedEvaluateAllNodesGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import NavigationBar from 'components/NavigationBar';
import GameComponent from 'components/GAMES/PropositionalLogic/GradedEvaluateAllNodesGame';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import notification from 'antd/lib/notification';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
import ExamInstruction from 'components/ExamInstruction';

export function GradedEvaluateAllNodesGame(props) {
  useInjectReducer({ key: 'gradedEvaluateAllNodesGame', reducer });
  useInjectSaga({ key: 'gradedEvaluateAllNodesGame', saga });
  console.log(props);

  const [currentLevel, setCurrentLevel] = useState(-1);
  const [value, setValue] = useState(undefined);
  const [alreadyFeedback, setAlreadyFeedback] = useState(false);
  const [timeStamps, setTimeStamps] = useState(undefined);

  // useEffect(() => {
  //   props.getGameData();
  // }, []);

  // useEffect(() => {
  //   if (props.state.gameData) {
  //     setValue(new Array(props.state.gameData.length).fill(-1));
  //     const T = [];
  //     for (let j = 0; j < props.state.gameData.length; j += 1) {
  //       const dateArray = [];
  //       if (j === 0) {
  //         dateArray.push(new Date());
  //       }

  //       T.push(dateArray);
  //     }

  //     setTimeStamps(T);
  //   }
  // }, [props.state.gameData]);

  // useEffect(() => {
  //   if (evaluatedAnswer && !alreadyFeedback) {
  //     setAlreadyFeedback(true);
  //     const practiceGamesFeedback = (
  //       <GradedGamesFeedback saveFeedback={props.saveFeedback} />
  //     );
  //     const args = {
  //       message: 'Feedback',
  //       description: practiceGamesFeedback,
  //       duration: 0, key: 'feedback',
  //     };
  //     notification.open(args);
  //     if (evaluatedAnswer.score !== 1) {
  //       const practiceGamesFeedback = (
  //         <GradedGamesFeedback whatWentWrong saveFeedback={props.saveFeedback} />
  //       );
  //       const args = {
  //         message: 'Why you made mistake?',
  //         description: practiceGamesFeedback,
  //         duration: 0,
  //         placement: 'topLeft', key: 'www'
  //       };
  //       notification.open(args);
  //     }
  //   }
  // }, [props.state]);



  // const { evaluatedAnswer } = props.state;

  // const submit = () => {
  //   const { gameData } = props.state;
  //   const response = {};

  //   for (let i = 0; i < gameData.length; i += 1) {
  //     gameData[i].response = value[i];
  //   }

  //   const T = timeStamps;
  //   T[currentLevel].push(new Date());
  //   setTimeStamps(T);

  //   response.studentResponse = gameData;
  //   response.timeStamps = timeStamps;

  //   props.checkStudentResponse(response);
  // };

  return (
    <div>
      <Helmet>
        <title>GradedEvaluateAllNodesGame</title>
        <meta
          name="description"
          content="Description of GradedEvaluateAllNodesGame"
        />
      </Helmet>
      {currentLevel === -1 && (
        <ExamInstruction setCurrentLevel={setCurrentLevel} />
      )}
      {currentLevel !== -1 && props.state.gameData && value && (
        <>
          <NavigationBar
            gradedGame
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            maxLevel={4}
            submit={submit}
            timeStamps={timeStamps}
            setTimeStamps={setTimeStamps}
          />
          <GameComponent
            gameData={props.state.gameData}
            evaluatedAnswer={props.state.evaluatedAnswer}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            submit={submit}
            setValue={setValue}
            value={value}
            maxLevel={4}
            timeStamps={timeStamps}
            setTimeStamps={setTimeStamps}
          />
        </>
      )}
    </div>
  );
}

GradedEvaluateAllNodesGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedEvaluateAllNodesGame(),
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
)(GradedEvaluateAllNodesGame);
