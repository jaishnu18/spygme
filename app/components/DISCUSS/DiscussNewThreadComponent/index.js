/**
 *
 * DiscussNewThreadComponent
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import CustomCard from 'components/CustomCard';
import Select from 'antd/lib/select';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { Option } = Select;

function DiscussNewThreadComponent(props) {
  const { concepts } = props;
  console.log(concepts);

  return (
    <Row justify="center" style={{ padding: '10px', width: '100%' }}>
      <Col span={24}>
        <CustomCard width="100%">
          <Form name="NewThreadForm" onFinish={props.submit}>
            <div>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input placeholder="title of the thread" />
              </Form.Item>
              <Form.Item
                label="Tag:"
                name="tags"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Filter by tag"
                  optionFilterProp="children"
                  onChange={props.onFilter}
                  style={{ width: '100%' }}
                  allowClear
                >
                  {concepts &&
                    concepts.map((key, idx) => (
                      <Option value={key.name}>{key.name}</Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Content:"
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Editor
                  placeholder="Enter the details of the thread"
                  editorState={props.editorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  onEditorStateChange={props.onEditorStateChange}
                />
                {/* <Input.TextArea
                  placeholder="details of the thread"
                  rows={6}
                  showCount
                  maxLength="2000"
                /> */}
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Post
              </Button>
            </div>
          </Form>
        </CustomCard>
      </Col>
    </Row>
  );
}

DiscussNewThreadComponent.propTypes = {};

export default memo(DiscussNewThreadComponent);
