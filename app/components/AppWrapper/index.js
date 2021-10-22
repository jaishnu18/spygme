/**
 *
 * AppWrapper
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  background-color: #295474;
`;

function AppWrapper(props) {
  return <Wrapper>{props.children}</Wrapper>;
}

AppWrapper.propTypes = {
  children: PropTypes.node,
};

export default memo(AppWrapper);
