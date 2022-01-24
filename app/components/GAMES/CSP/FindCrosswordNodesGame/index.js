/**
 *
 * FindCrosswordNodesGame
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Col from 'antd/lib/col';
import Title from 'antd/lib/typography/Title';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';
import Crossword from 'components/Crossword';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Row from 'antd/lib/row';
// import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import notification from 'antd/lib/notification';

const { Option } = Select;
function FindCrosswordNodesGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const [form] = Form.useForm();

  const Nodes = [
    { label: 'Across Node', val: 65 },
    { label: 'Down Node', val: 68 },
  ];

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
          <Col xs={{ span: 24 }} xl={{ span: 12 }}>
            <Crossword grid={gameData.grid} />
          </Col>
          <Col span={10} offset={2}>
            <Form
              form={form}
              name={`Form-${props.ID || ''}`}
              onFinish={value => {
                console.log('hereu');
                props.setValue(value);
                props.submit(value);
              }}
              initialValues={props.value}
              autoComplete="off"
            >
              <Form.List
                shouldUpdate
                name="nodes"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
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
                                  message: 'Direction Required',
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
                            {
                              required: true,
                              message: 'Row Required',
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
                              message: 'Column Required',
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
                    <Row
                      style={{ display: 'flex', justifyContent: 'flex-start' }}
                    >
                      <Button onClick={() => add()}>Add Nodes</Button>
                      <Button type="primary" htmlType="submit">
                        Check Answer
                      </Button>
                    </Row>
                  </>
                )}
              </Form.List>
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
                      <Descriptions.Item label="Correct Nodes">
                        {evaluatedAnswer.correct_nodes_list.map((key, idx) => (
                          <Col span={24}>
                            {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                          </Col>
                        ))}
                      </Descriptions.Item>
                      <Descriptions.Item label="Wrong Nodes">
                        {evaluatedAnswer.wrong_nodes_list.map((key, idx) => (
                          <Col span={24}>
                            {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                          </Col>
                        ))}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mised Nodes">
                        {evaluatedAnswer.missed_nodes_list.map((key, idx) => (
                          <Col span={24}>
                            {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                          </Col>
                        ))}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

FindCrosswordNodesGame.propTypes = {};

export default memo(FindCrosswordNodesGame);
