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
          <Col span={10} offset={1}>
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
                                  message: 'Missing Node',
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
                                  message: 'Missing Node',
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
                  type="primary"
                  htmlType="submit"
                >
                  Check Answer
                </Button>
              </Form.Item>
            </Form>
            {evaluatedAnswer && (
              <Row style={{ paddingTop: '10px' }}>
                <Col span={24} style={{ display: 'flex' }}>
                  {evaluatedAnswer.score === 1 ? (
                    <CheckCircleFilled
                      style={{ fontSize: '20px', color: 'green' }}
                    />
                  ) : (
                    <CloseCircleFilled
                      style={{ fontSize: '20px', color: 'red' }}
                    />
                  )}
                  <Paragraph style={{ paddingLeft: '10px' }}>
                    {evaluatedAnswer.score === 1
                      ? 'All are correct'
                      : 'All are not correct'}
                  </Paragraph>
                </Col>
                <Col span={24}>
                  <Title level={3}>
                    {`Score : ${Math.round(evaluatedAnswer.score * 100)}%`}
                  </Title>
                  <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                    <Descriptions layout="vertical" bordered>
                      <Descriptions.Item label="Correct Edges">
                        {evaluatedAnswer.correct_edges_list.map((key, idx) => (
                          <Col span={24}>
                            {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'} -> ${key[3]}-${key[4]}-${key[5] === 65 ? 'A' : 'D'}`}
                          </Col>
                        ))}
                      </Descriptions.Item>
                      <Descriptions.Item label="Wrong Edges">
                        {evaluatedAnswer.wrong_edges_list.map((key, idx) => (
                          <Col span={24}>
                            {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'} -> ${key[3]}-${key[4]}-${key[5] === 65 ? 'A' : 'D'}`}
                          </Col>
                        ))}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mised Edges">
                        {evaluatedAnswer.missed_edges_list.map((key, idx) => (
                          <Col span={24}>
                            {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'} -> ${key[3]}-${key[4]}-${key[5] === 65 ? 'A' : 'D'}`}
                          </Col>
                        ))}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Col>
              </Row>
            )}
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 11, offset: 1 }}>
            <Crossword grid={gameData.grid} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

DrawCrosswordGraph.propTypes = {};

export default memo(DrawCrosswordGraph);
