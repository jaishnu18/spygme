/**
 *
 * FormDrawCrosswordGraph
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
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

function FormDrawCrosswordGraph(props) {
  const { currentLevel } = props;
  return (
    <>
      <Form
        form={props.form}
        name={`Form-${props.ID || ''}`}
        onFinish={values => {
          console.log(values);
          const org = props.value;
          console.log(org);
          org[currentLevel] = values;
          props.setValue(org);
        }}
        initialValues={props.value[currentLevel]}
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
                          {props.AcrossNodes[currentLevel].map(
                            (item, index) => (
                              <Option key={index} value={item}>
                                {item}
                              </Option>
                            ),
                          )}
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
                          {props.DownNodes[currentLevel].map((item, index) => (
                            <Option key={index} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>

                  {index > 0 && (
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
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
          <Button style={{ width: '20%' }} type="primary" htmlType="submit">
            Check Answer
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

FormDrawCrosswordGraph.propTypes = {};

export default memo(FormDrawCrosswordGraph);
