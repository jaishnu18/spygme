/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
import { WHITE, DARKBLACK } from 'utils/constants';
import Section from 'components/Section';
import H3 from 'components/atoms/H3';
import P from 'components/atoms/P';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';
import FacebookFilled from '@ant-design/icons/FacebookFilled';
import InstagramOutlined from '@ant-design/icons/InstagramFilled';
import WhatsAppOutlined from '@ant-design/icons/WhatsAppOutlined';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconsWrapper = styled.div`
  @media (max-width: 320px) {
    margin-right: -2px;
  }

  @media (min-width: 340px) and (max-width: 375px) {
    margin-left: 20px;
  }
`;
// current date
const currdate = new Date().getFullYear();

function Footer() {
  return (
    <footer>
      <Section padding="75px 25px" background={DARKBLACK}>
        <Row gutter={[32, 20]}>
          <Col
            xs={{ span: 10 }}
            md={{ span: 4 }}
            xl={{ span: 4, offset: 2 }}
            style={{ marginBottom: '28px' }}
          >
            <Link to="/">
              <h2
                style={{
                  fontWeight: 700,
                  margin: '0px',
                  color: '#fff',
                }}
              >
                AI4SCHOOLS
              </h2>
            </Link>
          </Col>

          <Col
            xs={{ span: 14 }}
            md={{ span: 6, offset: 14 }}
            xl={{ span: 4, offset: 12 }}
          >
            <IconsWrapper>
              <Link to={{ pathname: 'http://www.fb.com/' }} target="_blank">
                <Avatar
                  size={40}
                  style={{ backgroundColor: '#2666CF', margin: '0 5px 0 0' }}
                  icon={
                    <FacebookFilled
                      style={{
                        verticalAlign: 'middle',
                        color: '#fff',
                        marginBottom: '4px',
                        marginLeft: '1px',
                      }}
                    />
                  }
                />
              </Link>
              <Link
                to={{ pathname: 'http://www.instagram.com/' }}
                target="_blank"
              >
                <Avatar
                  size={40}
                  style={{ backgroundColor: '#5851D8', margin: '0 5px' }}
                  icon={
                    <InstagramOutlined
                      style={{
                        verticalAlign: 'middle',
                        color: '#fff',
                        marginBottom: '4px',
                        marginLeft: '1px',
                      }}
                    />
                  }
                />
              </Link>
              <Link to={{ pathname: 'http://wa.me/' }} target="_blank">
                <Avatar
                  size={40}
                  style={{ backgroundColor: '#128C7E', margin: '0 5px' }}
                  icon={
                    <WhatsAppOutlined
                      style={{
                        verticalAlign: 'middle',
                        color: '#fff',
                        marginBottom: '4px',
                        marginLeft: '1px',
                      }}
                    />
                  }
                />
              </Link>
            </IconsWrapper>
          </Col>
        </Row>
        <Row gutter={[32, 20]}>
          <Col sm={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 6, offset: 2 }}>
            <H3 color={WHITE}>Info</H3>
            <Link to="team">
              <P color={WHITE}>Contact Us</P>
            </Link>
            {/* <P color={WHITE}>Pricing</P> */}
            {/* <P color={WHITE}>Our Writers</P> */}
            <Link to="/discuss">
              <P color={WHITE}>FAQ</P>
            </Link>

            {/* <P color={WHITE}>Progressive Delivery</P> */}
            {/* <P color={WHITE}>Blog</P> */}
          </Col>

          <Col sm={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 7 }}>
            <H3 color={WHITE}>Terms</H3>
            <Link to="/policy/terms-of-service">
              <P color={WHITE}>Terms Of Service</P>
            </Link>
            <Link to="/policy/privacy-policy">
              <P color={WHITE}>Privacy Policy</P>
            </Link>
            <Link to="/policy/plagarism-free-guarantee">
              <P color={WHITE}>Social Responsibilty Policy</P>
            </Link>
          </Col>
          <Col sm={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 5 }}>
            <H3 color={WHITE}>Useful Links</H3>

            <Link to="/policy/money-back-guarantee">
              <P color={WHITE}>About Us</P>
            </Link>
            <Link to="/policy/cancellation">
              <P color={WHITE}>Our Team</P>
            </Link>

            {/* <P color={WHITE}>Revision Policy</P>
             <P color={WHITE}>Cookie Policy</P> */}
            <Link /* to="/policy/social-responsibility-policy" */ to="/discuss">
              <P color={WHITE}>FAQ</P>
            </Link>
          </Col>
        </Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px',
            width: '100%',
            color: 'white',
            fontSize: '18px',
          }}
        >
          &copy; {currdate} AI4Schools
        </div>
      </Section>
    </footer>
  );
}

Footer.propTypes = {};

export default memo(Footer);
