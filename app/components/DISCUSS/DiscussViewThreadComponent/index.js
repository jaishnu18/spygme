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
import UpCircleOutlined from '@ant-design/icons/UpCircleOutlined';
import DownCircleOutlined from '@ant-design/icons/DownCircleOutlined';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';

function DiscussViewThreadComponent(props) {
  const { threadDetails } = props;
  console.log(props);
  return (
    <div style={{ padding: '20px' }}>
      <Row >
        <Col span={24}>
          <CustomCard
            title={threadDetails.threadDetails.title}
          >
            <Row>
              <Paragraph>
                {threadDetails.threadDetails.content}
              </Paragraph>
            </Row>
            <Row style={{ fontSize: '10px' }}>
              Author: {threadDetails.threadDetails.author}
            </Row>
            <Row>
              <Col>
                <Button shape='circle' icon={<UpCircleOutlined />} /> : {threadDetails.threadDetails.upvote}
              </Col>
              <Col offset={1}>
                <Button shape='circle' icon={<DownCircleOutlined />} /> : {threadDetails.threadDetails.downvote}
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
              <Input.TextArea
                placeholder="your comment"
                rows={2}
                showCount
                maxLength="500"
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
          <Row>
            <Col span={24}>
              {key.author}: {key.content}
            </Col>
          </Row>
        ))
      }
    </div >
  )
}

DiscussViewThreadComponent.propTypes = {};

export default memo(DiscussViewThreadComponent);
