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
  min-weight: 100% !important ;
  min-height: ${props => props.height || '100%'};
  padding: ${props => props.padding || '100px 25px'};
  background: ${props => props.background || WHITE};
`;

function Section(props) {
  return <StyledSection {...props}>{props.children}</StyledSection>;
}

Section.propTypes = {
  children: PropTypes.node,
};

export default memo(Section);
