/**
 *
 * GradedNodeConsistencyGame
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Col, Row, Form } from 'antd';
import Crossword from 'components/Crossword';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CountDownTimer from 'components/CountDownTimer';
import AppWrapper from 'components/AppWrapper';
import TickMark from 'images/tickmark.svg';
import CrossMark from 'images/cross.svg';
import saga from './saga';
import reducer from './reducer';
import makeSelectGradedNodeConsistencyGame from './selectors';

import { getGamesDataStart, evaluateResponseStart } from './actions';
import ExamNavigator from '../../components/ExamNavigator';
import styled from 'styled-components';

const MyDiv = styled.div`
  width: 100%;
  min-height: 200px;
  border: 1px solid black;
  margin-top: 50px;
  padding: 20px;
`;

export function GradedNodeConsistencyGame(props) {
  useInjectReducer({ key: 'gradedNodeConsistencyGame', reducer });
  useInjectSaga({ key: 'gradedNodeConsistencyGame', saga });

  const [selectedArray, setSelectedArray] = useState(undefined);
  const [levels, setLevels] = useState(0);
  const [currLevel, setCurrLevel] = useState(undefined);
  const [duration, setDuration] = useState(45 * 60 * 1000);
  const [time, setTime] = useState(0);
  const [attempted, setAttempted] = useState([0, 0, 0, 0]);
  const [markedForReview, setMarkedForReview] = useState([0, 0, 0, 0]);
  const [visited, setVisited] = useState([1, 0, 0, 0]);
  const [startTest, setStartTest] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [responses, setResponses] = useState(undefined);

  const [isExamOver, setExamOver] = useState(false);
  const [timeStamps, setTimeStamps] = useState([[new Date()], [], [], []]);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (gameData) {
      const array = [];
      for (let i = 0; i < gameData.length; i += 1) {
        const nestedArray = Array.from(Array(gameData[i].nodes.length), _ =>
          Array(gameData[i].shuffled_bag.length).fill(true),
        );
        array.push(nestedArray);
      }
      console.log('HEEEEE');
      setSelectedArray(array);
      console.log(selectedArray);
    }
  }, [gameData]);

  const { gameData } = props.gradedNodeConsistencyGame;
  const { evaluatedAnswer } = props.gradedNodeConsistencyGame;
  console.log(gameData);

  const handleChange = e => {
    const { id } = e.target;
    const myArr = id.split('-');
    const row = parseInt(myArr[0]);
    const col = parseInt(myArr[1]);

    const R = [...responses];
    R[row - 1][col] = parseInt(e.target.value);
    setResponses(R);

    const demoAttempted = attempted;
    demoAttempted[row - 1] = 1;
    setAttempted(demoAttempted);
    submitTest();
  };

  const changeState = event => {
    const { id } = event.target;
    console.log(id);
    const myArr = id.split('-');
    const lvl = parseInt(myArr[0]);
    const row = parseInt(myArr[1]);
    const col = parseInt(myArr[2]);

    console.log(selectedArray);
    const nestedList = selectedArray;
    nestedList[lvl][row][col] = !nestedList[lvl][row][col];

    if (nestedList[lvl][row][col]) {
      event.target.style.backgroundColor = 'lightgreen';
    } else {
      event.target.style.backgroundColor = '#ff5454';
    }
    setSelectedArray(nestedList);
  };

  const submitTest = () => {
    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = responses[i];
      gameData[i].isExamOver = isExamOver;
      gameData[i].timeStamps = timeStamps[i];
    }

    console.log(gameData);

    const res = {};
    res.studentResponse = gameData;
    props.checkStudentResponse(res);
  };

  const formFields = () => {};

  return (
    <div>
      <Helmet>
        <title>GradedNodeConsistencyGame</title>
        <meta
          name="description"
          content="Description of GradedNodeConsistencyGame"
        />
      </Helmet>

      <AppWrapper>
        <div style={{ width: '100%', background: '#295474', padding: 20 }}>
          <Row justify="space-around">
            <Col span={4}>
              <h1 style={{ color: 'white' }}>Match Expression</h1>
            </Col>
            <Col span={4}>
              <h1 style={{ color: 'white' }}>
                Level: {currLevel + 1 ? currLevel + 1 : 0} / 4
              </h1>
            </Col>

            <Col span={4}>
              {startTest && (
                <CountDownTimer
                  hours={1}
                  minutes={0}
                  seconds={0}
                  setExamOver={setExamOver}
                  isExamOver={isExamOver}
                />
              )}
            </Col>
            <Col>
              <Button
                onClick={() => {
                  setExamOver(true);
                }}
                style={{ marginLeft: 'auto' }}
                disabled={isExamOver}
              >
                Submit Test
              </Button>
            </Col>
          </Row>
        </div>
        {gameData && startTest ? (
          <Row
            style={{
              backgroundColor: '#F8FAA7',
              margin: '10px 50px 50px 50px',
              borderRadius: '10px',
              padding: '20px',
              paddingBlock: '40px',
              minHeight: '100%',
            }}
          >
            <Col style={{ marginLeft: '20px', minHeight: '100%' }}>
              <Col span="13" style={{ flexWrap: 'wrap' }}>
                <div style={{ flexWrap: 'wrap', display: 'flex' }}>
                  {gameData[currLevel].nodes.map((item, row) => (
                    <div style={{ flexWrap: 'wrap' }}>
                      <MyDiv
                        style={{
                          background: 'white',
                          width: '350px',
                          margin: '5px',
                        }}
                      >
                        <h1>
                          {item[0]}-{item[1]}-{item[2] == 65 ? 'A' : 'D'}
                        </h1>
                        <div
                          style={{
                            display: 'flex',
                            minWidth: 'auto',
                            flexWrap: 'wrap',
                            // overflow: 'auto',
                          }}
                        >
                          {gameData[currLevel].shuffled_bag.map(
                            (item1, col) => (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  minWidth: '100px',
                                }}
                              >
                                <button
                                  type="submit"
                                  id={`${currLevel}-${row}-${col}`}
                                  onClick={changeState}
                                  style={{
                                    marginLeft: '20px',
                                    backgroundColor: 'lightgreen',
                                    margin: '10px',
                                    color: 'black',
                                  }}
                                >
                                  {item1}
                                </button>
                                <div
                                  style={{
                                    width: '100%',
                                    // height: '0px',
                                    // padding: '0px',
                                  }}
                                >
                                  {evaluatedAnswer &&
                                    evaluatedAnswer.tick_cross && (
                                      <img
                                        style={{
                                          width: '100%',
                                          height: '20px',
                                        }}
                                        src={
                                          evaluatedAnswer.tick_cross[row][col]
                                            ? TickMark
                                            : CrossMark
                                        }
                                      />
                                    )}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </MyDiv>
                      {evaluatedAnswer && (
                        <div>
                          <h1
                            style={{
                              color: evaluatedAnswer.result[row]
                                ? 'green'
                                : 'red',
                            }}
                          >
                            {evaluatedAnswer.result[row]
                              ? 'CORRECT'
                              : 'INCORRECT'}
                          </h1>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ margin: '5px' }}>
                  <Button onClick={submitTest} type="primary">
                    Check Answer
                  </Button>
                </div>
              </Col>

              <div style={{ margin: '20px' }}>
                <Crossword
                  grid={gameData[currLevel].grid}
                  gridSize={gameData[currLevel].grid_size}
                />
              </div>

              <div style={{ display: 'flex', margin: '50px' }}>
                {currLevel > 0 && (
                  <Button
                    onClick={() => {
                      const lvl = Math.max(0, currLevel - 1);
                      const X = visited;
                      X[lvl] = 1;
                      setVisited(X);
                      setCurrLevel(lvl);
                    }}
                  >
                    previous
                  </Button>
                )}
                {currLevel < 3 && (
                  <Button
                    onClick={() => {
                      const lvl = Math.min(3, currLevel + 1);
                      const X = visited;
                      X[lvl] = 1;
                      setVisited(X);
                      setCurrLevel(lvl);
                    }}
                    style={{ marginLeft: 'auto' }}
                  >
                    next
                  </Button>
                )}

                <Button
                  onClick={() => {
                    const X = markedForReview;
                    X[currLevel] = !X[currLevel];
                    setMarkedForReview(X);
                  }}
                >
                  {markedForReview[currLevel]
                    ? 'Un-Mark For Review'
                    : 'Mark For Review'}
                </Button>
              </div>
              {/* {evaluatedAnswer && } */}
            </Col>
            <Col style={{ marginLeft: 'auto', marginRight: '20px' }}>
              <ExamNavigator
                levels={gameData.length}
                currLevel={currLevel}
                setCurrLevel={setCurrLevel}
                attempted={attempted}
                markedForReview={markedForReview}
                visited={visited}
                setVisited={setVisited}
                timeStamps={timeStamps}
                setTimeStamps={setTimeStamps}
              />
              {evaluatedAnswer && isExamOver && (
                <div>
                  <h1>Statistics</h1>
                  <h2>Score : {evaluatedAnswer[4].score}%</h2>
                  <h2>Questions Attemted : {evaluatedAnswer[4].attempted}</h2>
                  <h2>
                    Questions Not Attempted : {evaluatedAnswer[4].notAttempted}
                  </h2>
                  <h2>
                    Questions Answered Correctly:{' '}
                    {evaluatedAnswer[4].correctlyAnswered}
                  </h2>
                  <h2>
                    Questions Answered Incorrectly:{' '}
                    {evaluatedAnswer[4].wrongAnswered}
                  </h2>
                  <Button onClick={() => setShowDetails(true)}>
                    Show Detailed Result
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        ) : (
          <div
            style={{
              backgroundColor: '#F8FAA7',
              margin: '10px 50px 50px 50px',
              borderRadius: '10px',
              padding: '20px',
              paddingBlock: '40px',
            }}
          >
            <h1>General Instructions</h1>
            <pre style={{ whiteSpace: 'pre-line' }}>
              {`
              1. Total duration of the graded quiz is 1 hour.\n
              2. The clock will be set at the server. The countdown timer in the top right corner of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.\n
              3. The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols:\n
                  Question not visited\n
                  Question visited but not attempted (may be partially)\n
                  Question attempted (may be partially)\n
                  Question not attempted and marked for review\n
                  Question attempted and marked for review\n
              4. All your responses get saved automatically as soon as you give your inputs.\n
              5. You can navigate between the questions using “Next” and “Previous” buttons or directly from the question palette.\n
              6. Each game has to be played in the same way as you played in the Practice section.`}
            </pre>
            <Button
              onClick={() => {
                setStartTest(true);
                setCurrLevel(0);
              }}
            >
              START TEST
            </Button>
          </div>
        )}
      </AppWrapper>
    </div>
  );
}

GradedNodeConsistencyGame.propTypes = {
  gradedNodeConsistencyGame: PropTypes.object,
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  gradedNodeConsistencyGame: makeSelectGradedNodeConsistencyGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: () => dispatch(getGamesDataStart()),
    checkStudentResponse: response => dispatch(evaluateResponseStart(response)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GradedNodeConsistencyGame);
