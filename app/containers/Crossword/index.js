/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/**
 *
 * Crossword
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';
import styled from 'styled-components';

import { Form, InputNumber, Button, Space, Select, Col, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrossword from './selectors';
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
export function Crossword(props) {
  useInjectReducer({ key: 'crossword', reducer });
  useInjectSaga({ key: 'crossword', saga });

  const { gameData } = props.crossword;
  const { evaluatedAnswer } = props.crossword;

  const { level } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
  }, [level]);

  if (evaluatedAnswer) {
    console.log(evaluatedAnswer);
  }

  if (gameData) {
    console.log(gameData.grid);
  }

  const [form] = Form.useForm();

  const prevLevel = () => {
    const lvl = parseInt(level);
    form.resetFields(undefined);
    window.location.href = `/find-nodes/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    form.resetFields(undefined);
    window.location.href = `/find-nodes/${lvl + 1}`;
  };

  const Nodes = [
    { label: 'Across Node', val: 65 },
    { label: 'Down Node', val: 68 },
  ];

  const onFinish = values => {
    const response = {};
    gameData.response = values.nodes;
    response.studentResponse = gameData;
    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>Crossword</title>
        <meta name="description" content="Description of Crossword" />
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
        {gameData ? (
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
                      i && (
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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ marginBottom: '30px' }}>Answer</h1>
                <div style={{ width: '100%' }}>
                  <Form
                    form={form}
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
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
                                    label={index >= 0 ? 'Node' : ''}
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
                                        <Option key={index} value={item.val}>
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
                                  { required: true, message: 'Missing Row' },
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
                                  { required: true, message: 'Missing Column' },
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
    </div>
  );
}

Crossword.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  crossword: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  crossword: makeSelectCrossword(),
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
)(Crossword);
