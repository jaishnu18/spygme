/**
 *
 * CustomCard
 *
 */

import React, { memo } from 'react';
import Card from 'antd/lib/card';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CustomCard(props) {
  return (
    <Card
      hoverable={props.hoverable}
      title={props.title}
      extra={props.extra}
      style={{
        backgroundColor: props.color ? props.color : 'white',
        boxShadow: props.shadow || '0 15px 40px rgb(16 8 3 / 8%)',
        marginBottom: props.marginBottom || 'auto',
        borderRadius: props.borderRadius || 'auto',
      }}
    >
      {props.children}
    </Card>
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
