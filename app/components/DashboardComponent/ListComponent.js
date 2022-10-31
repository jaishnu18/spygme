/**
 *
 * Announcements
 *
 */

import H1 from 'components/atoms/H1';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Button from 'antd/lib/button';
import useMediaQuery from '../../utils/useMediaQuery';
function ListComponent(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

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
      <H1 fontSize={isDesktop ? '24' : '14'} fontWeight="700">
        {props.name}
      </H1>
      <Button
        style={{
          backgroundColor: 'var(--primaryColor)',
          color: 'white',
          borderRadius: '20px',
          marginLeft: 'auto',
        }}
        onClick={() => {
          window.location.href = props.url;
        }}
      >
        Play Now
      </Button>
    </div>
  );
}

ListComponent.propTypes = {};

export default memo(ListComponent);
