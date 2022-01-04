/* eslint-disable indent */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/**
 *
 * WriteExpressionGame
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import TimeClock from 'components/TimeClock';
import AppStructure from 'components/AppStructure';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CytoscapeComponent from 'react-cytoscapejs';
import {
  Row,
  InputNumber,
  Button,
  Space,
  message,
  Col,
  Form,
  Input,
  Collapse
} from 'antd';
import SideBar from 'components/SideBar';
import history from 'utils/history';
import makeSelectWriteExpressionGame from './selectors';
import reducer from './reducer';
import saga, { evaluateAnswer } from './saga';
import { getGraphStart, evaluateExpressionStart } from './actions';

export function WriteExpressionGame(props) {
  useInjectReducer({ key: 'writeExpressionGame', reducer });
  useInjectSaga({ key: 'writeExpressionGame', saga });

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

  const { Panel } = Collapse;
  const { level } = props.match.params;
  const { gameId } = props.match.params;
  console.log(props);
  useEffect(() => {
    props.getGameData(level);
    start();
  }, [level]);

  const { gameData } = props.writeExpressionGame;
  const { evaluatedAnswer } = props.writeExpressionGame;
  console.log(gameData);

  const elements = [];

  if (gameData) {
    console.log(gameData);
    const { x_coor } = gameData;
    const { y_coor } = gameData;

    const { edge_carvature } = gameData;
    const { content } = gameData;

    for (let i = 0; i < gameData.num_nodes; i += 1) {
      const obj = {
        data: { id: i, label: gameData.content[i] },
        position: {
          x: 100 * (x_coor[i] + 1),
          y: 100 * (y_coor[i] + 1),
        },
      };
      elements.push(obj);
    }
    const { adjList } = gameData;
    for (let i = 0; i < gameData.num_nodes; i += 1) {
      let j = 0;

      while (adjList[i][j] != null) {
        const tar = adjList[i][j];

        const obj = {
          data: {
            source: i,
            target: tar,
            label: '',
            key: `${i}t${tar}`,
          },
          style: {
            'control-point-weight': 0.5,
            'control-point-distance': -20 * edge_carvature[i][j],
            'line-color': content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
            'target-arrow-color':
              content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
          },
        };
        elements.push(obj);

        j += 1;
      }
    }
  }

  const backToConcepts=()=>{
    window.location.href = `/concept/5`;
  }
  const prevLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/write-expression/${gameId}/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/write-expression/${gameId}/${lvl + 1}`;
  };

  const onFinish = values => {
    const secs = end();
    values.response = values.response.replace(/\s/g, '');
    const response = {};
    gameData.response = values.response;
    gameData.response = values.response;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = parseInt(level);
    gameData.gameId = parseInt(gameId);
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  let myCyRef;
  if (evaluatedAnswer) {
    console.log(evaluatedAnswer);
  }

  return (
    <div>
      <Helmet>
        <title>WriteExpressionGame</title>
        <meta name="description" content="Description of WriteExpressionGame" />
      </Helmet>
      <AppStructure
        heading="Write Expression"
        level={"Level: " + level + "/4"}
        attempt={gameData ? " " + gameData.attempt : " 1"}
        evaluatedAnswer={evaluatedAnswer}
        divContent={
          <div
            style={{
              background: '#F8FAA7',
            }}
          >
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
                  <Button style={ { marginLeft: 'auto', marginRight: '30px' }} onClick={prevLevel} disabled={level==1}>
                    Previous Level
                  </Button>
                  <Button
                    style={{ marginLeft: 'auto', marginRight: '30px' }}
                    onClick={nextLevel}
                    disabled={level==4}
                  >
                    Next Level
                  </Button>
                </div>
            </div>
            {gameData ? (
              <Row>
                <Collapse accordion style={{ width: '100%' }} defaultActiveKey={['1']}>
                  <Panel key="1" header="How to play?">
                    <p>{gameData ? gameData.gameDescription : ""}</p>
                  </Panel>
                </Collapse>
                <Col span="11" style={{ padding: '40px' }}>
                  <div>
                    <h1>
                      Write Any Equivalent Expression denoted by the following
                      Graph:
                    </h1>
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Enter your expression"
                        name="response"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Response!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                  {evaluatedAnswer && evaluatedAnswer.syntax_error ? (
                    <div>
                      {evaluatedAnswer.syntax_error === 'No syntax error' ? (
                        <div>
                          <h2
                            style={{
                              color: 'blue',
                            }}
                          >
                            No syntax error
                          </h2>
                          <h1
                            style={{
                              color: evaluatedAnswer.correct
                                ? 'green'
                                : 'red',
                            }}
                          >
                            {evaluatedAnswer.correct
                              ? 'CORRECT'
                              : 'INCORRECT'}
                          </h1>

                          {!evaluatedAnswer.correct && (
                            <h2><pre>{"One of the correct answer :\n" + evaluatedAnswer.correct_answer}</pre></h2>
                          )}

                        </div>
                      ) :
                        <h2
                          style={{
                            color: 'blue',
                          }}
                        >
                          {evaluatedAnswer.syntax_error}
                        </h2>

                      }

                    </div>
                  ) : null}
                </Col>

                <Col
                  span="13"
                  offset="40px"
                  style={{ padding: '20px', paddingLeft: '80px' }}
                >
                  <div
                    style={{
                      background: '#6EA5C3',
                      padding: '10px',
                      marginBottom: '50px',
                      textAlign: 'center',
                      // minWidth: '500px',
                      width: '500px',
                    }}
                  >
                    {' '}
                    <h1
                      style={{
                        textAlign: 'Center',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      Graph
                    </h1>
                    <Button onClick={function (event) { myCyRef.reset(); }}>Reset Graph Layout</Button>
                    <div>
                      <CytoscapeComponent
                        elements={elements}
                        style={{
                          minWidth: '400px',
                          height: level * 100 + 400,
                          background: 'white',
                          border: '2px solid black',
                        }}
                        stylesheet={[
                          {
                            selector: 'node',
                            style: {
                              'background-color': '#666',
                              color: 'white',
                              label: 'data(label)',
                              width: '42px',
                              height: '42px',
                              'text-valign': 'center',
                              'text-halign': 'center',
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
                        }}
                      />
                    </div>
                    {/*  */}
                  </div>
                </Col>
                {/* <TimeClock active={!evaluatedAnswer} /> */}
              </Row>
            ) : null}
          </div>
        }
      />
      {/* <SideBar */}
      {/* steps={['Tree Games', 'CrossWords', 'New Games']}
        heading="TreeGame" */}
      {/* > */}

      {/* </SideBar> */}
    </div>
  );
}

WriteExpressionGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  writeExpressionGame: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  writeExpressionGame: makeSelectWriteExpressionGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: token => dispatch(getGraphStart(token)),
    checkStudentResponse: response =>
      dispatch(evaluateExpressionStart(response)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WriteExpressionGame);
