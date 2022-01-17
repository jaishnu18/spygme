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
import Crossword from 'components/Crossword';

const { Option } = Select;

function FormFindCrosswordNodes(props) {
  console.log(props);
  const [form] = Form.useForm();
  const Nodes = [
    { label: 'Across Node', val: 65 },
    { label: 'Down Node', val: 68 },
  ];

  return (
    <Row>

      <Col xs={{ span: 24 }} xl={{ span: 10, offset: 1 }}>
        <Form
          form={form}
          name={`Form-${props.ID || ''}`}
          onFinish={value => {
            if (Array.isArray(props.value)) {
              const org = props.value;
              org[props.currentLevel] = value;
              props.setValue(org);
            } else {
              props.setValue(value);
              props.submit(value);
            }
          }}
          initialValues={props.value[props.currentLevel]}
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
                  <Button onClick={() => add()}>Add Nodes</Button>
                  <Button type="primary" htmlType="submit">
                    Check Answer
                  </Button>
                </Row>
              </>
            )}
          </Form.List>
        </Form>
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 11, offset: 1 }}>
        <Crossword grid={props.grid} />
      </Col>
    </Row>
  );
}

FormFindCrosswordNodes.propTypes = {};

export default memo(FormFindCrosswordNodes);
