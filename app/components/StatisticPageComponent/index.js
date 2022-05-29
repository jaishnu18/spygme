/**
 *
 * StatisticPageComponent
 *
 */

import React, { memo } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [getItem('Leaderboard', '1')];

function StatisticPageComponent(props) {
  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col
        xs={{ span: 24 }}
        xl={{ span: 16 }}
        style={{
          boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px',
          height: '1000px',
        }}
      >
        <Menu
          style={{
            width: 256,
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode="inline"
          items={items}
        />
      </Col>
    </Row>
  );
}

StatisticPageComponent.propTypes = {};

export default memo(StatisticPageComponent);
