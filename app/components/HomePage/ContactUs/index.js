/**
 *
 * ContactUs
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';

import LocationIcon from 'images/location.png';
import ContactIcon from 'images/contact.png';
import EmailIcon from 'images/email.png';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import useMediaQuery from '../../../utils/useMediaQuery';

const List = styled.div`
  border-bottom: 1px solid grey;
  widht: 100px;
  display: flex;
  padding: 8px;
  margin-bottom: ${props => props.marginbottom || '16px'};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;
const ContactInput = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: ${props => !props.isDesktop && '20px'} !important;
  padding: 24px;
  display: flex;
  height: 100%;
  width: 100% !important;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  ::placeholder {
    color: red !important;
    opacity: 1 !important;
  }
`;

function ContactUs() {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <Row id="contact" justify="center">
      <Col style={{ padding: '40px' }} span={24}>
        <H1
          margin="20"
          fontSize="50"
          textAlign="center"
          style={{ textShadow: '0.1em 0.1em 0 #c4ccc6' }}
        >
          Contact Us
        </H1>
        <H1 fontSize="20" margintop="20" textAlign="center">
          Have any queries? We are here to help you out!
        </H1>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 24 }}>
        <iframe
          title="Location: Contact Us"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8778.662380353502!2d87.30418168022473!3d22.316866034691923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d44048085d96d%3A0x44f7d693580b9569!2sDepartment%20of%20Computer%20Science%20%26%20Engineering!5e0!3m2!1sen!2sin!4v1662658918702!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </Col>
      <Row
        style={{
          padding: isDesktop ? '40px' : '40px 4px',
          width: isDesktop ? '75%' : '90%',
        }}
      >
        <Col xs={{ span: 24 }} lg={{ span: 7 }}>
          <div
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}
          >
            <H1 marginleft="4" fontSize="18px" marginbottom="20">
              Get in Touch
            </H1>
            <List>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icons src={LocationIcon} size="32px" />
              </div>
              <Info>
                <P fontweight="700">Location:</P>
                <P>CSE Department, IIT Kharagpur</P>
              </Info>
            </List>
            <List>
              <Icons src={EmailIcon} size="32px" />
              <Info>
                <P fontweight="700">Email:</P>
                <P>contact@ai4schools.org</P>
              </Info>
            </List>
            <List marginbottom="8px">
              <Icons src={ContactIcon} size="32px" />
              <Info>
                <P fontweight="700">Contact:</P>
                <P>+91-8005756750</P>
              </Info>
            </List>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16, offset: 1 }}>
          <ContactInput isDesktop={isDesktop}>
            <div style={{ display: isDesktop && 'flex' }}>
              <Input
                style={{ width: isDesktop ? '55%' : '100%' }}
                placeholder="Your Name"
              />
              <Input
                style={{
                  width: isDesktop ? '55%' : '100%',
                  marginLeft: isDesktop && '5%',
                  marginTop: !isDesktop && '12px',
                }}
                placeholder="Your Email"
              />
            </div>
            <div style={{ margin: '20px 0' }}>
              <Input placeholder="Subject" />
            </div>
            <Input.TextArea
              style={{ height: 'calc(100% - 80px)' }}
              placeholder="Message"
            />
          </ContactInput>
        </Col>
        <Col offset={isDesktop ? 15 : 18}>
          <Button
            size="large"
            style={{
              borderRadius: '4px',
              backgroundColor: 'var(--primaryColor)',
              margin: '40px 40px 0 0',
              color: 'var(--bgColor)',
            }}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Row>
  );
}

ContactUs.propTypes = {};

export default memo(ContactUs);
