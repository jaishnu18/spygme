/**
 *
 * DrawCrosswordGraph
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Crossword from 'components/Crossword';

// import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import notification from 'antd/lib/notification';
import Paragraph from 'antd/lib/typography/Paragraph';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Title from 'antd/lib/typography/Title';

const { Option } = Select;

function DrawCrosswordGraph(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;

  const [form] = Form.useForm();

  return (
    <Row>
      {/* <Col xl={{ span: 12 }}>
        <Crossword gridSize={gameData.grid_size} grid={gameData.grid} />
      </Col> */}
      <Col
        xl={{ span: 24 }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Row>
          <Col span={12}>
            <Crossword grid={gameData.grid} />
          </Col>
          <Col span={10} offset={2}>
            <Form
              form={form}
              name="dynamic_form_nest_item"
              onFinish={values => {
                props.setValue(values);
                props.submit(values);
              }}
              initialValues={props.value}
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
                                {props.AcrossNodes.map((item, index) => (
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
                                {props.DownNodes.map((item, index) => (
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
                        Add Edge
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
                      {evaluatedAnswer.missed_edges_list.length === 0 ? (
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
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

DrawCrosswordGraph.propTypes = {};

export default memo(DrawCrosswordGraph);
