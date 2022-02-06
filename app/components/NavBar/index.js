/**
 *
 * NavBar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
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

import FrownOutlined from '@ant-design/icons/FrownOutlined';
import MehOutlined from '@ant-design/icons/MehOutlined';
import SmileOutlined from '@ant-design/icons/SmileOutlined';

const customIcons = {
  1: <FrownOutlined style={{ fontSize: '40px' }} />,
  2: <FrownOutlined style={{ fontSize: '40px' }} />,
  3: <MehOutlined style={{ fontSize: '40px' }} />,
  4: <SmileOutlined style={{ fontSize: '40px' }} />,
  5: <SmileOutlined style={{ fontSize: '40px' }} />,
};

const { Header } = Layout;

function NavBar(props) {
  const AuthData = useAuth();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [rating, setRating] = useState(3);

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
              backgroundColor: 'white',
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
                  <H4>AI For Schools</H4>
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
                    <Menu
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
                        onClick={() => history.push('/my/profile')}
                      >
                        Profile
                      </Menu.Item>
                      <Menu.Item key="4" onClick={showLogoutModal}>
                        Logout
                      </Menu.Item>
                    </Menu>
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
                        character={({ index }) => customIcons[index + 1]}
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
                    <Menu
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
                    </Menu>
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
