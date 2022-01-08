/**
 *
 * NodeConsistencyGame
 *
 */

import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Row, Col, Button, Image,
  Checkbox, Rate
} from 'antd';
import moment from 'moment';
import TimeClock from 'components/TimeClock';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TickMark from 'images/tickmark.svg';
import CrossMark from 'images/cross.svg';
import AppStructure from 'components/AppStructure';
import makeSelectNodeConsistencyGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Collapse } from 'antd';

import { getGamesDataStart, evaluateResponseStart, putFeedbackStart } from './actions';

const { Panel } = Collapse;
const MyGrid = styled.div`
  width: ${props => props.size * 72}px;
  height: ${props => props.size * 72}px;
  .chessboard {
    width: 70px;
    height: 70px;
    border: 2px solid #333;
  }
`;
const errors = [
  'Silly mistake',
  'Did not know the concept',
  'Knew Concept,but unable to apply',
  'Made a guess',
  'Attempted in a hurry',
  'Could not understand the question',
];

const questions = [
  'How interesting did you find the question?',
  'How relevant did you find the question w.r.t. the concept?',
  'How difficult did you find the question w.r.t. the current level?',
];

const MyDiv = styled.div`
  width: 100%;
  min-height: 200px;
  border: 1px solid black;
  margin-top: 50px;
  padding: 20px;
`;

