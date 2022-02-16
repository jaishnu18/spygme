/**
 *
 * QuerySection
 *
 */

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import React, { memo, useState } from 'react';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Email from 'images/email.png';
import Phone from 'images/phone.png';
import Location from 'images/location.png';
import Typography from 'antd/lib/typography';
import CustomCard from 'components/CustomCard';
import Image from 'antd/lib/image';
import Radio from 'antd/lib/radio';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const { Title } = Typography;
const { Paragraph } = Typography;


function QuerySection(props) {
  const [remaining, setRemaining] = useState(500);
  return (
    <Row justify="center" style={{ padding: '10px', width: '100%' }}>
      <Col span={24}>
        <Title style={{ textAlign: 'center' }}>Contact us</Title>
      </Col>
      <Col xs={{ span: 20 }} xl={{ span: 12 }}>
        <Paragraph>
          If you have any queries, please go through the FAQ's. For any other
          query feel free to fill the form below so that we can reach you out.
        </Paragraph>
      </Col>

      <Col xs={{ span: 20 }} xl={{ span: 13 }}>
        <CustomCard width="100%">
          <Form name="QueryForm" onFinish={props.querySubmit}>
            <div>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input placeholder="your name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { type: 'email', message: 'Please enter valid email!' },
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input placeholder="your email" />
              </Form.Item>
              <Form.Item
                label="I am a"
                name="who_are_you"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="Student">Student</Radio.Button>
                  <Radio.Button value="Teacher">Teacher</Radio.Button>
                  <Radio.Button value="Others">Others</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Query:"
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
              >
                <Input.TextArea placeholder="your message" rows={6} maxLength="500" onChange={(e)=>{setRemaining(500-e.target.value.length);}}/>
              </Form.Item>
              <Paragraph style={{float:'right'}}>
                {remaining+"/500"}
              </Paragraph>
            </div>
            <Button type="primary" htmlType="submit">
              Send Message
            </Button>
          </Form>
        </CustomCard>
      </Col>
    </Row>
  );
}

QuerySection.propTypes = {};

export default memo(QuerySection);
