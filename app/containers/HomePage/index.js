/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Collapse } from 'antd';
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

const { Panel } = Collapse;

export function HomePage() {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

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
          height: '220px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 50 }}>
          <b>What is it all about ?</b>
        </h1>
        <h2 style={{ color: 'white' }}>
          Discover the platform that givies you the freedom to explore, learn
          and develop the basic knowledge of Artificial Intelligence from the
          scratch. Our motive is to provide the basic knowlege from the school
          level itself so that it can help in your future.{' '}
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
          <p>Answer3</p>
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
      </div>
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
