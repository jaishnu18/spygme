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
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import QuerySection from '../../components/HomePage/QuerySection';
import Typography from 'antd/lib/typography';
import Divider from 'antd/lib/divider';
import { sendMessageStart } from './actions';
import FaqSection from '../../components/HomePage/FaqSection';
import Timeline from 'antd/lib/timeline';
import Image from 'antd/lib/image';

const { Panel } = Collapse;
const { Title } = Typography;
const { Paragraph } = Typography;

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
        <Col
          span={24}
        >
          <Timeline mode='alternate'>
            <Timeline.Item label="Read short reading materials"><Image style={{ height: '200px', width: '496px' }} preview={false} src={require("images/Screenshot_ReadMat.png")} /></Timeline.Item>
            <Timeline.Item label="Play practice games as much as you want"><Image style={{ height: '200px', width: '512px' }} preview={false} src={require("images/Screenshot_Game.png")} /></Timeline.Item>
            <Timeline.Item label="Attempt graded tests based on what you played during practice"><Image style={{ height: '200px', width: '410px' }} preview={false} src={require("images/Screenshot_Graded.png")} /></Timeline.Item>
          </Timeline>
        </Col>
      </Row>
      <Divider />
      <Row>
        <FaqSection />
        <Divider />
        <QuerySection querySubmit={querySubmit} />
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