export function NodeConsistencyGame(props) {
  useInjectReducer({ key: 'nodeConsistencyGame', reducer });
  useInjectSaga({ key: 'nodeConsistencyGame', saga });

  const [selectedArray, setSelectedArray] = useState(undefined);
  const [startTime, setStartTime] = useState(0);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [isWWWModalVisible, setIsWWWModalVisible] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(errors.length).fill(false),
  );
  const [starValue, setStarValue] = useState(
    new Array(questions.length).fill(0),
  );

  function start() {
    const date = new Date();
    setStartTime(date);
  }
  function end() {
    const endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    const seconds = timeDiff;
    return seconds;
  }

  const { gameData } = props.nodeConsistencyGame;
  const { evaluatedAnswer } = props.nodeConsistencyGame;

  const showFeedbackModal = () => {
    setIsFeedbackModalVisible(true);
  };
  const showWWWModal = () => {
    setIsWWWModalVisible(true);
  };


  const handleFeedbackOk = () => {
    const response = {};
    const studentResponse = {};
    studentResponse.feedback = JSON.stringify(starValue);

    if (evaluatedAnswer.score !== 1) {
      studentResponse.whatwentwrong = JSON.stringify(checkedState);
    }
    response.studentResponse = studentResponse;

    setIsFeedbackModalVisible(false);

    props.saveFeedback(response);
  };


  useEffect(() => {
    if (evaluatedAnswer) {
      showFeedbackModal();
      if (evaluatedAnswer.score !== 1)
        showWWWModal();
    }
  }, [evaluatedAnswer]);

  const { level } = props.match.params;
  const { gameId } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
    start();
  }, [level]);

  useEffect(() => {
    if (gameData) {
      console.log(gameData.gameDescription);
      const nestedArray = Array.from(Array(gameData.nodes.length), _ =>
        Array(gameData.shuffled_bag.length).fill(true),
      );

      setSelectedArray(nestedArray);
    }
  }, [gameData]);

  const changeState = event => {
    const { id } = event.target;
    const myArr = id.split('-');
    const row = parseInt(myArr[0]);
    const col = parseInt(myArr[1]);

    const nestedList = selectedArray;
    nestedList[row][col] = !nestedList[row][col];

    if (nestedList[row][col]) {
      event.target.style.backgroundColor = 'lightgreen';
    } else {
      event.target.style.backgroundColor = '#ff5454';
    }
    setSelectedArray(nestedList);
  };

  const checkAnswer = () => {
    const secs = end();
    const response = {};
    const answer = [];

    for (let i = 0; i < gameData.nodes.length; i += 1) {
      const innerList = [];
      for (let j = 0; j < gameData.shuffled_bag.length; j += 1) {
        if (selectedArray[i][j]) {
          innerList.push(1);
        } else {
          innerList.push(0);
        }
      }
      answer.push(innerList);
    }

    gameData.response = answer;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = level;
    gameData.gameId = gameId;
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  const prevLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/node-consistency/${gameId}/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/node-consistency/${gameId}/${lvl + 1}`;
  };
  const backToConcepts = () => {
    window.location.href = `/concept/7`;
  }

  return (
    <div>
      <Helmet>
        <title>NodeConsistencyGame</title>
        <meta name="description" content="Description of NodeConsistencyGame" />
      </Helmet>
      <AppStructure
        heading="Node Consistency"
        level={"Level: " + level + "/2"}
        attempt={gameData ? " " + (gameData.attempt) : " 1"}
        evaluatedAnswer={evaluatedAnswer}
        divContent={
          <div style={{ padding: '20px', background: '#F8FAA7' }}>
            {isWWWModalVisible ?
              (
                <div style={{ color: 'white', paddingLeft: '50px', justifyContent: 'center', background: '#295474', }}>
                  <h1 style={{ color: 'white' }}>Why you made mistake?</h1>
                  <h3 style={{ color: 'white' }}>Please answer the following questions and then press OK. Your feedback will ultimately help you</h3>
                  <div>
                    {
                      errors.map((ques, idx) => (
                        <Checkbox style={{ color: 'white' }} onChange={function handleChange(event) {
                          checkedState[idx] = event.target.checked;
                        }}>{ques}</Checkbox>
                      ))
                    }
                    <Button type='primary' onClick={function (event) {
                      setIsWWWModalVisible(false);
                      setIsFeedbackModalVisible(true);
                    }}>DONE</Button>
                  </div>
                </div>
              ) : (isFeedbackModalVisible ? (
                <div style={{ color: 'white', paddingLeft: '50px', justifyContent: 'center', background: '#295474', }}>
                  <h1 style={{ color: 'white' }}>Feedback</h1>
                  <h3 style={{ color: 'white' }}>Please answer the following questions and then press OK. Your feedback will ultimately help you</h3>
                  <div>
                    {
                      questions.map((ques, idx) => (
                        <div>
                          <p>{(idx + 1) + ". " + ques}</p>
                          <Rate allowClear={false} onChange={function handleChange(value) { starValue[idx] = value; }} />
                        </div>
                      )

                      )
                    }
                    <Button type='primary' onClick={function (event) {
                      handleFeedbackOk();
                    }}>DONE</Button>
                  </div>
                </div>
              ) : null)}
            <div
              style={{
                display: 'flex',
                width: '100%',
                marginBottom: '20px',
              }}
            >
              <Button
                style={{ marginLeft: '10px' }}
                onClick={backToConcepts}
              >
                Back to Materials
              </Button>
              <div style={{ display: 'flex', width: '100%' }}>
                <Button style={{ marginLeft: 'auto', marginRight: '30px' }} onClick={prevLevel} disabled={level == 1}>
                  Previous Level
                </Button>
                <Button
                  style={{ marginLeft: 'auto', marginRight: '30px' }}
                  onClick={nextLevel}
                  disabled={level == 2}
                >
                  Next Level
                </Button>
              </div>
            </div>
            {gameData && selectedArray ? (
              <Row>
                <Collapse accordion style={{ width: '100%' }} defaultActiveKey={['1']}>
                  <Panel key="1" header="How to play?">
                    <p>{gameData ? gameData.gameDescription : ""}</p>
                  </Panel>
                </Collapse>
                <Col span="11">
                  <div>
                    <MyGrid size={gameData.grid_size}>
                      <div style={{ display: 'flex', marginBottom: '0px' }}>
                        {[...Array(gameData.grid_size)].map((k, j) => (
                          <h1
                            style={{
                              width: '100%',
                              marginBottom: '0px',
                              marginLeft: '42px',
                              textAlign: 'right',
                            }}
                          >
                            {j + 1}
                          </h1>
                        ))}
                      </div>
                      {[...Array(gameData.grid_size + 1)].map(
                        (x, i) =>
                          i > 0 && (
                            <div style={{ display: 'flex' }}>
                              {[...Array(gameData.grid_size + 1)].map(
                                (y, j) => (
                                  <div>
                                    {gameData.grid ? (
                                      j === 0 ? (
                                        <h1
                                          style={{
                                            width: '25px',
                                            height: '25px',
                                            marginBottom: '0px',
                                          }}
                                        >
                                          {i}
                                        </h1>
                                      ) : (
                                        <div
                                          style={{
                                            backgroundColor:
                                              gameData.grid[i][j] === 35
                                                ? 'black'
                                                : 'white',
                                          }}
                                          className="chessboard"
                                        />
                                      )
                                    ) : null}
                                  </div>
                                ),
                              )}
                            </div>
                          ),
                      )}
                    </MyGrid>
                  </div>
                  {/* <TimeClock active={!evaluatedAnswer} /> */}
                </Col>
                <Col span="13" style={{ flexWrap: 'wrap' }}>
                  <div style={{ flexWrap: 'wrap', display: 'flex' }}>
                    {gameData.nodes.map((item, row) => (
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
                            {gameData.shuffled_bag.map((item1, col) => (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  minWidth: '100px',
                                }}
                              >
                                <button
                                  type="submit"
                                  id={`${row}-${col}`}
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
                            ))}
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
                    <Button onClick={checkAnswer} type="primary">
                      Check Answer
                    </Button>
                  </div>
                </Col>
              </Row>
            ) : null}
          </div>
        }
      />
    </div>
  );
}

NodeConsistencyGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  nodeConsistencyGame: makeSelectNodeConsistencyGame(),
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
)(NodeConsistencyGame);
