/**
 *
 * P
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledP = styled.p`
  color: ${props => props.color || 'var(--primaryColor)'};
  margin: ${props => props.margin || '0'}px;
  font-weight: ${props => props.fontweight || 'auto'};
  font-size: ${props => props.fontsize || '18'}px;
  text-align: ${props => props.textalign || 'auto'} !important;
  width: ${props => props.width || 'auto'};
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  display: flex;
  align-items: center;
`;

function P(props) {
  return <StyledP {...props}>{props.children}</StyledP>;
}

P.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};

export default memo(P);
