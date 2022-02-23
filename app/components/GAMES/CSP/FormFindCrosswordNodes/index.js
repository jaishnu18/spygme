/**
 *
 * FormFindCrosswordNodes
 *
 */

import React, { memo, useEffect, useRef } from 'react';
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

  const myRefname = useRef(null);

  const submitForm = () => {
    myRefname.current.click();
  };

  return (
    <div>
      <Form
        form={props.form}
        name={`Form-${props.currentLevel}`}
        onFinish={values => {
          const org = props.value;
          org[props.currentLevel] = values;
          props.setValue(org);
        }}
        onChange={submitForm}
        initialValues={props.value[props.currentLevel]}
        autoComplete="off"
        style={{ display: 'flex', flexDirection: 'column' }}
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
                      >
                        <Select style={{ width: 130 }} onChange={submitForm}>
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
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={index >= 0 ? 'Column' : ''}
                    name={[field.name, 'col']}
                    fieldKey={[field.fieldKey, 'col']}
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
                <Button
                  style={{ display: 'none' }}
                  ref={myRefname}
                  type="primary"
                  htmlType="submit"
                >
                  Save Answer
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
