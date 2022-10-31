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
import styled from 'styled-components';
import FacebookFilled from '@ant-design/icons/FacebookFilled';
import MailFilled from '@ant-design/icons/MailFilled';
import InstagramFilled from '@ant-design/icons/InstagramFilled';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import Section from 'components/Section';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import QuerySection from '../../components/HomePage/QuerySection';
import { sendMessageStart } from './actions';
import FaqSection from '../../components/HomePage/FaqSection';
import Footer from '../../components/Footer';
import ContactUs from '../../components/HomePage/ContactUs';
// import AboutUs from '../../components/HomePage/AboutUs';
import OurTeam from '../../components/HomePage/OurTeam';

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
      <Section padding="0px">
        <Welcome />
        {/* <AboutUs /> */}
        <OurTeam />
        <ContactUs />
        <Footer />
      </Section>
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
