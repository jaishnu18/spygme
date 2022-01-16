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
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';

const { Option } = Select;

function FormFindCrosswordNodes(props) {
  const [form] = Form.useForm();
  const Nodes = [
    { label: 'Across Node', val: 65 },
    { label: 'Down Node', val: 68 },
  ];

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
                  style={{
                    width: '20%',
                    margin: '10px',
                  }}
                  onClick={() => add()}
                  block
                >
                  Add Nodes
                </Button>
                <Button
                  style={{
                    width: '20%',
                    margin: '10px',
                  }}
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
    </div>
  );
}

FormFindCrosswordNodes.propTypes = {};

export default memo(FormFindCrosswordNodes);
