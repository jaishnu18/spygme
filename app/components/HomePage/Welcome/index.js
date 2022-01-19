/**
 *
 * Welcome
 *
 */

import React, { memo } from 'react';
import Carousel from 'antd/lib/carousel';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CoverPage from 'images/coverPage.png';
import Image from 'antd/lib/image';
import Title from 'antd/lib/typography/Title';
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
      <Row style={{ padding: '40px' }}>
        <Col xs={{ span: 24 }} xl={{ span: 11 }} style={{ alignItems: 'center', flexDirection: 'column', display: 'flex' }}>
          <Title level={1}>AI For Schools</Title>

          <Title level={3}>We teach AI using AI</Title>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 11, offset: 1 }}>
          <Image src={CoverPage} preview={false} />
        </Col>
      </Row>
    </>
  );
}

Welcome.propTypes = {};

export default memo(Welcome);
