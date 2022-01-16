/**
 *
 * QuerySection
 *
 */

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import React, { memo } from 'react';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Email from 'images/email.png';
import Phone from 'images/phone.png';
import Location from 'images/location.png';
import Typography from 'antd/lib/typography';
import CustomCard from 'components/CustomCard';
import Image from 'antd/lib/image';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const { Title } = Typography;
const { Paragraph } = Typography;
function QuerySection(props) {
  return (
    <Row style={{ padding: '10px', }}>
      <Col span={6} offset={9}>
        <Title>Contact us</Title>
      </Col>
      <Col span={10} offset={7}>
        <Paragraph>If you have any queries, please go through the FAQ's. For any other query feel free to fill the form below so that we can reach you out.</Paragraph>
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9, offset: 2 }}>
        <CustomCard>
          <h3>
            <img src={Phone} style={{ height: '15px' }} /> Phone :1203222090
          </h3>
          <h3>
            <Image src={Email} /> Email :
            aiforschool@gmail.com
          </h3>
          <h3>
            <img src={Location} style={{ height: '15px' }} /> Address : Indian
            institute of technology Kharagpur
          </h3>
        </CustomCard>
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9, offset: 2 }}>
        <CustomCard>
          <Form name="QueryForm" onFinish={props.querySubmit}>
            <div>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
                style={{ marginLeft: '20px', width: '400px' }}
              >
                <Input placeholder="your name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { type: 'email', message: 'Please enter valid email!' },
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
                style={{ marginLeft: '20px', width: '400px' }}
              >
                <Input placeholder="your email" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: false,
                  },
                ]}
                style={{ marginLeft: '20px', width: '400px' }}
              >
                <Input placeholder="your phone" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Response!',
                  },
                ]}
                style={{ marginLeft: '20px', width: '400px' }}
              >
                <Input.TextArea placeholder="your message" rows={6} />
              </Form.Item>
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
