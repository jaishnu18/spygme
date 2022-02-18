/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Collapse from 'antd/lib/collapse';

import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CoverPage1 from 'images/coverPage1.png';

import Welcome from 'components/HomePage/Welcome';
import Typography from 'antd/lib/typography';
import Divider from 'antd/lib/divider';
import Timeline from 'antd/lib/timeline';
import Image from 'antd/lib/image';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import QuerySection from '../../components/HomePage/QuerySection';
import { sendMessageStart } from './actions';
import FaqSection from '../../components/HomePage/FaqSection';
import styled from 'styled-components';
import FacebookFilled from '@ant-design/icons/FacebookFilled';
import MailFilled from '@ant-design/icons/MailFilled';
import InstagramFilled from '@ant-design/icons/InstagramFilled';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';

const { Panel } = Collapse;
const { Title } = Typography;
const { Paragraph } = Typography;

const StyledImage = styled(Image)`
  height: 200px !important;
  width: 512px !important;

  @media (max-width: 768px) {
    height: 6vh !important;
    width: 15vh !important;
  }
`;

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const querySubmit = values => {
    props.sendMessage(values);
  };
  return (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>

      <Welcome />
      <Divider />
      <Row>
        <Col
          span={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Title style={{ textAlign: 'center' }}>How it works?</Title>
        </Col>
        <Col span={24} style={{ padding: '20px' }}>
          <Timeline mode="alternate">
            <Timeline.Item label="Read short reading materials">
              <StyledImage
                preview={false}
                src={require('images/Screenshot_ReadMat.png')}
              />
            </Timeline.Item>
            <Timeline.Item label="Play practice games as much as you want">
              <StyledImage
                preview={false}
                src={require('images/Screenshot_Game.png')}
              />
            </Timeline.Item>
            <Timeline.Item label="Attempt graded tests based on what you played during practice">
              <StyledImage
                preview={false}
                src={require('images/Screenshot_Graded.png')}
              />
            </Timeline.Item>
            <Timeline.Item label="Check your overall progress and proficiency on dashboard along with where you stand in the leaderboard">
              <StyledImage
                preview={false}
                src={require('images/Screenshot_Dashboard.png')}
              />
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
      <Divider />
      <FaqSection />
      <Divider />
      <QuerySection querySubmit={querySubmit} />
      <Row style={{ backgroundColor: '#333333', padding: '20px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <Col xl={{ span: '4', offset: '1' }} xs={{ span: '22', offset: '1' }} >
          <b style={{ color: 'white', fontSize:'20px' }}>Connect with us</b><br />
          <a href="mailto:contact@ai4schools.org" target="_blank">
            <MailFilled style={{ color: 'white', fontSize: '20px' }} />
          </a>
          <a href="https://www.facebook.com/AI4SchoolsOrg/" target="_blank">
            <FacebookFilled style={{ color: 'white', fontSize: '20px' }} />
          </a>
          <a href="https://www.instagram.com/ai4schoolsorg/" target="_blank">
            <InstagramFilled style={{ color: 'white', fontSize: '20px' }} />
          </a>
          <a href="/" target="_blank">
            <LinkedinFilled style={{ color: 'white', fontSize: '20px' }} />
          </a>
        </Col>
        <Col xl={{ span: '4', offset: '1' }} xs={{ span: '22', offset: '1' }} >
          <b style={{ color: 'white', fontSize:'20px' }}>Company</b><br />
          <a href="https://drive.google.com/file/d/1zNKhCimTiAaMcZRL92pvNw3X2d_0yyho/view?usp=sharing" target="_blank" style={{ color: 'white' }}>
            Terms and conditions
          </a><br />
          <a href="https://drive.google.com/file/d/1jnW3EwSc3jDCKrMaWYgZJI_yd_rjT_Cs/view?usp=sharing" target="_blank" style={{ color: 'white' }}>
            Privacy Policy
          </a><br />
          <a href="/about" target="_blank" style={{ color: 'white' }}>
            About us
          </a>
        </Col>
      </Row>
    </div>
  );
}

HomePage.propTypes = {
  homePage: PropTypes.object,
  sendMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: message => dispatch(sendMessageStart(message)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
