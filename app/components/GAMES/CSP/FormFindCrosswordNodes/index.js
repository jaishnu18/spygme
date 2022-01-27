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
// import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import notification from 'antd/lib/notification';

const { Option } = Select;

function FormFindCrosswordNodes(props) {
  const Nodes = [
    { label: 'Across Node', val: 65 },
    { label: 'Down Node', val: 68 },
  ];

  return (
    <div>
      <Form
        form={props.form}
        name={`Form-${props.ID || ''}`}
        onFinish={values => {
          console.log(values);
          const org = props.value;
          console.log(org);
          org[props.currentLevel] = values;
          props.setValue(org);
        }}
        initialValues={
          Array.isArray(props.value)
            ? props.value[props.currentLevel]
            : props.value
        }
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
                            validator(rule, value) {
                              if (!value) {
                                notification.open({
                                  message: `Oops! Missing Some Type ${props.currentLevel +
                                    1}`,
                                });
                              }
                            },
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
                        validator(rule, value) {
                          if (!value) {
                            // I'd like to use this instead:
                            notification.open({
                              message: `Oops! Missing Some Rows at Level ${props.currentLevel +
                                1}`,
                              // description:
                              //   'This is the content of the notification.',
                            });
                          }
                        },
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
                        validator(rule, value, callback) {
                          if (!value) {
                            // I'd like to use this instead:
                            notification.open({
                              message: `Oops! Missing Some Columns at Level ${props.currentLevel +
                                1}`,
                              // description:
                              //   'This is the content of the notification.',
                            });
                          }
                        },
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
                <Button onClick={() => add()}>Add Nodes</Button>
                <Button type="primary" htmlType="submit">
                  Check Answer
                </Button>
              </Row>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

FormFindCrosswordNodes.propTypes = {};

export default memo(FormFindCrosswordNodes);
