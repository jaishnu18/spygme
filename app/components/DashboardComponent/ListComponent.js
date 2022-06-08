/**
 *
 * Announcements
 *
 */

import Title from 'antd/lib/typography/Title';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import CustomButton from 'components/atoms/CustomButton';

function ListComponent(props) {
  return (
    <div
      style={{
        borderRadius: '16px',
        backgroundColor: '#B0DCF4',
        display: 'flex',
        width: props.width || '100%',
        height: '60px',
        alignItems: 'center',
        padding: '12px',
      }}
    >
      <Title level={3} style={{ margin: 0 }}>
        {props.name}
      </Title>
      <CustomButton
        style={{
          backgroundColor: 'darkblue',
          color: 'white',
          borderRadius: '20px',
        }}
        marginLeft="auto"
        onClick={() => {
          window.location.href = props.url;
        }}
      >
        Let's go
      </CustomButton>
    </div>
  );
}

ListComponent.propTypes = {};

export default memo(ListComponent);
