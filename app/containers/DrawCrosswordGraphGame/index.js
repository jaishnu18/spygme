/**
 *
 * DrawCrosswordGraphGame
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TimeClock from 'components/TimeClock';
import AppStructure from 'components/AppStructure';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, InputNumber, Button, Space, Select, Col, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import CytoscapeComponent from 'react-cytoscapejs';
import moment from 'moment';
import { set } from 'lodash';
import AppWrapper from 'components/AppWrapper';
import makeSelectDrawCrosswordGraphGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getGamesDataStart, evaluateResponseStart } from './actions';

const { Option } = Select;

const MyGrid = styled.div`
  width: ${props => props.size * 72}px;
  height: ${props => props.size * 72}px;
  .chessboard {
    width: 70px;
    height: 70px;
    border: 2px solid #333;
  }
`;

export function DrawCrosswordGraphGame(props) {
  useInjectReducer({ key: 'drawCrosswordGraphGame', reducer });
  useInjectSaga({ key: 'drawCrosswordGraphGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [graphData, setGraphData] = useState(undefined);
  const [AcrossNodes, setAcrossNodes] = useState([]);
  const [DownNodes, setDownNodes] = useState([]);
  const [edgeList, setEdgeList] = useState([]);

  const [nodeX, setNodeX] = useState(undefined);
  const [toAdd, setToAdd] = useState(true);

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

  const { gameData } = props.drawCrosswordGraphGame;
  const { evaluatedAnswer } = props.drawCrosswordGraphGame;

  const { level } = props.match.params;

  useEffect(() => {
    props.getGameData(level);
    start();
  }, [level]);

  const prevLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/draw-crossword-graph/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/draw-crossword-graph/${lvl + 1}`;
  };

  useEffect(() => {
    const elements = [];
    const ac = [];
    const dn = [];
    if (gameData) {
      gameData.ptr = -1;
      for (let i = 0; i < gameData.nodes.length; i += 1) {
        if (gameData.nodes[i][2] === 65) {
          // across
          ac.push(`${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-A`);
          const obj = {
            data: {
              id: `${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-${
                gameData.nodes[i][2] === 65 ? 'A' : 'D'
              }`,
              label: `${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-${
                gameData.nodes[i][2] === 65 ? 'A' : 'D'
              }`,
            },
            position: {
              x: 100 * (i + 1),
              y: 100,
            },
          };
          elements.push(obj);
        } else {
          // down
          dn.push(`${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-D`);
          if (gameData.ptr === -1) {
            gameData.ptr = i;
          }
          const obj = {
            data: {
              id: `${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-${
                gameData.nodes[i][2] === 65 ? 'A' : 'D'
              }`,
              label: `${gameData.nodes[i][0]}-${gameData.nodes[i][1]}-${
                gameData.nodes[i][2] === 65 ? 'A' : 'D'
              }`,
            },
            position: {
              x: 100 * (i - gameData.ptr + 1),
              y: 400,
            },
          };
          elements.push(obj);
        }
      }

      setGraphData(elements);

      setAcrossNodes(ac);
      setDownNodes(dn);
    }
  }, [gameData]);

  let myCyRef;
  const [form] = Form.useForm();

  const onFinish = values => {
    const secs = end();
    console.log(values);

    const res = [];
    for (const item in values.nodes) {
      console.log(item);
      const arr1 = values.nodes[item].across.split('-');
      const arr2 = values.nodes[item].down.split('-');
      const newArr = [];
      for (let i = 0; i < arr1.length; i += 1) {
        if (i === 2) {
          if (arr1[i] === 'A') {
            newArr.push(65);
          } else {
            newArr.push(68);
          }
        } else {
          newArr.push(parseInt(arr1[i]));
        }
      }
      for (let i = 0; i < arr2.length; i += 1) {
        if (i === 2) {
          if (arr2[i] === 'A') {
            newArr.push(65);
          } else {
            newArr.push(68);
          }
        } else {
          newArr.push(parseInt(arr2[i]));
        }
      }

      console.log(newArr);
      res.push(newArr);
    }

    const onChange = value => {
      console.log(value);
    };

    console.log(res);
    const response = {};
    gameData.response = res;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.difficulty = level;
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  if (evaluatedAnswer) {
    console.log(evaluatedAnswer);
  }

  return (
    <div>
      <Helmet>
        <title>DrawCrosswordGraphGame</title>
        <meta
          name="description"
          content="Description of DrawCrosswordGraphGame"
        />
      </Helmet>
      <AppStructure
        heading="Draw Crossword Game"
        level="Level: 2/5"
        attempt=" 2"
        evaluatedAnswer={evaluatedAnswer}
        divContent={
          <AppWrapper>
            <Row style={{ backgroundColor: '#F8FAA7', paddingTop: '40px' }}>
              <Col offset="1">
                {gameData && (
                  <div>
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
                  </div>
                )}
                <TimeClock active={!evaluatedAnswer} />
              </Col>
              <Col offset="2">
                <div>
                  {gameData && graphData && (
                    <CytoscapeComponent
                      elements={CytoscapeComponent.normalizeElements(graphData)}
                      // pan={{ x: 200, y: 200 }}
                      style={{
                        background: 'white',
                        width: '400px',
                        height: '600px',
                        border: '2px black solid',
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
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'unbundled-bezier',
                            'control-point-weight': '0.5',
                            'control-point-distance': '0',
                          },
                        },
                      ]}
                      cy={cy => {
                        myCyRef = cy;
                        cy.on('tap', 'node', evt => {
                          // const node = evt.target;
                          // const id = node.id();
                          // doIt(id);
                        });
                      }}
                    />
                  )}
                </div>
              </Col>
              <Col offset="1" span="10">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h1 style={{ marginBottom: '30px' }}>Answer</h1>
                  <div style={{ width: '100%' }}>
                    <Form
                      form={form}
                      name="dynamic_form_nest_item"
                      onFinish={onFinish}
                      onFieldsChange={value => console.log(value)}
                      autoComplete="off"
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <Form.List shouldUpdate name="nodes">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map((field, index) => (
                              <Space key={field.key} align="baseline">
                                <Form.Item
                                  noStyle
                                  shouldUpdate={(prevValues, curValues) =>
                                    prevValues.area !== curValues.area ||
                                    prevValues.sights !== curValues.sights
                                  }
                                >
                                  {() => (
                                    <Form.Item
                                      {...field}
                                      label={index >= 0 ? 'Across' : ''}
                                      name={[field.name, 'across']}
                                      fieldKey={[field.fieldKey, 'node']}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Missing Row',
                                        },
                                      ]}
                                    >
                                      <Select style={{ width: 130 }}>
                                        {AcrossNodes.map((item, index) => (
                                          <Option key={index} value={item}>
                                            {item}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  )}
                                </Form.Item>
                                <Form.Item
                                  noStyle
                                  shouldUpdate={(prevValues, curValues) =>
                                    prevValues.area !== curValues.area ||
                                    prevValues.sights !== curValues.sights
                                  }
                                >
                                  {() => (
                                    <Form.Item
                                      {...field}
                                      label={index >= 0 ? 'Down' : ''}
                                      name={[field.name, 'down']}
                                      fieldKey={[field.fieldKey, 'node']}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Missing Row',
                                        },
                                      ]}
                                    >
                                      <Select style={{ width: 130 }}>
                                        {DownNodes.map((item, index) => (
                                          <Option key={index} value={item}>
                                            {item}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  )}
                                </Form.Item>

                                {index > 0 && (
                                  <MinusCircleOutlined
                                    onClick={() => remove(field.name)}
                                  />
                                )}
                              </Space>
                            ))}

                            <Form.Item>
                              <Button
                                style={{ width: '20%' }}
                                type="dashed"
                                onClick={() => add()}
                                block
                              >
                                Add Nodes
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                      <Form.Item offset="3">
                        <Button
                          style={{ width: '20%' }}
                          type="primary"
                          htmlType="submit"
                        >
                          Check Answer
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                  <div>
                    {evaluatedAnswer && (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex' }}>
                          All Correct
                          {evaluatedAnswer.allCorrect ? (
                            <div style={{ marginLeft: '20px' }}>Yes</div>
                          ) : (
                            <div style={{ marginLeft: '20px' }}>No</div>
                          )}
                        </div>
                        <div
                          style={{
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          Correct Answered Edges
                          {evaluatedAnswer.correct_edges_list.length === 0 ? (
                            <div style={{ marginLeft: '30px' }}> 0 </div>
                          ) : (
                            evaluatedAnswer.correct_edges_list.map(item => (
                              <div>
                                {item[0]}-{item[1]}-A :- {item[3]}-{item[4]}-D
                              </div>
                            ))
                          )}
                        </div>

                        {evaluatedAnswer &&
                          evaluatedAnswer.missed_edges_list.length > 0 && (
                            <div
                              style={{
                                marginTop: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              Missing Edges
                              {evaluatedAnswer.missed_edges_list.length ===
                              0 ? (
                                <div style={{ marginLeft: '30px' }}> 0 </div>
                              ) : (
                                evaluatedAnswer.missed_edges_list.map(item => (
                                  <div>
                                    {item[0]}-{item[1]}-A :- {item[3]}-{item[4]}
                                    -D
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                        {evaluatedAnswer &&
                          evaluatedAnswer.wrong_edges_list.length > 0 && (
                            <div
                              style={{
                                marginTop: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              Wrong Nodes
                              {evaluatedAnswer.wrong_edges_list.length === 0 ? (
                                <div style={{ marginLeft: '30px' }}> 0 </div>
                              ) : (
                                evaluatedAnswer.wrong_edges_list.map(item => (
                                  <div>
                                    {item[0]}-{item[1]}-A :- {item[3]}-{item[4]}
                                    -D
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </AppWrapper>
        }
      />
    </div>
  );
}

DrawCrosswordGraphGame.propTypes = {
  drawCrosswordGraphGame: PropTypes.object.isRequired,
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  drawCrosswordGraphGame: makeSelectDrawCrosswordGraphGame(),
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
)(DrawCrosswordGraphGame);
