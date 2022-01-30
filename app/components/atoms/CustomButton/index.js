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
  margin: ${props => props.margin || '0px'};
  margin-left: ${props => props.marginLeft || '5px'} !important;
  margin-right: ${props => props.marginRight || '5px'};
`;

function CustomButton(props) {
  return (
    <StyledButton
      type={props.type || 'primary'}
      size={props.size || 'middle'}
      width={props.width}
      height={props.height}
      style={props.style}
      onClick={e => {
        props.onClick();
        if (props.disableOnClick) {
          let { target } = e;
          if (target.tagName === 'SPAN') target = target.parentElement;
          target.disabled = true;
        }
      }}
      icon={props.icon}
      danger={props.danger}
      disabled={props.disabled}
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
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
