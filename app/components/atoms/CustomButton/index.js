/**
 *
 * CustomButton
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'antd/lib/button';

const StyledButton = styled(Button)`
  background-color: ${props =>
    props.light ? 'var(--bgColor)' : 'var(--primaryColor)'};
  color: ${props => (props.light ? 'var(--primaryColor)' : 'var(--bgColor)')};
  height: fit-content;
  font-size: ${props => props.fontSize || '14px'} !important;
  margin-left: ${props => props.marginLeft || '5px'} !important;
  margin-right: ${props => props.marginRight || '5px'} !important;
  margin-top: ${props => props.marginTop || '5px'} !important;
  margin-bottom: ${props => props.marginBottom || '5px'};
  margin: ${props => props.margin || '5px'} !important;
  border-radius: ${props => props.borderRadius || 'none'} !important;
  width: ${props => props.width || 'auto'};

  :hover {
    background-color: ${props =>
      props.light ? 'var(--bgColor)' : 'var(--primaryColor)'} !important;
    color: ${props =>
      props.light ? 'var(--primaryColor)' : 'var(--bgColor)'} !important;
  }
`;

function CustomButton(props) {
  return (
    <StyledButton
      size={props.size || 'middle'}
      width={props.width}
      height={props.height}
      // style={props.style}
      icon={props.icon}
      danger={props.danger}
      disabled={props.disabled}
      {...props}
    >
      {props.children}
    </StyledButton>
  );
}

CustomButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  size: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
  disableOnClick: PropTypes.bool,
  icon: PropTypes.node,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default memo(CustomButton);
