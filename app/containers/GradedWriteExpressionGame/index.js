/**
 *
 * GradedWriteExpressionGame
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AppWrapper from 'components/AppWrapper';
import { Button, Col, Row, Form, InputNumber, Input } from 'antd';
import CytoscapeComponent from 'react-cytoscapejs';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGradedWriteExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getGamesDataStart, evaluateResponseStart } from './actions';
import CountDownTimer from 'components/CountDownTimer';


const Navigator = props => (
  <div
    style={{
      width: '400px',
      height: '400px',
      backgroundColor: 'lightgrey',
      display: 'flex',
      padding: '20px',
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
          backgroundColor: !props.markedForReview[j]
            ? props.visited[j]
              ? props.attempted[j]
                ? 'green'
                : 'red'
              : 'lightgrey'
            : 'purple',
          border:
            props.markedForReview[j] && props.attempted[j]
              ? '5px solid lightgreen'
              : '1px solid black',
        }}
        onClick={() => {
          const X = props.visited;
          X[j] = 1;
          const { timeStamps } = props;
          const endTime = new Date();
          console.log(endTime);
          timeStamps[props.currLevel].push(endTime);
          timeStamps[j].push(endTime);
          console.log(timeStamps);

          props.setTimeStamps(timeStamps);
          props.setVisited(X);
          props.setCurrLevel(j);
        }}
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
export function GradedWriteExpressionGame(props) {
  useInjectReducer({ key: 'gradedWriteExpressionGame', reducer });
  useInjectSaga({ key: 'gradedWriteExpressionGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [graphData, setGraphData] = useState(undefined);
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
    console.log(currLevel);
    if (gameData && currLevel >= 0) {
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
            label: `${gameData[currLevel].content[i]}`,
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
      setGraphData(elements);

      if (!responses) {
        const R = [];
        for (let i = 0; i < gameData.length; i += 1) {
          R.push(' ');
        }
        setResponses(R);
      }
    }
  }, [currLevel]);

  useEffect(() => {
    console.log(timeStamps);
  }, [timeStamps]);
  console.log(timeStamps);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (isExamOver) {
      const T = timeStamps;
      T[currLevel].push(new Date());
      setTimeStamps(T);
      submitTest();
    }
  }, [isExamOver]);

  const { gameData } = props.gradedWriteExpressionGame;
  const { evaluatedAnswer } = props.gradedWriteExpressionGame;

  const handleChange = e => {
    const { id } = e.target;
    const myArr = id.split('-');
    const row = parseInt(myArr[0]);
    const col = parseInt(myArr[1]);

    const R = [...responses];
    R[row - 1] = e.target.value;
    setResponses(R);

    const demoAttempted = attempted;
    demoAttempted[row - 1] = 1;
    setAttempted(demoAttempted);
    submitTest();
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
  const formFields = () => {
    switch (currLevel) {
      default:
        let ptr1 = 0;
        return (
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
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Enter your expression"
                name="1"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input id='1'/>
              </Form.Item>
            </Form>
          </div>
        );
      case 1:
        let ptr2 = 0;
        return (
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
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Enter your expression"
                name="2"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input id='2'/>
              </Form.Item>
            </Form>
          </div>
        );
      case 2:
        let ptr3 = 0;
        return (
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
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Enter your expression"
                name="3"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input id='3'/>
              </Form.Item>
            </Form>
          </div>
        );
      case 3:
        let ptr4 = 0;
        return (
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
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Enter your expression"
                name="4"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input id='4'/>
              </Form.Item>
            </Form>
          </div>

        );
    }
  };
  let myCyRef;
  return (
    <div>
      <Helmet>
        <title>GradedWriteExpressionGame</title>
        <meta
          name="description"
          content="Description of GradedWriteExpressionGame"
        />
      </Helmet>
      <AppWrapper>
        <div style={{ width: '100%', background: '#295474', padding: 20 }}>
          <Row justify="space-around">
            <Col span={4}>
              <h1 style={{ color: 'white' }}>Write Expression</h1>
            </Col>
            <Col span={4}>
              <h1 style={{ color: 'white' }}>Level: {currLevel + 1 ? currLevel + 1 : 0} / 4</h1>
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
            }}
          >
            <Col style={{ marginLeft: '20px' }}>
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
                    maxZoom={2}
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
                      cy.on('tap', 'node', evt => {
                        // var node = evt.target;
                      });
                    }}
                  />
                )}
              </div>
              <div style={{ display: 'flex' }}>
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
              </div>
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
              {/* {evaluatedAnswer && } */}
            </Col>
            <Col style={{ marginLeft: 'auto', marginRight: '20px' }}>
              <Navigator
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
            <pre>{`
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

GradedWriteExpressionGame.propTypes = {
  gradedWriteExpressionGame: PropTypes.object,
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  gradedWriteExpressionGame: makeSelectGradedWriteExpressionGame(),
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
)(GradedWriteExpressionGame);
