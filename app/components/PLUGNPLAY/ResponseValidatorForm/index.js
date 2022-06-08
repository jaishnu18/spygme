/**
 *
 * ResponseValidatorForm
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

function ResponseValidatorForm(props) {
  return (
    <Form name="ResponseValidatorForm" onFinish={props.responseValidatorValidate}>
      <Row>
        <Paragraph code>studentResponse = responses given by student along with game instance data</Paragraph>
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
  )
}

ResponseValidatorForm.propTypes = {};

export default memo(ResponseValidatorForm);
