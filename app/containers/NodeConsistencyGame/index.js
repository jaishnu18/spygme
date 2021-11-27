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
import { Row, Col, Button, Image } from 'antd';
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

import { getGamesDataStart, evaluateResponseStart } from './actions';

const MyGrid = styled.div`
  width: ${props => props.size * 72}px;
  height: ${props => props.size * 72}px;
  .chessboard {
    width: 70px;
    height: 70px;
    border: 2px solid #333;
  }
`;

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

  const { level } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
    start();
  }, [level]);

  useEffect(() => {
    if (gameData) {
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
    gameData.difficulty = level;
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  const prevLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/node-consistency/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/node-consistency/${lvl + 1}`;
  };

  return (
    <div>
      <Helmet>
        <title>NodeConsistencyGame</title>
        <meta name="description" content="Description of NodeConsistencyGame" />
      </Helmet>
      <AppStructure
        heading="Node Consistency Game"
        level="Level: 2/5"
        attempt=" 2"
        evaluatedAnswer={evaluatedAnswer}
        divContent={
          <div style={{ padding: '20px', background: '#F8FAA7' }}>
            <div
              style={{ display: 'flex', width: '100%', marginBottom: '20px' }}
            >
              {level == 1 ? (
                <Button
                  style={{ marginLeft: 'auto', marginRight: '30px' }}
                  onClick={nextLevel}
                >
                  Next Level
                </Button>
              ) : level > 1 && level < 3 ? (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Button style={{ marginLeft: '10px' }} onClick={prevLevel}>
                    Previous Level
                  </Button>
                  <Button
                    style={{ marginLeft: 'auto', marginRight: '30px' }}
                    onClick={nextLevel}
                  >
                    Next Level
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Button style={{ marginLeft: '10px' }} onClick={prevLevel}>
                    Previous Level
                  </Button>
                </div>
              )}
            </div>
            {gameData && selectedArray ? (
              <Row>
                <Col span="11">
                  <h1>Crossword</h1>
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
};

const mapStateToProps = createStructuredSelector({
  nodeConsistencyGame: makeSelectNodeConsistencyGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: token => dispatch(getGamesDataStart(token)),
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
)(NodeConsistencyGame);
