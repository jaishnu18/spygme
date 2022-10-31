/**
 *
 * CustomCard
 *
 */

import React, { memo } from 'react';
import Card from 'antd/lib/card';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  // background-color: ${props => (props.color ? props.color : 'white')};
  box-shadow: ${props => props.shadow || '0 15px 40px rgb(16 8 3 / 8%)'};
  margin-bottom: ${props => props.marginBottom || 'auto'};
  border-radius: ${props => props.borderRadius || 'auto'};

  min-width: ${props =>
    props.minWidth || (props.isDesktop ? '500px' : '100%')} !important;

  justify-content: ${props => props.justifyContent || 'auto'};
  width: ${props => props.width || 'auto'} !important;
  height: ${props => props.height};
`;

function CustomCard(props) {
  return (
    <StyledCard
      hoverable={props.hoverable}
      title={props.title}
      extra={props.extra}
      {...props}
    >
      {props.children}
    </StyledCard>
  );
}

CustomCard.propTypes = {
  extra: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node,
  shadow: PropTypes.string,
  marginBottom: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default memo(CustomCard);
