/**
 *
 * DiscussNewThreadComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import CustomCard from 'components/CustomCard';


function DiscussNewThreadComponent(props) {
  return (
    <Row justify="center" style={{ padding: '10px', width: '100%' }}>
      <Col xs={{ span: 20 }} xl={{ span: 13 }}>
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
                label="Content:"
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="content of the thread"
                  rows={6}
                  showCount
                  maxLength="2000"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Post
              </Button>
            </div>
          </Form>
        </CustomCard>
      </Col>
    </Row>
  )
}

DiscussNewThreadComponent.propTypes = {};

export default memo(DiscussNewThreadComponent);
