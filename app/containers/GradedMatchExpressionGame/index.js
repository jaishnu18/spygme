/* eslint-disable radix */
/**
 *
 * GradedMatchExpressionGame
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes, { number } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Col, Row, Form, InputNumber, Input } from 'antd';

import CytoscapeComponent from 'react-cytoscapejs';
import CountDownTimer from 'components/CountDownTimer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AppWrapper from 'components/AppWrapper';
import CustomInput from 'components/atoms/CustomInput';
import TickMark from 'images/tickmark.svg';
import CrossMark from 'images/cross.svg';
import makeSelectGradedMatchExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getGamesDataStart, evaluateResponseStart } from './actions';

const Navigator = props => (
  <div
    style={{
      width: '400px',
      height: '400px',
      backgroundColor: 'lightgrey',
      display: 'flex',
      border: '2px solid black',
    }}
  >
    {[...Array(props.levels)].map((k, j) => (
      <Button
        style={{
          width: '40px',
          height: '40px',
          marginBottom: '0px',
          marginLeft: '42px',
          textAlign: 'right',
          backgroundColor: 'yellow',
        }}
        onClick={() => props.setCurrLevel(j)}
      >
        {j + 1}
      </Button>
    ))}
  </div>
);

const Timer = props => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(props.seconds);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) props.submitTest(props.responses);

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div>
      <h1>{timeLeft}</h1>
    </div>
  );
};

export function GradedMatchExpressionGame(props) {
  useInjectReducer({ key: 'gradedMatchExpressionGame', reducer });
  useInjectSaga({ key: 'gradedMatchExpressionGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [graphData, setGraphData] = useState(undefined);
  const [levels, setLevels] = useState(0);
  const [currLevel, setCurrLevel] = useState(undefined);
  const [duration, setDuration] = useState(45 * 60 * 1000);
  const [time, setTime] = useState(0);
  const responses = [];

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

  useEffect(() => {
    props.getGameData();
    start();
  }, []);

  useEffect(() => {
    if (gameData) {
      const elements = [];
      console.log(currLevel);
      const { x_coor } = gameData[currLevel];
      const { y_coor } = gameData[currLevel];

      const { edge_carvature } = gameData[currLevel];
      const { content } = gameData[currLevel];

      for (let i = 0; i < gameData[currLevel].num_nodes; i += 1) {
        const obj = {
          data: {
            id: i,
            label: `${gameData[currLevel].content[i]} : ${i}`,
          },
          position: {
            x: 100 * (x_coor[i] + 1),
            y: 100 * (y_coor[i] + 1),
          },
        };
        elements.push(obj);
      }
      const { adjList } = gameData[currLevel];
      for (let i = 0; i < gameData[currLevel].num_nodes; i += 1) {
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
    }
  }, [currLevel]);

  const { gameData } = props.gradedMatchExpressionGame;
  const { evaluatedAnswer } = props.gradedMatchExpressionGame;

  console.log(gameData);

  const handleChange = e => {
    console.log(responses);
    console.log(responses.length);
    if (!responses.length) {
      for (let i = 0; i < gameData.length; i += 1) {
        const myarr = [];
        for (let j = 0; j < gameData[i].exp_to_display.length; j += 1) {
          myarr.push(-1);
        }
        responses.push(myarr);
      }
    }
    const { id } = e.target;
    const myArr = id.split('-');
    const row = parseInt(myArr[0]);
    const col = parseInt(myArr[1]);
    console.log(responses);
    console.log(row, col);
    responses[row - 1][col] = parseInt(e.target.value);
  };

  const submitTest = () => {
    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = responses[i];
    }

    const res = {};
    res.studentResponse = gameData;
    props.checkStudentResponse(res);
  };

  if (evaluatedAnswer) {
    console.log(evaluatedAnswer);
  }

  const formFields = () => {
    switch (currLevel) {
      default:
        let ptr1 = 0;
        return gameData[0].exp_to_display.map((item, index) => (
          <div>
            <div style={{ display: 'flex' }}>
              <h2>
                {index + 1}. {item} ::{' '}
              </h2>
              <Form.Item
                // label={`${item}`}
                name={`1-${index}`}
                style={{ marginLeft: '20px' }}
              >
                <input
                  type="number"
                  id={`1-${index}`}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            {evaluatedAnswer && evaluatedAnswer[0].correctResponse && (
              <div>
                <h1
                  style={{
                    color: evaluatedAnswer[0].correctResponse.includes(index)
                      ? 'green'
                      : 'red',
                  }}
                >
                  {evaluatedAnswer &&
                  evaluatedAnswer[0].correctResponse.includes(index) ? (
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
                        {evaluatedAnswer[0].wrongResponse[ptr1++][1]}
                      </div>
                    </div>
                  )}
                </h1>
              </div>
            )}
          </div>
        ));
      case 1:
        let ptr2 = 0;
        return gameData[1].exp_to_display.map((item, index) => (
          <div>
            <div style={{ display: 'flex' }}>
              <h2>
                {index + 1}..... {item} ::{' '}
              </h2>
              <Form.Item
                // label={`${item}`}
                name={`2-${index}`}
                style={{ marginLeft: '20px' }}
              >
                <input
                  type="number"
                  id={`2-${index}`}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            {evaluatedAnswer && evaluatedAnswer[1].correctResponse && (
              <div>
                <h1
                  style={{
                    color: evaluatedAnswer[1].correctResponse.includes(index)
                      ? 'green'
                      : 'red',
                  }}
                >
                  {evaluatedAnswer &&
                  evaluatedAnswer[1].correctResponse.includes(index) ? (
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
                        {evaluatedAnswer[1].wrongResponse[ptr2++][1]}
                      </div>
                    </div>
                  )}
                </h1>
              </div>
            )}
          </div>
        ));
      case 2:
        let ptr3 = 0;
        return gameData[2].exp_to_display.map((item, index) => (
          <div>
            <div style={{ display: 'flex' }}>
              <h2>
                {index + 1}..... {item} ::{' '}
              </h2>
              <Form.Item
                // label={`${item}`}
                name={`3-${index}`}
                style={{ marginLeft: '20px' }}
              >
                <input
                  type="number"
                  id={`3-${index}`}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            {evaluatedAnswer && evaluatedAnswer[2].correctResponse && (
              <div>
                <h1
                  style={{
                    color: evaluatedAnswer[2].correctResponse.includes(index)
                      ? 'green'
                      : 'red',
                  }}
                >
                  {evaluatedAnswer &&
                  evaluatedAnswer[2].correctResponse.includes(index) ? (
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
                        {evaluatedAnswer[2].wrongResponse[ptr3++][1]}
                      </div>
                    </div>
                  )}
                </h1>
              </div>
            )}
          </div>
        ));
      case 3:
        let ptr4 = 0;
        return gameData[3].exp_to_display.map((item, index) => (
          <div>
            <div style={{ display: 'flex' }}>
              <h2>
                {index + 1}..... {item} ::{' '}
              </h2>
              <Form.Item
                // label={`${item}`}
                name={`4-${index}`}
                style={{ marginLeft: '20px' }}
              >
                <input
                  type="number"
                  id={`4-${index}`}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            {evaluatedAnswer && evaluatedAnswer[3].correctResponse && (
              <div>
                <h1
                  style={{
                    color: evaluatedAnswer[3].correctResponse.includes(index)
                      ? 'green'
                      : 'red',
                  }}
                >
                  {evaluatedAnswer &&
                  evaluatedAnswer[3].correctResponse.includes(index) ? (
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
                        {evaluatedAnswer[3].wrongResponse[ptr4++][1]}
                      </div>
                    </div>
                  )}
                </h1>
              </div>
            )}
          </div>
        ));
    }
  };
  let myCyRef;

  return (
    <div>
      <Helmet>
        <title>GradedMatchExpressionGame</title>
        <meta
          name="description"
          content="Description of GradedMatchExpressionGame"
        />
      </Helmet>
      <AppWrapper>
        <div style={{ display: 'flex', width: '100%', padding: '40px 10px' }}>
          <CountDownTimer
            maxHourDuration="60"
            duration={duration}
            time={time}
          />
          <Button onClick={submitTest} style={{ marginLeft: 'auto' }}>
            Submit Test
          </Button>
        </div>
        {gameData && (
          <Row style={{ padding: '40px', backgroundColor: 'whitesmoke' }}>
            <Col>
              <Navigator levels={gameData.length} setCurrLevel={setCurrLevel} />
            </Col>
            <Col offset="2">
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
              >
                {formFields}
              </Form>

              <div style={{ padding: '20px' }}>
                {graphData && (
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
                )}
              </div>
            </Col>
          </Row>
        )}
      </AppWrapper>
    </div>
  );
}

GradedMatchExpressionGame.propTypes = {
  gradedMatchExpressionGame: PropTypes.object,
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  gradedMatchExpressionGame: makeSelectGradedMatchExpressionGame(),
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
)(GradedMatchExpressionGame);
