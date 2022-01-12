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

import H4 from 'components/atoms/H4';
// import { WHITE } from 'utils/constants';
import { useAuth } from 'containers/App/AuthContext';
import history from 'utils/history';
import {
  getHighlightedIndexLoggedIn,
  getHighlightedIndexLoggedOut,
} from 'utils/navbarHighlighter';

const { Header } = Layout;

function NavBar(props) {
  const AuthData = useAuth();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };

  const handleSignout = () => {
    closeLogoutModal();
    props.signout();
  };

  const enabledRoutes = () => {
    if (history.location.pathname.startsWith('/match-expression')) {
      return false;
    }
    if (history.location.pathname.startsWith('/evaluate-expression')) {
      return false;
    }
    if (history.location.pathname.startsWith('/write-expression')) {
      return false;
    }
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
              zIndex: 1,
              boxShadow: '0 15px 40px rgb(16 8 3 / 8%)',
            }}
          >
            <Row
              style={{ alignItems: 'center', width: '100vw' }}
              gutter={[20, 0]}
            >
              <Col
                xs={{ span: 22 }}
                sm={{ span: 22 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
                xl={{ span: 7 }}
              >
                <H4>AI For School</H4>
              </Col>

              {AuthData.isLoggedIn ? (
                <React.Fragment>
                  <Col
                    xs={{ span: 2 }}
                    sm={{ span: 2 }}
                    md={{ span: 16 }}
                    lg={{ span: 18 }}
                    xl={{ span: 9, offset: 5 }}
                  >
                    <Menu
                      theme="light"
                      mode="horizontal"
                      // defaultSelectedKeys={[getHighlightedIndexLoggedIn()]}
                      style={{
                        marginTop: '0px',
                        fontWeight: 700,
                        fontSize: '15px',
                      }}
                    >
                      <Menu.Item key="1" onClick={() => history.push('/')}>
                        Home
                      </Menu.Item>

                      <Menu.Item
                        key="2"
                        onClick={() => history.push('/dashboard')}
                      >
                        Dashboard
                      </Menu.Item>
                      <Menu.Item
                        key="3"
                        onClick={() => history.push('/topics')}
                      >
                        Learn
                      </Menu.Item>

                      <Menu.Item
                        key="4"
                        onClick={() => history.push('/my/profile')}
                      >
                        Profile
                      </Menu.Item>
                      <Menu.Item key="5">About</Menu.Item>
                      <Menu.Item key="6" onClick={showLogoutModal}>
                        Logout
                      </Menu.Item>
                      <Modal
                        title="Logout"
                        visible={isLogoutModalVisible}
                        onOk={handleSignout}
                        onCancel={closeLogoutModal}
                      >
                        <p>Are you sure you want to logout?</p>
                      </Modal>
                    </Menu>
                  </Col>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Col
                    xs={{ span: 2 }}
                    sm={{ span: 2 }}
                    md={{ span: 16 }}
                    lg={{ span: 18 }}
                    xl={{ span: 6, offset: 9 }}
                  >
                    <Menu
                      theme="light"
                      mode="horizontal"
                      // defaultSelectedKeys={[getHighlightedIndexLoggedOut()]}
                      style={{
                        marginTop: '0px',
                        fontWeight: 700,
                        fontSize: '15px',
                      }}
                    >
                      <Menu.Item key="1" onClick={() => history.push('/')}>
                        Home
                      </Menu.Item>
                      <Menu.Item key="2">About</Menu.Item>
                      <Menu.Item key="3" onClick={() => history.push('/auth')}>
                        Sign In
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
