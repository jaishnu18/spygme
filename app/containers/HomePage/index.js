/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Collapse, Input, Col } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CoverPage1 from 'images/coverPage1.png';
import Email from 'images/email.png';
import Phone from 'images/phone.png';
import Location from 'images/location.png';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { sendMessageStart } from './actions';

const { Panel } = Collapse;

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const sendMessage = () => {
    const message = {};
    message.name = 'sfsf';
    console.log(message);
    props.sendMessage(message);
  }
  return (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>

      <div>
        <img src={CoverPage1} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
      <div
        style={{
          backgroundColor: '#6EA5C3',
          height: '240px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 50 }}>
          <b>What is it all about ?</b>
        </h1>
        <h2 style={{ color: 'white' }}>
          In today's world, AI has got diverse applications and is used in fields like Healthcare, Self-driving Cars, Agriculture and so on.
          We want you to start learning AI from the very basic concepts so that you can build a strong foundation and have no problem while understanding more advanced stuffs.
          Don't worry!! We don't give lecture videos and take exams. We use AI to teach you AI. You will learn each and every concept while playing interesting games and reading short reading materials.
        </h2>
      </div>

      <div
        style={{
          backgroundColor: '#414A50',
          height: '120px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 50, color: 'white' }}>
          <b>Frequenty Asked questions (FAQs)</b>
        </h1>
      </div>
      <Collapse accordion style={{ backgroundColor: '#C4C4C4' }}>
        <Panel
          header="I have no prior knowledge of Artificial Intelligence. Can I solve the problems ?"
          key="1"
        >
          <p>
            No prior knowledge of AI is required. You will get to learn each
            concept by playing games accompanied by short reading materials
          </p>
        </Panel>
        <Panel
          header="Is there any backward free nevigation so I can revisit my question that has been previously attempted ? "
          key="2"
        >
          <p>Answer2</p>
        </Panel>
        <Panel header="Does it help in my school exam as well ?" key="3">
          <p>It does not help you directly in your school curriculum. But learning on our platform can improve your logical thinking skills, make you smarter than others and this may indirectly influence your performance in school exams</p>
        </Panel>
      </Collapse>

      <div style={{ backgroundColor: '#F8FAA7', textAlign: 'center' }}>
        <h1 style={{ fontSize: 50 }}>
          <b>Have some questions?</b>
        </h1>
        <h3>
          <img src={Phone} style={{ height: '15px' }} /> Phone :1203222090
        </h3>
        <h3>
          <img src={Email} style={{ height: '15px' }} /> Email :
          aiforschool@gmail.com
        </h3>
        <h3>
          <img src={Location} style={{ height: '15px' }} /> Address : Indian
          institute of technology kharagpur,721302
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
              <Input placeholder='your name' />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Response!',
                },
              ]}
              style={{ marginLeft: '20px', width: '400px' }}
            >
              <Input placeholder='your email' />
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
              <Input placeholder='your phone' />
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
              <Input.TextArea placeholder='your message' rows={6} />
            </Form.Item>
          </div>
        </div>
        <Button type='primary' onClick={sendMessage}>Send Message</Button>

      </div>
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
