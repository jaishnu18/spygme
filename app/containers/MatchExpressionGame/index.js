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
  Modal,
  Input,
  Collapse,
  Checkbox,
  Rate
} from 'antd';
import moment from 'moment';
import AppWrapper from 'components/AppWrapper';
import GameRow from 'components/GameRow';
import history from 'utils/history';
import TickMark from 'images/tickmark.svg';
import CrossMark from 'images/cross.svg';
import TimeClock from 'components/TimeClock';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
// import labels from 'app/utils/constants/labels.js';
import makeSelectMatchExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';

import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

cytoscape.use(popper);

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

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

export function MatchExpressionGame(props) {
  useInjectReducer({ key: 'matchExpressionGame', reducer });
  useInjectSaga({ key: 'matchExpressionGame', saga });

  const { level } = props.match.params;
  const { gameId } = props.match.params;

  const [checkedState, setCheckedState] = useState(
    new Array(errors.length).fill(false),
  );
  const [starValue, setStarValue] = useState(
    new Array(questions.length).fill(0),
  );
  const [graphData, setGraphData] = useState(undefined);
  const [items, setItems] = useState(undefined);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [isWWWModalVisible, setIsWWWModalVisible] = useState(false);
  const [qsWrong, setQsWrong] = useState(false);
  const [qsChanges, setQsChanges] = useState('');
  // const [hover, setHover] = React.useState(-1);

  // const { Panel } = Collapse;
  useEffect(() => {
    console.log(qsChanges);
  }, [qsChanges]);

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
  function onChangeCheckbox(checkedValues) {
    let newArray = new Array(errors.length).fill(false);
    for (let i = 0; i < checkedValues.length; i += 1) {
      let ch = checkedValues[i][0];
      if (ch === 'S')
        newArray[0] = true;
      else if (ch === 'D')
        newArray[1] = true;
      else if (ch === 'K')
        newArray[2] = true;
      else if (ch === 'M')
        newArray[3] = true;
      else if (ch === 'A')
        newArray[4] = true;
      else
        newArray[5] = true;
    }
    setCheckedState(newArray);
  }

  useEffect(() => {
    props.getGameData(level);
    start();
  }, [level]);

  const { gameData } = props.matchExpressionGame;
  const { evaluatedAnswer } = props.matchExpressionGame;

  let myCyRef;
  function showNodeIDs() {
    for (let i = 0; i < gameData.num_nodes; i += 1) {
      const popper = myCyRef.getElementById(i).popper({
        content: () => {
          const div = document.createElement('h2');
          div.style.textAlign = 'left';
          div.style.paddingLeft = '1px';
          div.style.color = 'purple';
          div.style.border = '2px solid black';
          div.style.borderRadius = '2px';
          div.style.width = '40px';
          div.innerHTML = i;
          document.body.appendChild(div);
          return div;
        },
      });

      const update = () => {
        popper.update();
      };

      myCyRef.getElementById(i).on('position', update);

      myCyRef.on('pan zoom resize', update);
    }
  }

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
  useEffect(() => {
    if (gameData) {
      let ptr = 0;
      if (gameData.exp_to_display) {
        const exp = gameData.exp_to_display.map((item, index) => (
          <div>
            <div style={{ display: 'flex' }}>
              <h2>
                {index + 1}. {item} {' '}
              </h2>
              <Form.Item
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

  useEffect(() => {
    if (evaluatedAnswer) {
      showFeedbackModal();
      if (evaluatedAnswer.score !== 1)
        showWWWModal();
    }
  }, [evaluatedAnswer]);

  const prevLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/match-expression/${gameId}/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    window.location.href = `/match-expression/${gameId}/${lvl + 1}`;
  };
  const backToConcepts = () => {
    window.location.href = `/concept/5`;
  }

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
    gameData.level = level;
    gameData.gameId = gameId;
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div>
      <Helmet>
        <title>MatchExpressionGame</title>
        <meta name="description" content="Description of MatchExpressionGame" />
      </Helmet>
      <AppStructure
        heading="Match Expression with Node"
        level={"Level: " + level + "/4"}
        attempt={gameData ? " " + gameData.attempt : " 1"}
        evaluatedAnswer={evaluatedAnswer}
        divContent={
          <div
            style={{
              background: '#F8FAA7',
            }}
          >
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
                  disabled={level == 4}
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
                  <h1>Enter the Node ID for each Expression</h1>
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
                          showNodeIDs();
                          cy.on('tap', 'node', evt => {
                            var node = evt.target;
                          });
                        }}
                      />
                    </div>
                    {/*  */}
                  </div>
                </Col>
              </Row>
            ) : null}
          </div>
        } />
    </div >
  );
}

MatchExpressionGame.propTypes = {
  matchExpressionGame: PropTypes.object,
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  matchExpressionGame: makeSelectMatchExpressionGame(),
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
)(MatchExpressionGame);
