/**
 *
 * FindCrosswordNodesGame
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import AppStructure from 'components/AppStructure';

import {
  Form,
  InputNumber,
  Button,
  Space,
  Select,
  Col,
  Row,
  Typography,
  Collapse,
  Checkbox, Rate

} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TimeClock from 'components/TimeClock';
import makeSelectFindCrosswordNodesGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getGamesDataStart, evaluateResponseStart, putFeedbackStart } from './actions';

const { Panel } = Collapse;

const { Option } = Select;

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


const MyGrid = styled.div`
  width: ${props => props.size * 72}px;
  height: ${props => props.size * 72}px;
  .chessboard {
    width: 70px;
    height: 70px;
    border: 2px solid #333;
  }
`;

export function FindCrosswordNodesGame(props) {
  useInjectReducer({ key: 'findCrosswordNodesGame', reducer });
  useInjectSaga({ key: 'findCrosswordNodesGame', saga });

  const [startTime, setStartTime] = useState(0);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [isWWWModalVisible, setIsWWWModalVisible] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(errors.length).fill(false),
  );
  const [starValue, setStarValue] = useState(
    new Array(questions.length).fill(0),
  );
  const [qsWrong, setQsWrong] = useState(false);
  const [qsChanges, setQsChanges] = useState('');

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


  const { gameData } = props.findCrosswordNodesGame;
  const { evaluatedAnswer } = props.findCrosswordNodesGame;

  const { level } = props.match.params;
  const { gameId } = props.match.params;

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

  useEffect(() => {
    console.log('Hii');
    props.getGameData(level);
    start();
  }, [level]);

  const [form] = Form.useForm();

  const prevLevel = () => {
    const lvl = parseInt(level);
    form.resetFields(undefined);
    window.location.href = `/find-nodes/${gameId}/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    form.resetFields(undefined);
    window.location.href = `/find-nodes/${gameId}/${lvl + 1}`;
  };
  const backToConcepts = () => {
    window.location.href = `/concept/6`;
  };

  const Nodes = [
    { label: 'Across Node', val: 65 },
    { label: 'Down Node', val: 68 },
  ];

  const onFinish = values => {
    const secs = end();
    const response = {};
    
    gameData.response = values.nodes;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = level;
    gameData.gameId = gameId;
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>FindCrosswordNodesGame</title>
        <meta
          name="description"
          content="Description of FindCrosswordNodesGame"
        />
      </Helmet>
      <AppStructure
        heading="Find Crossword Nodes"
        level={'Level: ' + level + '/3'}
        attempt={gameData ? ' ' + gameData.attempt : ' 1'}
        evaluatedAnswer={evaluatedAnswer}
        divContent={
          <div
            style={{
              padding: '20px',
              background: '#F8FAA7',
              paddingBottom: '150px',
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
              <Button style={{ marginLeft: '10px' }} onClick={backToConcepts}>
                Back to Materials
              </Button>
              <div style={{ display: 'flex', width: '100%' }}>
                <Button
                  style={{ marginLeft: 'auto', marginRight: '30px' }}
                  onClick={prevLevel}
                  disabled={level == 1}
                >
                  Previous Level
                </Button>
                <Button
                  style={{ marginLeft: 'auto', marginRight: '30px' }}
                  onClick={nextLevel}
                  disabled={level == 3}
                >
                  Next Level
                </Button>
              </div>
            </div>
            {gameData ? (
              <Row>
                <Collapse
                  accordion
                  style={{ width: '100%' }}
                  defaultActiveKey={['1']}
                >
                  <Panel key="1" header="How to play?">
                    <p>{gameData ? gameData.gameDescription : ''}</p>
                  </Panel>
                </Collapse>
                <Col span={12}>
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
                </Col>

                <Col span={12}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'white',
                      margin: '20px',
                      paddingLeft: '20px',
                    }}
                  >
                    <h1 style={{ marginBottom: '30px' }}>Enter the nodes</h1>
                    <div style={{ width: '100%' }}>
                      <Form
                        form={form}
                        name="dynamic_form_nest_item"
                        onFinish={onFinish}
                        initialValues={{
                          nodes: [{ node: null, row: null, col: null }],
                        }}
                        autoComplete="off"
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
                                        label={index >= 0 ? 'Direction' : ''}
                                        name={[field.name, 'node']}
                                        fieldKey={[field.fieldKey, 'node']}
                                        rules={[
                                          {
                                            required: true,
                                            message: 'Missing Row',
                                          },
                                        ]}
                                      >
                                        <Select style={{ width: 130 }}>
                                          {Nodes.map((item, index) => (
                                            <Option
                                              key={index}
                                              value={item.val}
                                            >
                                              {item.label}
                                            </Option>
                                          ))}
                                        </Select>
                                      </Form.Item>
                                    )}
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    label={index >= 0 ? 'Row' : ''}
                                    name={[field.name, 'row']}
                                    fieldKey={[field.fieldKey, 'row']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing Row',
                                      },
                                    ]}
                                  >
                                    <InputNumber />
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    label={index >= 0 ? 'Column' : ''}
                                    name={[field.name, 'col']}
                                    fieldKey={[field.fieldKey, 'col']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing Column',
                                      },
                                    ]}
                                  >
                                    <InputNumber />
                                  </Form.Item>

                                  {index > 0 && (
                                    <MinusCircleOutlined
                                      onClick={() => remove(field.name)}
                                    />
                                  )}
                                </Space>
                              ))}
                              <Row>
                                {/* <Form.Item> */}
                                <Button
                                  style={{
                                    width: '20%',
                                    margin: '10px',
                                    color: 'white',
                                    background: '#C5C0AA',
                                  }}
                                  type="dashed"
                                  onClick={() => add()}
                                  block
                                >
                                  Add Nodes
                                </Button>
                                {/* </Form.Item> */}
                                {/*  */}
                                {/* <Form.Item offset="3"> */}
                                <Button
                                  style={{
                                    width: '20%',
                                    margin: '10px',
                                    background: 'green',
                                  }}
                                  type="primary"
                                  htmlType="submit"
                                >
                                  Check Answer
                                </Button>
                                {/* </Form.Item>                             */}
                              </Row>
                            </>
                          )}
                        </Form.List>
                      </Form>
                    </div>

                    <div>
                      {evaluatedAnswer && (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
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
                            Correct Answered Nodes
                            {evaluatedAnswer.correct_nodes_list.length === 0 ? (
                              <div style={{ marginLeft: '30px' }}> 0 </div>
                            ) : (
                              evaluatedAnswer.correct_nodes_list.map(item => (
                                <div style={{ display: 'flex' }}>
                                  <div> Row : {item[0]}</div>
                                  <div style={{ marginLeft: '20px' }}>
                                    {' '}
                                    Col : {item[1]}
                                  </div>
                                  <div style={{ marginLeft: '30px' }}>
                                    Node Direction :{' '}
                                    {item[2] === 65 ? 'Across' : 'Down'}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          <div
                            style={{
                              marginTop: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            Missing Nodes
                            {evaluatedAnswer.missed_nodes_list.length === 0 ? (
                              <div style={{ marginLeft: '30px' }}> 0 </div>
                            ) : (
                              evaluatedAnswer.missed_nodes_list.map(item => (
                                <div style={{ display: 'flex' }}>
                                  <div> Row : {item[0]}</div>
                                  <div style={{ marginLeft: '20px' }}>
                                    {' '}
                                    Col : {item[1]}
                                  </div>
                                  <div style={{ marginLeft: '30px' }}>
                                    Node Direction :{' '}
                                    {item[2] === 65 ? 'Across' : 'Down'}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          <div
                            style={{
                              marginTop: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            Wrong Nodes
                            {evaluatedAnswer.wrong_nodes_list.length === 0 ? (
                              <div style={{ marginLeft: '30px' }}> 0 </div>
                            ) : (
                              evaluatedAnswer.wrong_nodes_list.map(item => (
                                <div style={{ display: 'flex' }}>
                                  <div> Row : {item[0]}</div>
                                  <div style={{ marginLeft: '20px' }}>
                                    {' '}
                                    Col : {item[1]}
                                  </div>
                                  <div style={{ marginLeft: '30px' }}>
                                    Node Direction :{' '}
                                    {item[2] === 65 ? 'Across' : 'Down'}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
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

FindCrosswordNodesGame.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  findCrosswordNodesGame: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  findCrosswordNodesGame: makeSelectFindCrosswordNodesGame(),
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
)(FindCrosswordNodesGame);
