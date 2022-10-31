/**
 *
 * H3
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledH3 = styled.h3`
  font-size: 26px;
  line-height: 42px;
  color: ${props => props.color || 'black'};

  @media (max-width: 425px) {
    font-size: 15px;
    line-height: 24px;
  }
`;

function H3(props) {
  return (
    <StyledH3 style={props.style} color={props.color}>
      {props.children}
    </StyledH3>
  );
}

H3.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
};

export default memo(H3);
