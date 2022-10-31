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
import parse from 'html-react-parser';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import CustomCard from '../../CustomCard';
import NavigationBar from '../../NavigationBar';
import useMediaQuery from '../../../utils/useMediaQuery';

function DiscussViewThreadComponent(props) {
  const { threadDetails } = props;
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <div style={{ padding: '20px' }}>
      <NavigationBar heading="View Threads" prevPageLink="/discuss" />
      <Row style={{ padding: '0 20px' }} justify={isDesktop && 'center'}>
        <Col xs={{ span: 24 }} xl={{ span: 12 }}>
          <CustomCard
            title={
              <H1 fontSize="24" fontWeight="500" style={{ padding: '4px' }}>
                {threadDetails.threadDetails.title}
              </H1>
            }
          >
            <Row style={{ marginBottom: '10px' }}>
              <Tag
                style={{
                  height: '40px',
                  // width: '40px',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {threadDetails.threadDetails.tags}
              </Tag>
            </Row>
            <Row style={{ marginBottom: '10px' }}>
              <div
                style={{
                  // height: '20px',
                  overflow: 'hidden',
                  fontSize: '20px',
                }}
              >
                {parse(threadDetails.threadDetails.content)}
              </div>
            </Row>
            <Row style={{ fontSize: '16px', marginBottom: '4px' }}>
              Author: {threadDetails.threadDetails.author}
            </Row>
            <Row style={{ fontSize: '16px', marginBottom: '10px' }}>
              Created at:{' '}
              {new Date(
                threadDetails.threadDetails.created_at,
              ).toLocaleString()}
            </Row>
            <Row>
              <Col style={{ fontSize: '16px' }}>
                <Button
                  shape="circle"
                  icon={
                    props.thread_user_upvoted ? (
                      <LikeFilled style={{ color: 'blue' }} />
                    ) : (
                      <LikeOutlined />
                    )
                  }
                  onClick={() => {
                    props.set_thread_user_upvoted(!props.thread_user_upvoted);
                    if (!props.thread_user_upvoted) {
                      props.updateVote(
                        0,
                        threadDetails.threadDetails.threadId,
                        1,
                      );
                      props.set_thread_upvote(props.thread_upvote + 1);
                    } else {
                      props.updateVote(
                        0,
                        threadDetails.threadDetails.threadId,
                        0,
                      );
                      props.set_thread_upvote(props.thread_upvote - 1);
                    }
                  }}
                />{' '}
                : {props.thread_upvote}
              </Col>
            </Row>
          </CustomCard>
        </Col>
      </Row>
      <Row style={{ padding: '20px' }} justify="center">
        <Col xs={{ span: 24 }} xl={{ span: 16 }}>
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
                editorStyle={{ fontSize: '18px' }}
                spellCheck
                placeholder="Enter your comment"
                editorState={props.editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={props.onEditorStateChange}
              />
            </Form.Item>
            <Button
              style={{ backgroundColor: 'var(--primaryColor)', color: 'white' }}
              htmlType="submit"
            >
              Post
            </Button>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        {threadDetails.comments.map((key, idx) => (
          <Col
            style={{
              padding: '20px',
              margin: '20px',
              // border: '1px solid black',
              backgroundColor: 'white',
              boxShadow:
                'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            }}
            xs={{ span: 24 }}
            xl={{ span: 16 }}
          >
            <P style={{ marginBottom: '8px' }}> {parse(key.content)}</P>
            <P fontsize="16"> {key.author}</P>
            <P fontsize="16">
              {' '}
              Created at: {new Date(key.created_at).toLocaleString()}
            </P>
            {props.comment_upvote && props.comment_user_upvoted && (
              <Col span={24}>
                <Button
                  shape="circle"
                  icon={
                    props.comment_user_upvoted[idx] ? (
                      <LikeFilled style={{ color: 'blue' }} />
                    ) : (
                      <LikeOutlined />
                    )
                  }
                  onClick={() => {
                    let arr = props.comment_user_upvoted;
                    arr[idx] = !arr[idx];
                    props.set_comment_user_upvoted(arr);
                    if (arr[idx]) {
                      props.updateVote(1, key.commentId, 1);
                      arr = props.comment_upvote;
                      arr[idx] += 1;
                      props.set_comment_upvote(arr);
                    } else {
                      props.updateVote(1, key.commentId, 0);
                      arr = props.comment_upvote;
                      arr[idx] -= 1;
                      props.set_comment_upvote(arr);
                    }
                  }}
                />
                : {props.comment_upvote[idx]}
              </Col>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
}

DiscussViewThreadComponent.propTypes = {};

export default memo(DiscussViewThreadComponent);
