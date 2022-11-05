/**
 *
 * NavBar
 *
 */

import React, { memo, useState, useEffect } from 'react';
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
import Logo from 'images/logoo.jpg';

import MenuIcon from 'images/hamburgerIcon.png';
import P from 'components/atoms/P';
import { GetSideMenuOptions } from './MenuOptions';
import MobileSlideMenu from './MobileSlideMenu';
import DesktopMenu from './DesktopMenu';
import useMediaQuery from '../../utils/useMediaQuery';
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

function NavBar(props) {
  const AuthData = useAuth();

  const isDesktop = useMediaQuery('(min-width: 960px)');

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [toggleSlideMenuState, setToggleSlideMenuState] = useState(false);

  const [rating, setRating] = useState(0);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    setToggleSlideMenuState(false);
  }, [props.history]);

  const showDrawer = () => {
    setToggleSlideMenuState(!toggleSlideMenuState);
  };

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

  const enabledRoutes = () =>
    // if (history.location.pathname.startsWith('/match-expression')) {
    //   return false;
    // }
    // if (history.location.pathname.startsWith('/evaluate-expression')) {
    //   return false;
    // }
    // if (history.location.pathname.startsWith('/write-expression')) {
    //   return false;
    // }
    true;
  return (
    <Wrapper>
      {enabledRoutes() && (
        <React.Fragment>
          <Header
            style={{ paddingLeft: !isDesktop ? '20px' : 'auto' }}
            className={show ? 'navbar-show' : 'navbar-show navbar-hidden'}
          >
            <Row
              style={{ alignItems: 'center', width: '100vw' }}
              gutter={[20, 0]}
            >
              <Col
                xs={{ span: isDesktop ? 22 : 23 }}
                sm={{ span: isDesktop ? 22 : 23 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
                xl={{ span: AuthData.isLoggedIn ? 7 : 14 }}
                style={{ display: 'flex' }}
              >
                <Link to="/">
                  <img
                    style={{ width: '170px', height: '60px' }}
                    alt="Logo"
                    src={Logo}
                  />
                </Link>
                {!isDesktop && (
                  <div
                    style={{
                      display: 'flex',
                      marginLeft: 'auto',
                      alignItems: 'center',
                    }}
                  >
                    <div onClick={showDrawer}>
                      <img
                        src={MenuIcon}
                        style={{
                          width: '30px',
                          height: '30px',
                          marginLeft: '8px',
                        }}
                        alt="order"
                      />
                    </div>
                  </div>
                )}
              </Col>
              {isDesktop ? (
                <DesktopMenu
                  showLogoutModal={showLogoutModal}
                  handleSignout={handleSignout}
                  isLogoutModalVisible={isLogoutModalVisible}
                  setIsLogoutModalVisible={setIsLogoutModalVisible}
                  AuthData={AuthData}
                  history={props.history}
                />
              ) : (
                <MobileSlideMenu
                  toggleSlideMenuState={toggleSlideMenuState}
                  setToggleSlideMenuState={setToggleSlideMenuState}
                  MenuOptions={GetSideMenuOptions(AuthData.isLoggedIn)}
                  toggleLogout={() => {
                    setIsLogoutModalVisible(true);
                  }}
                />
              )}
              <Modal
                title="Logout"
                visible={isLogoutModalVisible}
                onOk={handleSignout}
                onCancel={closeLogoutModal}
              >
                {/* <P>Rate Us</P> */}
                <P>Are you sure you want to logout?</P>
              </Modal>
            </Row>
          </Header>
          <div style={{ height: '80px' }} />
        </React.Fragment>
      )}
    </Wrapper>
  );
}

NavBar.propTypes = {
  signout: PropTypes.func.isRequired,
};

export default memo(NavBar);

const Wrapper = styled.div`
  .navbar-show {
    background-color: #0e387a;
    position: fixed;
    width: 100vw;
    padding-right: 0;
    z-index: 999;
    box-shadow: 0 15px 40px rgb(16 8 3 / 8%);
    height: 80px;
    display: flex;
    align-items: center;

    transition: transform 0.2s;
  }

  .navbar-hidden {
    transform: translateY(-80px);
    box-shadow: none;
  }

  .ant-menu-horizontal: not(.ant-menu-dark) > .ant-menu-item: hover,
    .ant-menu-horizontal: not(.ant-menu-dark) > .ant-menu-submenu: hover,
    .ant-menu-horizontal: not(.ant-menu-dark) > .ant-menu-item-active,
    .ant-menu-horizontal: not(.ant-menu-dark) > .ant-menu-submenu-active,
    .ant-menu-horizontal: not(.ant-menu-dark) > .ant-menu-item-open,
    .ant-menu-horizontal: not(.ant-menu-dark) > .ant-menu-submenu-open,
    .ant-menu-horizontal: not(.ant-menu-dark) > .ant-menu-item-selected,
    .ant-menu-horizontal: not(.ant-menu-dark) > .ant-menu-submenu-selected {
    color: #fff !important;
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
    border-bottom: 2px solid #fff;
  }
`;
