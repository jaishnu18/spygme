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
import saga from './saga';
import reducer from './reducer';
import makeSelectAboutPage from './selectors';

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
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Title>Why this project?</Title>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'center' }}>
          <Col xs={{ span: 24 }} xl={{ span: 22 }}>
            <Paragraph style={{ textAlign: 'center' }}>
              This project was started by UG students of Indian Institute of
              Technology, Kharagpur with the hope that we can develop a platform
              where school students can learn fundamentals of Artificial
              Intelligence by playing interesting games instead of watching
              lectures. Currently the project is being carried out under the
              guidance of Prof. Partha P Chakrabarti of Computer Science & Engg.
              department, IIT Kharagpur and Rajiv Agarwal.
            </Paragraph>
          </Col>
        </Col>

        <Col
          span={24}
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Title>The Team</Title>
        </Col>

        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Row justify="center" gutter={[32, 50]} style={{ width: '100%' }}>
            <Col
              xs={{ span: 24 }}
              xl={{ span: 12 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Col xs={{ span: 24 }} xl={{ span: 12 }} style={{ padding: '0' }}>
                <CustomCard flex="flex" justifyContent="center">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar
                      size={200}
                      icon={
                        <Image
                          preview={false}
                          src="https://drive.google.com/uc?export=view&id=1puMfUqpYPp-IWkVNesnwG9_51WkOE86b"
                        />
                      }
                    />
                  </div>

                  <Title
                    style={{ marginTop: '20px', textAlign: 'center' }}
                    level={3}
                  >
                    Prof. Partha P Chakrabarti
                  </Title>
                  <Paragraph style={{ margin: '0', textAlign: 'center' }}>
                    Computer Science & Engineering
                  </Paragraph>
                  <Paragraph style={{ margin: '0', textAlign: 'center' }}>
                    IIT Kharagpur
                  </Paragraph>

                  <Row
                    style={{ marginTop: '16px', width: '100%' }}
                    justify="center"
                  >
                    <Col span={2}>
                      <a
                        href="http://cse.iitkgp.ac.in/~ppchak/"
                        target="__blank"
                      >
                        <Image
                          style={{ height: '25px', width: '25px' }}
                          preview={false}
                          src="https://upload.wikimedia.org/wikipedia/en/1/1c/IIT_Kharagpur_Logo.svg"
                        />
                      </a>
                    </Col>
                    <Col span={2} offset={1}>
                      <a
                        href="https://www.facebook.com/profile.php?id=100011897616155"
                        target="__blank"
                      >
                        <FacebookFilled style={{ fontSize: '27px' }} />
                      </a>
                    </Col>
                  </Row>
                </CustomCard>
              </Col>
            </Col>
            <Col
              xs={{ span: 24 }}
              xl={{ span: 12 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Col xs={{ span: 24 }} xl={{ span: 12 }} style={{ padding: '0' }}>
                <CustomCard flex="flex" justifyContent="center">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar
                      size={200}
                      icon={
                        <Image
                          preview={false}
                          src="https://drive.google.com/uc?export=view&id=1qmgpib1opai8BNPV_rSHe8NqexZd20k9"
                        />
                      }
                    />
                  </div>

                  <Title
                    style={{ marginTop: '20px', textAlign: 'center' }}
                    level={3}
                  >
                    Rajiv Agarwal
                  </Title>
                  <Paragraph style={{ margin: '0', textAlign: 'center' }}>
                    CEO & Co-Founder
                  </Paragraph>
                  <Paragraph style={{ margin: '0', textAlign: 'center' }}>
                    Edudigm
                  </Paragraph>

                  <Row
                    style={{ marginTop: '16px', width: '100%' }}
                    justify="center"
                  >
                    <Col span={2}>
                      <a
                        href="https://www.linkedin.com/in/rajivagarwal1/"
                        target="__blank"
                      >
                        <LinkedinFilled style={{ fontSize: '27px' }} />
                      </a>
                    </Col>
                    <Col span={2} offset={1}>
                      <a
                        href="https://www.facebook.com/rajiv.agarwal.509"
                        target="__blank"
                      >
                        <FacebookFilled style={{ fontSize: '27px' }} />
                      </a>
                    </Col>
                  </Row>
                </CustomCard>
              </Col>
            </Col>

            <Col
              xs={{ span: 24 }}
              xl={{ span: 12 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Col xs={{ span: 24 }} xl={{ span: 12 }} style={{ padding: '0' }}>
                <CustomCard flex="flex" justifyContent="center">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar
                      size={200}
                      icon={
                        <Image
                          preview={false}
                          src="https://drive.google.com/uc?export=view&id=1qFWbnFB2Cmn00-tQnJcxXDLNBPwD62Ue"
                        />
                      }
                    />
                  </div>

                  <Title
                    style={{ marginTop: '20px', textAlign: 'center' }}
                    level={3}
                  >
                    Bbiswabasu Roy
                  </Title>
                  <Paragraph style={{ margin: '0', textAlign: 'center' }}>
                    Electronics & Electrical Communication
                  </Paragraph>
                  <Paragraph style={{ margin: '0', textAlign: 'center' }}>
                    IIT Kharagpur
                  </Paragraph>

                  <Row
                    style={{ marginTop: '16px', width: '100%' }}
                    justify="center"
                  >
                    <Col span={2}>
                      <a
                        href="https://www.linkedin.com/in/bbiswabasu-roy-2437331a9/"
                        target="__blank"
                      >
                        <LinkedinFilled style={{ fontSize: '27px' }} />
                      </a>
                    </Col>
                    <Col span={2} offset={1}>
                      <a
                        href="https://www.facebook.com/bbiswabasu.roy.1/"
                        target="__blank"
                      >
                        <FacebookFilled style={{ fontSize: '27px' }} />
                      </a>
                    </Col>
                  </Row>
                </CustomCard>
              </Col>
            </Col>

            <Col
              xs={{ span: 24 }}
              xl={{ span: 12 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Col xs={{ span: 24 }} xl={{ span: 12 }} style={{ padding: '0' }}>
                <CustomCard flex="flex" justifyContent="center">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar
                      size={200}
                      icon={
                        <Image
                          preview={false}
                          src="https://drive.google.com/uc?export=view&id=1bGRYoZkGz2b68CYwv9fzStbIDZY61Dgw"
                        />
                      }
                    />
                  </div>

                  <Title
                    style={{ marginTop: '20px', textAlign: 'center' }}
                    level={3}
                  >
                    Prashant Jangid
                  </Title>
                  <Paragraph style={{ margin: '0', textAlign: 'center' }}>
                    Industrial & Systems Engineering
                  </Paragraph>
                  <Paragraph style={{ margin: '0', textAlign: 'center' }}>
                    IIT Kharagpur
                  </Paragraph>

                  <Row
                    style={{ marginTop: '16px', width: '100%' }}
                    justify="center"
                  >
                    <Col span={2}>
                      <a
                        href="https://www.facebook.com/prashant.jangid.779642"
                        target="__blank"
                      >
                        <LinkedinFilled style={{ fontSize: '27px' }} />
                      </a>
                    </Col>
                    <Col span={2} offset={1}>
                      <a
                        href="https://www.facebook.com/prashant.jangid.779642"
                        target="__blank"
                      >
                        <FacebookFilled style={{ fontSize: '27px' }} />
                      </a>
                    </Col>
                  </Row>
                </CustomCard>
              </Col>
            </Col>
          </Row>
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
