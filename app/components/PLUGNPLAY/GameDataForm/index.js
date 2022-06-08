/**
 *
 * GameDataForm
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';

function GameDataForm(props) {
  return (
    <div>
      <Form>
        <Form.Item
          label="Title:"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your Response!',
            },
          ]}
        >
          <Input onChange={e => {
            props.setGameTitle(e.target.value);
          }} />
        </Form.Item>
        <Form.Item
          label="Link:"
          name="link"
          valuePropName="a"
        >
          <Input readOnly value={props.gameTitle.toLowerCase().replace(' ', '-')} />
        </Form.Item>
        <Form.Item
          label="Description:"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your Response!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Levels:"
          name="levels"
          initialValue={1}
          rules={[
            {
              required: true,
              message: 'Please input your Response!',
            },
          ]}
        >
          <InputNumber max={4} min={1} />
        </Form.Item>
      </Form>
      <Input.TextArea readOnly={true}/>
    </div>
  )
}

GameDataForm.propTypes = {};

export default memo(GameDataForm);
