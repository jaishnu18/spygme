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
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Title>Why this project?</Title>
          </Col>
          <Col span={24}>
            <Paragraph>
              This project was started by UG students of Indian Institute of Technology, Kharagpur with the hope that we can develop a platform where school
              students can learn fundamentals of Artificial Intelligence by playing interesting games instead of watching lectures. Currently the project is
              being carried out under the guidance of Prof. Partha P Chakrabarti of Computer Science & Engg. department, IIT Kharagpur and Rajiv Agarwal.
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Title>The team</Title>
          </Col>
        </Row>

        <Row>
          <Col xs={{ span: 22 }} xl={{ span: 8 }} offset={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CustomCard>
              <Avatar size={200} icon={<Image preview={false} src="https://drive.google.com/uc?export=view&id=1puMfUqpYPp-IWkVNesnwG9_51WkOE86b" />} />
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
              <Avatar size={200} icon={<Image preview={false} src="https://drive.google.com/uc?export=view&id=1qmgpib1opai8BNPV_rSHe8NqexZd20k9" />} />
              <Row>
                <Col>
                  <Title level={3}>Rajiv Agarwal</Title>
                  <Paragraph>CEO & Co-Founder</Paragraph>
                  <Paragraph>Edudigm</Paragraph>
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
              <Avatar size={200} icon={<Image preview={false} src="https://drive.google.com/uc?export=view&id=1qFWbnFB2Cmn00-tQnJcxXDLNBPwD62Ue" />} />
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
                  <Paragraph>Industrial & Systems Engineering</Paragraph>
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
