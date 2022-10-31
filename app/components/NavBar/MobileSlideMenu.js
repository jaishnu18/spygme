import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'antd/lib/drawer';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
import history from 'utils/history';
import SideBarOptions from './SideBarOptions';

const DrawerContainer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    width: 300px !important;
    height: calc(100vh) !important;
    overflow-y: auto !important;
    .ant-drawer-content {
      z-index: 10005 !important;
    }
  }

  .top-side-header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 28px 0;
    z-index: 10005 !important;
  }
  .ant-drawer-body {
    padding: 0;
  }

  .ant-divider {
    background-color: grey !important;
  }
`;

function MobileSlideMenu(props) {
  const onClose = () => {
    props.setToggleSlideMenuState(false);
  };

  console.log(props.MenuOptions);

  const SideOptions = props.MenuOptions.map((item, index) => (
    <div key={item.label}>
      <SideBarOptions
        Option={item}
        toggleLogout={props.toggleLogout}
        active={history.location.pathname === item.url}
      />
      <Divider style={{ margin: '0px' }} />
    </div>
  ));

  return (
    <DrawerContainer
      placement="right"
      closable={false}
      onClose={onClose}
      visible={props.toggleSlideMenuState}
      bodyStyle={{ marginbottom: '30px' }}
    >
      <div style={{ padding: '20px' }}>{SideOptions}</div>
    </DrawerContainer>
  );
}

MobileSlideMenu.propTypes = {
  toggleSlideMenuState: PropTypes.bool,
  setToggleSlideMenuState: PropTypes.func,
  MenuOptions: PropTypes.array,
  toggleLogout: PropTypes.func,
};

export default memo(MobileSlideMenu);
