/**
 *
 * InstanceGeneratorForm
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Paragraph from 'antd/lib/typography/Paragraph';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';

function InstanceGeneratorForm(props) {
  return (
    <div>
      <Form name="InstanceGeneratorForm" onFinish={props.instanceGeneratorValidate}>
        <Row>
          <Paragraph code>levels = [</Paragraph>
          <Form.Item
            name="level_params"
          >
            <Input />
          </Form.Item>
          <Paragraph code>] // Enter parameters for each level</Paragraph>
        </Row>
        <Row>
          <Paragraph code>lvl = current level of game</Paragraph>
        </Row>
        <Row>
          <Form.Item
            name="main_code"
          >
            <Input.TextArea />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item name="export_vars">
            <Input />
          </Form.Item>
          <Paragraph code>// names of variables to be exported seperated by comma</Paragraph>
        </Row>
        <Row>
          <Button type="primary" htmlType="submit">
            Validate
          </Button>
        </Row>
      </Form>
      <Input.TextArea readOnly={true} value={props.instGenValResult}/>
    </div>
  )
}

InstanceGeneratorForm.propTypes = {};

export default memo(InstanceGeneratorForm);
