/**
 *
 * GameDescription
 *
 */

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import H4 from 'components/atoms/H4';

import PropTypes from 'prop-types';
// import styled from 'styled-components';

function GameDescription(props) {
  return (
    <Row
      style={{ minHeight: '4vh', alignItems: 'center', margin: '20px 10px' }}
    >
      <Col span={24} style={{ padding: '40px' }}>
        <H4>{props.description}</H4>
      </Col>
    </Row>
  );
}

GameDescription.propTypes = {};

export default memo(GameDescription);
