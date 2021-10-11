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

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

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

  const { level } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
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

  const prevLevel = () => {
    const lvl = parseInt(level);
    history.push(`/write-expression/${lvl - 1}`);
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    history.push(`/write-expression/${lvl + 1}`);
  };

  const onFinish = values => {
    values.response = values.response.replace(/\s/g, '');
    const response = {};
    gameData.response = values.response;
    response.studentResponse = gameData;
    console.log(response);
    props.checkStudentResponse(response);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  if (evaluatedAnswer) {
    console.log(evaluatedAnswer);
  }

  return (
    <div>
      <Helmet>
        <title>WriteExpressionGame</title>
        <meta name="description" content="Description of WriteExpressionGame" />
      </Helmet>

      <SideBar
        steps={['Tree Games', 'CrossWords', 'New Games']}
        heading="TreeGame"
      >
        <div>
          <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
            {level == 1 ? (
              <Button
                style={{ marginLeft: 'auto', marginRight: '30px' }}
                onClick={nextLevel}
              >
                Next Level
              </Button>
            ) : level > 1 && level < 4 ? (
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
          {gameData ? (
            <Row>
              <Col offset="2" span="6">
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
                      label="Expression"
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
                {evaluatedAnswer && (
                  <div>
                    {evaluatedAnswer.syntax_error &&
                      evaluatedAnswer.syntax_error === 'No syntax error' && (
                        <div>
                          <h1
                            style={{
                              color: evaluatedAnswer.correct ? 'green' : 'red',
                            }}
                          >
                            {evaluatedAnswer.correct ? 'CORRECT' : 'INCORRECT'}
                          </h1>

                          {!evaluatedAnswer.correct && (
                            <h1>{evaluatedAnswer.correct_answer}</h1>
                          )}
                        </div>
                      )}

                    {evaluatedAnswer.syntax_error && (
                      <h2
                        style={{
                          color: 'blue',
                        }}
                      >
                        {evaluatedAnswer.syntax_error}
                      </h2>
                    )}
                  </div>
                )}
              </Col>

              <Col offset="1">
                <h1>Graph</h1>
                <div style={{ border: '2px solid black' }}>
                  <CytoscapeComponent
                    elements={elements}
                    style={{ minWidth: '600px', minHeight: '650px' }}
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
                  />
                </div>
              </Col>
            </Row>
          ) : null}
        </div>
      </SideBar>
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
