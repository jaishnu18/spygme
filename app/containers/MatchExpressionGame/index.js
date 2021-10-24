/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/**
 *
 * MatchExpressionGame
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
import moment from 'moment';
import AppWrapper from 'components/AppWrapper';
import history from 'utils/history';
import TickMark from 'images/tickmark.svg';
import CrossMark from 'images/cross.svg';
import TimeClock from 'components/TimeClock';
import makeSelectMatchExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getGamesDataStart, evaluateResponseStart } from './actions';

export function MatchExpressionGame(props) {
  useInjectReducer({ key: 'matchExpressionGame', reducer });
  useInjectSaga({ key: 'matchExpressionGame', saga });

  const [graphData, setGraphData] = useState(undefined);
  const [items, setItems] = useState(undefined);
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

  const { level } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
    start();
  }, [level]);
  const { gameData } = props.matchExpressionGame;
  const { evaluatedAnswer } = props.matchExpressionGame;

  useEffect(() => {
    if (gameData) {
      const elements = [];
      const { x_coor } = gameData;
      const { y_coor } = gameData;

      const { edge_carvature } = gameData;
      const { content } = gameData;

      for (let i = 0; i < gameData.num_nodes; i += 1) {
        const obj = {
          data: { id: i, label: `${gameData.content[i]} : ${i}` },
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
              'control-point-distance': -50 * edge_carvature[i][j],
              'line-color':
                content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
              'target-arrow-color':
                content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
            },
          };
          elements.push(obj);

          j += 1;
        }
      }
      setGraphData(elements);
      let ptr = 0;

      if (gameData.exp_to_display) {
        const exp = gameData.exp_to_display.map((item, index) => (
          <div>
            <div style={{ display: 'flex' }}>
              <h2>
                {index}..... {item} ::{' '}
              </h2>
              <Form.Item
                // label={`${item}`}
                name={item}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
                style={{ marginLeft: '20px' }}
              >
                <InputNumber />
              </Form.Item>
            </div>

            {evaluatedAnswer && evaluatedAnswer.correctResponse && (
              <div>
                <h1
                  style={{
                    color: evaluatedAnswer.correctResponse.includes(index)
                      ? 'green'
                      : 'red',
                  }}
                >
                  {evaluatedAnswer &&
                  evaluatedAnswer.correctResponse.includes(index) ? (
                    <img
                      src={TickMark}
                      style={{ width: '40px', height: '40px' }}
                    />
                  ) : (
                    <div>
                      <img
                        src={CrossMark}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <div>
                        Correct Node-ID: <span />
                        {evaluatedAnswer.wrongResponse[ptr++][1]}
                      </div>
                    </div>
                  )}
                </h1>
              </div>
            )}
          </div>
        ));

        setItems(exp);
      }
    }
  }, [gameData, evaluatedAnswer]);

  const prevLevel = () => {
    const lvl = parseInt(level);
    history.push(`/match-expression/${lvl - 1}`);
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    history.push(`/match-expression/${lvl + 1}`);
  };

  const onFinish = values => {
    const secs = end();
    const resp = [];

    for (const [key, value] of Object.entries(values)) {
      resp.push(value);
    }

    const response = {};
    gameData.response = resp;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.difficulty = level;
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

  let myCyRef;

  return (
    <div>
      <Helmet>
        <title>MatchExpressionGame</title>
        <meta name="description" content="Description of MatchExpressionGame" />
      </Helmet>

      <AppWrapper>
        <div style={{ display: 'flex', width: '100%', padding: '40px 10px' }}>
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
        {gameData && items ? (
          <Row
            style={{
              backgroundColor: '#F8FAA7',
              margin: '10px 50px 50px 50px',
              borderRadius: '10px',
              padding: '20px',
              paddingBlock: '40px',
            }}
          >
            <Col offset="2">
              <h1>Enter the Node Value for each Expression</h1>
              <div>
                {items && (
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
                  >
                    {items}
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={evaluatedAnswer}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </div>
            </Col>

            <Col offset="1">
              <h1>Graph</h1>

              <div>
                <CytoscapeComponent
                  elements={CytoscapeComponent.normalizeElements(graphData)}
                  // pan={{ x: 200, y: 200 }}
                  style={{
                    minWidth: '500px',
                    minHeight: '500px',
                    borderRadius: '5px',
                    border: '4px solid #999676',
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
                    console.log('EVT', cy);

                    cy.on('tap', 'node', evt => {
                      // var node = evt.target;
                    });
                  }}
                  abc={console.log('myCyRef', myCyRef)}
                />
              </div>
              <TimeClock active={!evaluatedAnswer} />
            </Col>
          </Row>
        ) : null}
      </AppWrapper>
    </div>
  );
}

MatchExpressionGame.propTypes = {
  matchExpressionGame: PropTypes.object,
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  matchExpressionGame: makeSelectMatchExpressionGame(),
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
)(MatchExpressionGame);
