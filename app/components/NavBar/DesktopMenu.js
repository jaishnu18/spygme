/**
 *
 * DesktopMenu
 *
 */

import React, { createRef, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import styled from 'styled-components';
import RunIcon from 'images/run.png';
import Icons from 'components/IconBox';
import { Link as ScrollLink } from 'react-scroll';

import {
  getHighlightedIndexLoggedIn,
  getHighlightedIndexLoggedOut,
} from 'utils/navbarHighlighter';

import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router-dom';
import {
  HOME,
  DASHBOARD,
  LEARN,
  DISCUSS,
  PROFILE,
  LEADERBOARD,
  ABOUT_US,
} from './consts';

const StyledMenu = styled(Menu)`
  background-color: var(--primaryColor) !important;
  margin-top: 0px;
  font-weight: 700;
  font-size: 18px;
  color: var(--bgColor);

  border-bottom: 0;
  svg {
    font-size: 20px !important;
    font-weight: 700 !important;
  }

  .ant-menu-item::hover {
    color: var(--bgColor) !important;
    borderbottom: 1px solid var(--bgColor) !important;
  }
`;

function DesktopMenu(props) {
  const ref1 = createRef();
  if (props.AuthData.isLoggedIn) {
    return (
      <React.Fragment>
        <Col
          xs={{ span: 2 }}
          sm={{ span: 2 }}
          md={{ span: 16 }}
          lg={{ span: 15 }}
          xl={{ span: 14 }}
        >
          <StyledMenu
            mode="horizontal"
            selectedKeys={[getHighlightedIndexLoggedIn(props.history)]}
          >
            <Menu.Item key="1" onClick={() => history.push('/dashboard')}>
              {DASHBOARD}
            </Menu.Item>
            <Menu.Item key="2" onClick={() => history.push('/topics')}>
              {LEARN}
            </Menu.Item>
            <Menu.Item key="3" onClick={() => history.push('/discuss')}>
              {DISCUSS}
            </Menu.Item>

            <Menu.Item key="4" onClick={() => history.push('/my/profile')}>
              {PROFILE}
            </Menu.Item>
            <Menu.Item key="5" onClick={() => history.push('/my/stats')}>
              {LEADERBOARD}
            </Menu.Item>
            <Menu.Item key="6" onClick={props.showLogoutModal}>
              Logout
            </Menu.Item>
          </StyledMenu>
        </Col>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Col
        xs={{ span: 2 }}
        sm={{ span: 2 }}
        md={{ span: 16 }}
        lg={{ span: 15 }}
        xl={{ span: 7 }}
        // style={{ display: 'flex' }}
      >
        <StyledMenu
          mode="horizontal"
          selectedKeys={[getHighlightedIndexLoggedOut(props.history)]}
        >
          <Menu.Item key="1">
            <ScrollLink
              ref={ref1}
              activeClass="active"
              to="about"
              spy
              smooth
              offset={-50}
              duration={500}
              style={{ color: 'white' }}
              onClick={() => {
                history.push('/');
              }}
            >
              {ABOUT_US}
            </ScrollLink>
          </Menu.Item>
          <Menu.Item key="2">
            <ScrollLink
              activeClass="active"
              to="team"
              spy
              smooth
              offset={-20}
              duration={500}
              style={{ color: 'white' }}
              onClick={() => history.push('/')}
            >
              Our Team
            </ScrollLink>
          </Menu.Item>
          <Menu.Item key="3">
            <ScrollLink
              activeClass="active"
              to="contact"
              spy
              smooth
              offset={-10}
              duration={500}
              // style={{ color: 'white' }}
              onClick={() => history.push('/')}
            >
              Contact Us
            </ScrollLink>
          </Menu.Item>
          <Menu.Item key="4" onClick={() => history.push('/auth')}>
            Sign In
          </Menu.Item>
        </StyledMenu>
      </Col>
      <Col
        xs={{ span: 0 }}
        lg={{ span: 3 }}
        xl={{ span: 2 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Button
          size="large"
          // icon={<Icons src={RunIcon} size="14px" />}
          style={{
            zIndex: 1006,
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <Icons src={RunIcon} size="22px" />
            <Link
              style={{
                color: 'var(--primaryColor)',
                marginLeft: '4px',
              }}
              to={props.AuthData.isLoggedIn ? '/dashboard' : '/auth'}
            >
              Get Started
            </Link>
          </div>
        </Button>
      </Col>
    </React.Fragment>
  );
}

DesktopMenu.propTypes = {};

export default memo(DesktopMenu);
