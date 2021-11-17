/**
 *
 * GameRow
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Row } from 'antd';

const StyledRow = styled(Row)`
  background-color: #f8faa7;
  margin: 10px 50px 50px 50px;
  border-radius: 10px;
  padding: 20px;
`;

function GameRow(props) {
  return (
    <div>
      <StyledRow>{props.children}</StyledRow>
    </div>
  );
}

GameRow.propTypes = {};

export default memo(GameRow);
