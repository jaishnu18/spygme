/**
 *
 * NavBar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Modal from 'antd/lib/modal';
import Rate from 'antd/lib/rate';

import H4 from 'components/atoms/H4';
// import { WHITE } from 'utils/constants';
import { useAuth } from 'containers/App/AuthContext';
import history from 'utils/history';
import {
  getHighlightedIndexLoggedIn,
  getHighlightedIndexLoggedOut,
} from 'utils/navbarHighlighter';
import { Link } from 'react-router-dom';

import Typography from 'antd/lib/typography';

import FrownFilled from '@ant-design/icons/FrownFilled';
import MehFilled from '@ant-design/icons/MehFilled';
import SmileFilled from '@ant-design/icons/SmileFilled';
import Title from 'antd/lib/typography/Title';
const HeartSvg = () => (
  <svg width="40px" height="40px" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const customIcons = {
  1: <HeartSvg style={{ fontSize: '40px' }} />,
  2: <FrownFilled style={{ fontSize: '40px' }} />,
  3: <MehFilled style={{ fontSize: '40px' }} />,
  4: <SmileFilled style={{ fontSize: '40px' }} />,
  5: <HeartSvg style={{ fontSize: '40px' }} />,
};

const { Header } = Layout;
const StyledMenu = styled(Menu)`
  background-color: #eaeaea;
  svg {
    font-size: 20px !important;
    font-weight: 700 !important;
  }
`;

function NavBar(props) {
  const AuthData = useAuth();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };

  const handleSignout = () => {
    closeLogoutModal();
    props.signout({ rating });
  };

  const enabledRoutes = () => {
    // if (history.location.pathname.startsWith('/match-expression')) {
    //   return false;
    // }
    // if (history.location.pathname.startsWith('/evaluate-expression')) {
    //   return false;
    // }
    // if (history.location.pathname.startsWith('/write-expression')) {
    //   return false;
    // }
    return true;
  };

  return (
    <React.Fragment>
      {enabledRoutes() && (
        <React.Fragment>
          <Header
            style={{
              backgroundColor: '#EAEAEA',
              position: 'fixed',
              width: '100vw',
              paddingRight: 0,
              zIndex: 999,
              boxShadow: '0 15px 40px rgb(16 8 3 / 8%)',
            }}
          >
            <Row
              style={{ alignItems: 'center', width: '100vw' }}
              gutter={[20, 0]}
            >
              <Col
                xs={{ span: 17 }}
                sm={{ span: 22 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
                xl={{ span: 7 }}
              >
                <Link to="/">
                  <Title level={3} style={{ marginBottom: '0' }}>
                    AI For Schools
                  </Title>
                </Link>
              </Col>

              {AuthData.isLoggedIn ? (
                <React.Fragment>
                  <Col
                    xs={{ span: 7 }}
                    sm={{ span: 2 }}
                    md={{ span: 16 }}
                    lg={{ span: 18 }}
                    xl={{ span: 10, offset: 5 }}
                  >
                    <StyledMenu
                      theme="light"
                      mode="horizontal"
                      defaultSelectedKeys={[
                        getHighlightedIndexLoggedIn(props.location),
                      ]}
                      style={{
                        marginTop: '0px',
                        fontWeight: 700,
                        fontSize: '15px',
                      }}
                    >
                      <Menu.Item
                        key="1"
                        onClick={() => history.push('/dashboard')}
                      >
                        Dashboard
                      </Menu.Item>
                      <Menu.Item
                        key="2"
                        onClick={() => history.push('/topics')}
                      >
                        Learn
                      </Menu.Item>
                      <Menu.Item
                        key="3"
                        onClick={() => history.push('/discuss')}
                      >
                        Discuss
                      </Menu.Item>

                      <Menu.Item
                        key="4"
                        onClick={() => history.push('/my/profile')}
                      >
                        Profile
                      </Menu.Item>
                      <Menu.Item key="5" onClick={showLogoutModal}>
                        Logout
                      </Menu.Item>
                    </StyledMenu>
                    <Modal
                      title="Logout"
                      visible={isLogoutModalVisible}
                      onOk={handleSignout}
                      onCancel={closeLogoutModal}
                    >
                      <Typography.Title level={5} type="warning">
                        Rate us!
                      </Typography.Title>
                      <Rate
                        defaultValue={rating}
                        // character={({ index }) => customIcons[index + 1]}
                        onChange={value => {
                          setRating(value);
                        }}
                      />
                      <Typography.Title
                        level={5}
                        type="primary"
                        style={{ marginTop: '20px' }}
                      >
                        Are you sure you want to logout?
                      </Typography.Title>
                    </Modal>
                  </Col>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Col
                    xs={{ span: 7 }}
                    sm={{ span: 2 }}
                    md={{ span: 16 }}
                    lg={{ span: 18 }}
                    xl={{ span: 8, offset: 7 }}
                  >
                    <StyledMenu
                      theme="light"
                      mode="horizontal"
                      defaultSelectedKeys={[
                        getHighlightedIndexLoggedOut(props.location),
                      ]}
                      style={{
                        marginTop: '0px',
                        fontWeight: 700,
                        fontSize: '15px',
                      }}
                    >
                      {/* <Menu.Item key="1" onClick={() => history.push('/')}>
                        Home
                      </Menu.Item> */}
                      <Menu.Item key="2" onClick={() => history.push('/about')}>
                        About Us
                      </Menu.Item>
                      <Menu.Item key="3" onClick={() => history.push('/auth')}>
                        Login/Register
                      </Menu.Item>
                    </StyledMenu>
                  </Col>
                </React.Fragment>
              )}
            </Row>
          </Header>
          <div style={{ height: '64px' }} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

NavBar.propTypes = {
  signout: PropTypes.func.isRequired,
};

export default memo(NavBar);
