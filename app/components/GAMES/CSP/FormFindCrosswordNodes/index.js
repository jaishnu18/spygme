/**
 *
 * FormFindCrosswordNodes
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
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import Title from 'antd/lib/typography/Title';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';

const { Option } = Select;

function FormFindCrosswordNodes(props) {
  const [form] = Form.useForm();
  const Nodes = [
    { label: 'Across Node', val: 65 },
    { label: 'Down Node', val: 68 },
  ];
  const { evaluatedAnswer } = props;
  return (
    <div>
      <Form
        form={form}
        name={`Form-${props.ID || ''}`}
        onFinish={value => {
          console.log(props.value);
          if (Array.isArray(props.value)) {
            console.log('here');
            const org = props.value;
            org[props.currentLevel] = value;
            props.setValue(org);

            console.log(props.value);
          } else {
            props.setValue(value);
            props.submit(value);
          }
        }}
        initialValues={props.value}
        autoComplete="off"
      // onChange={value => console.log(value)}
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
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  )}
                </Space>
              ))}
              <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                  onClick={() => add()}
                >
                  Add Nodes
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Check Answer
                </Button>
              </Row>
            </>
          )}
        </Form.List>
      </Form>
      {evaluatedAnswer &&
        <Row style={{ paddingTop: '10px' }}>
          <Col span={24} style={{ display: 'flex' }}>
            {
              evaluatedAnswer.score === 1 ?
                <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                :
                <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />

            }
            <Paragraph style={{ paddingLeft: '10px' }}>{evaluatedAnswer.score === 1 ? "All are correct" : "All are not correct"}</Paragraph>
          </Col>
          <Col span={24}>
            <Title level={3}>{"Score : " + Math.round(evaluatedAnswer.score * 100) + "%"}</Title>
            <Col xl={{ span: 23 }} xs={{ span: 24 }}>
              <Descriptions layout="vertical" bordered>
                <Descriptions.Item label="Correct Nodes">
                  {
                    evaluatedAnswer.correct_nodes_list.map((key, idx) => (
                      <Col span={24}>
                        {key[0] + "-" + key[1] + "-" + (key[1] === 65 ? 'A' : 'D')}
                      </Col>
                    ))
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Wrong Nodes">
                  {
                    evaluatedAnswer.wrong_nodes_list.map((key, idx) => (
                      <Col span={24}>
                        {key[0] + "-" + key[1] + "-" + (key[1] === 65 ? 'A' : 'D')}
                      </Col>))
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Mised Nodes">
                  {
                    evaluatedAnswer.missed_nodes_list.map((key, idx) => (
                      <Col span={24}>
                        {key[0] + "-" + key[1] + "-" + (key[1] === 65 ? 'A' : 'D')}
                      </Col>))
                  }
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Col>
        </Row>
      }
    </div>
  );
}

FormFindCrosswordNodes.propTypes = {};

export default memo(FormFindCrosswordNodes);
