/**
 *
 * Section
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { WHITE } from 'utils/constants';

const StyledSection = styled.div`
  min-weight: 100% !important;
  min-height: ${props => props.minHeight || '100%'};
  width: ${props => props.width || 'auto'};
  padding: ${props => props.padding || '12px'};
  background: ${props => props.background || 'var(--bgColor)'};
`;

function Section(props) {
  return <StyledSection {...props}>{props.children}</StyledSection>;
}

Section.propTypes = {
  children: PropTypes.node,
};

export default memo(Section);
