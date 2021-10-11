/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/**
 *
 * ArcConsistencyGame
 *
 */

import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import CytoscapeComponent from 'react-cytoscapejs';
import { Button, Row, Col } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TickMark from 'images/tickmark.svg';
import CrossMark from 'images/cross.svg';
import makeSelectArcConsistencyGame from './selectors';
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
  position: relative;
  width: 100%;
  max-height: 400px;
  border: 1px solid black;
  margin-top: 50px;
  padding: 20px;
  overflow-x: scroll;
`;

export function ArcConsistencyGame(props) {
  useInjectReducer({ key: 'arcConsistencyGame', reducer });
  useInjectSaga({ key: 'arcConsistencyGame', saga });

  const [selectedArray, setSelectedArray] = useState(undefined);
  const [graphData, setGraphData] = useState(undefined);

  const { gameData } = props.arcConsistencyGame;
  const { evaluatedAnswer } = props.arcConsistencyGame;

  const { level } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
  }, [level]);

  useEffect(() => {
    if (gameData) {
      const elements = [];
      for (let i = 0; i < gameData.nodes.length; i += 1) {
        for (let j = 0; j < gameData.bag_size; j += 1) {
          const obj = {
            data: { id: `${i}-${j}`, label: gameData.word_bag[i][j] },
            position: {
              x: 100 * (i + 1),
              y: 100 * (j + 1),
            },
          };
          console.log(obj);
          elements.push(obj);
        }
      }
      // const { adjList } = gameData;
      // for (let i = 0; i < gameData.num_nodes; i += 1) {
      //   let j = 0;

      //   while (adjList[i][j] != null) {
      //     let tar = adjList[i][j];

      //     const obj = {
      //       data: {
      //         source: i,
      //         target: tar,
      //         label: '',
      //         key: `${i}t${tar}`,
      //       },
      //       style: {
      //         'control-point-weight': 0.5,
      //         'control-point-distance': -20 * edge_carvature[i][j],
      //         'line-color':
      //           content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
      //         'target-arrow-color':
      //           content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
      //       },
      //     };
      //     elements.push(obj);

      //     j += 1;
      //   }
      // }
      setGraphData(elements);

      const nestedArray = Array.from(Array(gameData.nodes.length), _ =>
        Array(gameData.bag_size).fill(true),
      );
      setSelectedArray(nestedArray);
    }
  }, [gameData]);

  useEffect(() => {
    if (evaluatedAnswer) {
      const elements = [];
      console.log();
      for (let i = 0; i < gameData.nodes.length; i += 1) {
        for (let j = 0; j < gameData.bag_size; j += 1) {
          const obj = {
            data: { id: `${i}-${j}`, label: gameData.word_bag[i][j] },
            position: {
              x: 200 * (i + 1),
              y: 200 * (j + 1),
            },
          };
          elements.push(obj);
        }
      }

      for (let i = 0; i < gameData.nodes.length; i += 1) {
        for (let j = 0; j < gameData.bag_size; j += 1) {
          for (
            let k = 0;
            k < evaluatedAnswer.consistency_graph[i][j].length;
            k += 1
          ) {
            const obj = {
              data: {
                source: `${i}-${j}`,
                target: `${evaluatedAnswer.consistency_graph[i][j][k][0]}-${
                  evaluatedAnswer.consistency_graph[i][j][k][1]
                }`,
                label: '',
                key: `${i}t${j}`,
              },
            };
            elements.push(obj);
          }
        }
      }
      setGraphData(elements);
    }
  }, [evaluatedAnswer]);

  let myCyRef;

  if (evaluatedAnswer) {
    console.log(evaluatedAnswer);
  }

  if (gameData) {
    console.log(gameData);
  }

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
      event.target.style.backgroundColor = '#ffc5ab';
    }
    setSelectedArray(nestedList);

    console.log(selectedArray);
  };

  const checkAnswer = () => {
    const response = {};
    const answer = [];

    for (let i = 0; i < gameData.nodes.length; i += 1) {
      const innerList = [];
      for (let j = 0; j < gameData.bag_size; j += 1) {
        if (selectedArray[i][j]) {
          innerList.push(1);
        } else {
          innerList.push(0);
        }
      }
      answer.push(innerList);
    }
    gameData.response = answer;
    response.studentResponse = gameData;

    console.log(response);

    props.checkStudentResponse(response);
  };

  const prevLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/arc-consistency/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/arc-consistency/${lvl + 1}`;
  };

  return (
    <div>
      <Helmet>
        <title>ArcConsistencyGame</title>
        <meta name="description" content="Description of ArcConsistencyGame" />
      </Helmet>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
          {level == 1 ? (
            <Button
              style={{ marginLeft: 'auto', marginRight: '30px' }}
              onClick={nextLevel}
            >
              Next Level
            </Button>
          ) : level > 1 && level < 2 ? (
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
            <Col offset="2">
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
                          {[...Array(gameData.grid_size + 1)].map((y, j) => (
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
                          ))}
                        </div>
                      ),
                  )}
                </MyGrid>
              </div>
            </Col>
            <Col offset="2" span="10">
              <div>
                {gameData.nodes.map((item, row) => (
                  <div>
                    <MyDiv>
                      <h1>
                        {item[0]}-{item[1]}-{item[2] == 65 ? 'A' : 'D'}
                      </h1>
                      <div style={{ display: 'flex' }}>
                        {gameData.word_bag[row].map((item1, col) => (
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
                                height: '40px',
                                padding: '10px',
                              }}
                            >
                              {evaluatedAnswer &&
                                evaluatedAnswer.tick_cross && (
                                  <img
                                    style={{ width: '100%', height: '20px' }}
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
              <div>
                <Button
                  style={{ marginTop: '20px' }}
                  onClick={checkAnswer}
                  type="primary"
                >
                  Check Answer
                </Button>
              </div>
              <div>
                <CytoscapeComponent
                  elements={CytoscapeComponent.normalizeElements(graphData)}
                  // pan={{ x: 200, y: 200 }}
                  style={{
                    width: '800px',
                    height: '800px',
                    border: '1px solid black',
                  }}
                  zoomingEnabled
                  maxZoom={3}
                  minZoom={0.1}
                  autounselectify={false}
                  boxSelectionEnabled
                  stylesheet={[
                    {
                      selector: 'node',
                      style: {
                        'background-color': '#666',
                        color: 'white',
                        label: 'data(label)',
                        width: '60px',
                        height: '60px',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '17px',
                      },
                    },
                    {
                      selector: 'edge',
                      style: {
                        width: 3,
                        'line-color': 'blue',
                        'target-arrow-color': 'blue',
                        'curve-style': 'unbundled-bezier',
                        'control-point-weight': '0.5',
                        'control-point-distance': '0',
                      },
                    },
                  ]}
                  cy={cy => {
                    myCyRef = cy;
                    console.log('EVT', cy);

                    cy.on('tap', 'node', evt => {
                      var node = evt.target;
                    });
                  }}
                  abc={console.log('myCyRef', myCyRef)}
                />
              </div>
            </Col>
          </Row>
        ) : null}
      </div>
    </div>
  );
}

ArcConsistencyGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  arcConsistencyGame: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  arcConsistencyGame: makeSelectArcConsistencyGame(),
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
)(ArcConsistencyGame);
