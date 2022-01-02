/**
 *
 * H4
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledH4 = styled.h4`
  font-family: 'Montserrat';
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
  margin: ${props => props.margin || '0'};
  padding: 0;
`;

function H4(props) {
  return <StyledH4 {...props}>{props.children}</StyledH4>;
}

H4.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};

export default memo(H4);
