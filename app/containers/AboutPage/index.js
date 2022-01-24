/**
 *
 * AboutPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAboutPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Avatar from 'antd/lib/avatar/avatar';
import Image from 'antd/lib/image';
import CustomCard from 'components/CustomCard';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import FacebookFilled from '@ant-design/icons/FacebookFilled';
import { Link } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

export function AboutPage() {
  useInjectReducer({ key: 'aboutPage', reducer });
  useInjectSaga({ key: 'aboutPage', saga });

  return (
    <div>
      <Helmet>
        <title>AboutPage</title>
        <meta name="description" content="Description of AboutPage" />
      </Helmet>
      <Row style={{ padding: '40px' }}>
        <Row>
          <Col>
            <Paragraph>
              This project was started by UG students of Indian Institute of Technology, Kharagpur with the hope that we can develop a platform where school
              students can learn fundamentals of Artificial Intelligence by playing interesting games instead of watching lectures. Currently the project is
              being carried out under the guidance of Prof. Partha P Chakrabarti of Computer Science & Engg. department, IIT Kharagpur and Rajiv Agarwal.
            </Paragraph>
          </Col>
        </Row>
        <Col xs={{ span: 24 }} xl={{ span: 24 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CustomCard>
            <Avatar size={200} icon={<Image preview={false} />} />
            <Row>
              <Col>
                <Title level={3}>Prof. Partha P Chakrabarti</Title>
                <Paragraph>Computer Science & Enggineering</Paragraph>
                <Paragraph>IIT Kharagpur</Paragraph>
              </Col>
            </Row>
            <Row style={{ padding: '20px' }}>
              <Col span={12}>
                <a href="" target="__blank"><LinkedinFilled style={{ fontSize: '20px' }} /></a>
              </Col>
              <Col span={12}>
                <a href="" target="__blank"><FacebookFilled style={{ fontSize: '20px' }} /></a>
              </Col>
            </Row>
          </CustomCard>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 8 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CustomCard>
            <Avatar size={200} icon={<Image preview={false} />} />
            <Row>
              <Col>
                <Title level={3}>Bbiswabasu Roy</Title>
                <Paragraph>Electronics & Electrical Communication</Paragraph>
                <Paragraph>IIT Kharagpur</Paragraph>
              </Col>
            </Row>
            <Row style={{ padding: '20px' }}>
              <Col span={12}>
                <a href="https://www.linkedin.com/in/bbiswabasu-roy-2437331a9/" target="__blank"><LinkedinFilled style={{ fontSize: '20px' }} /></a>
              </Col>
              <Col span={12}>
                <a href="https://www.facebook.com/bbiswabasu.roy.1/" target="__blank"><FacebookFilled style={{ fontSize: '20px' }} /></a>
              </Col>
            </Row>
          </CustomCard>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 8 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CustomCard>
            <Avatar size={200} icon={<Image preview={false} />} />
            <Row>
              <Col>
                <Title level={3}>Prashant Jangid</Title>
                <Paragraph>Dept</Paragraph>
                <Paragraph>IIT Kharagpur</Paragraph>
              </Col>
            </Row>
            <Row style={{ padding: '20px' }}>
              <Col span={12}>
                <a href="" target="__blank"><LinkedinFilled style={{ fontSize: '20px' }} /></a>
              </Col>
              <Col span={12}>
                <a href="" target="__blank"><FacebookFilled style={{ fontSize: '20px' }} /></a>
              </Col>
            </Row>
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
}

AboutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  aboutPage: makeSelectAboutPage(),
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
)(AboutPage);
