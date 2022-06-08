/**
 *
 * DiscussViewThreadComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomCard from '../../CustomCard';
import Paragraph from 'antd/lib/typography/Paragraph';
import Button from 'antd/lib/button';
import LikeOutlined from '@ant-design/icons/LikeOutlined';
import LikeFilled from '@ant-design/icons/LikeFilled';
import LeftCircleOutlined from '@ant-design/icons/ArrowLeftOutlined';
import Input from 'antd/lib/input';
import Tag from 'antd/lib/tag';
import Form from 'antd/lib/form';
import { Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';

function DiscussViewThreadComponent(props) {
  const { threadDetails } = props;
  const parse = require('html-react-parser');

  return (
    <div style={{ padding: '20px' }}>
      <Row>
        <Link to='/discuss'>
          <Button shape='circle' icon={<LeftCircleOutlined />} type='primary' />
        </Link>
      </Row>
      <Row >
        <Col span={24}>
          <CustomCard
            title={threadDetails.threadDetails.title}
          >
            <Row>
              <Tag>
                {threadDetails.threadDetails.tags}
              </Tag>
            </Row>
            <Row>
              <div>
                {parse(threadDetails.threadDetails.content)}
              </div>
            </Row>
            <Row style={{ fontSize: '10px' }}>
              Author: {threadDetails.threadDetails.author}
            </Row>
            <Row style={{ fontSize: '10px' }} >
              Created at: {(new Date(threadDetails.threadDetails.created_at)).toLocaleString()}
            </Row>
            <Row>
              <Col>
                <Button shape='circle' icon={props.thread_user_upvoted ? <LikeFilled style={{ color: 'blue' }} /> : <LikeOutlined />}
                  onClick={() => {
                    props.set_thread_user_upvoted(!props.thread_user_upvoted);
                    if (!props.thread_user_upvoted) {
                      props.updateVote(0, threadDetails.threadDetails.threadId, 1);
                      props.set_thread_upvote(props.thread_upvote + 1);
                    }
                    else {
                      props.updateVote(0, threadDetails.threadDetails.threadId, 0);
                      props.set_thread_upvote(props.thread_upvote - 1);
                    }
                  }} /> : {props.thread_upvote}
              </Col>
            </Row>
          </CustomCard>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form name="CommentThreadForm" onFinish={props.submit}>
            <Form.Item
              label="Comment:"
              name="comment"
              rules={[
                {
                  required: true,
                  message: 'Please input your Response!',
                },
              ]}
            >
              <Editor
                placeholder="Enter your comment"
                editorState={props.editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={props.onEditorStateChange}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Form>
        </Col>
      </Row>
      {
        threadDetails.comments.map((key, idx) => (
          <Row style={{ padding: '10px', margin: '10px', border: '1px solid black', backgroundColor: 'white' }}>
            <Col style={{ justifyContent: 'center' }} xs={{ span: 24 }} xl={{ span: 3 }}>
              {key.author}
            </Col>
            <Col span={20}>
              {parse(key.content)}
            </Col>
            <Col span={24} style={{ fontSize: '10px' }}>
              Created at: {(new Date(key.created_at)).toLocaleString()}
            </Col>
            {props.comment_upvote && props.comment_user_upvoted &&
              (
                <Col span={24}>
                  <Button shape='circle' icon={props.comment_user_upvoted[idx] ? <LikeFilled style={{ color: 'blue' }} /> : <LikeOutlined />}
                    onClick={() => {
                      let arr = props.comment_user_upvoted;
                      arr[idx] = !arr[idx];
                      props.set_comment_user_upvoted(arr);
                      if (arr[idx]) {
                        props.updateVote(1, key.commentId, 1);
                        arr = props.comment_upvote;
                        arr[idx]++;
                        props.set_comment_upvote(arr);
                      }
                      else {
                        props.updateVote(1, key.commentId, 0);
                        arr = props.comment_upvote;
                        arr[idx]--;
                        props.set_comment_upvote(arr);
                      }
                    }} />
                  : {props.comment_upvote[idx]}
                </Col>
              )
            }
          </Row>
        ))
      }
    </div >
  )
}

DiscussViewThreadComponent.propTypes = {};

export default memo(DiscussViewThreadComponent);
