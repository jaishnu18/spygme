/**
 *
 * Welcome
 *
 */

import React, { memo } from 'react';
import Carousel from 'antd/lib/carousel';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// const Carousel = React.lazy(() => import('antd/lib/carousel'));

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function Welcome(props) {
  return (
    <>
      <Carousel dotPosition="right" autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
}

Welcome.propTypes = {};

export default memo(Welcome);
