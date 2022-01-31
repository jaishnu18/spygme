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
import Paragraph from 'antd/lib/typography/Paragraph';
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
    <Row justify="center" style={{ padding: '20px' }}>
      <Col xs={{ span: 22 }} xl={{ span: 11 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Title level={1} style={{ marginBottom: '10px' }}>
            AI For Schools
          </Title>
          <Title level={3} style={{ marginTop: '10px' }}>
            We teach AI using AI
          </Title>
          <Paragraph>
            In today's world, AI has got diverse applications and is used in
            fields like Healthcare, Self-driving Cars, Agriculture and so on. We
            want you to start learning AI from the very basic concepts so that
            you can build a strong foundation and have no problem while
            understanding more advanced concepts. Don't worry!! We don't give
            lecture videos and take exams. We use AI to teach you AI. You will
            learn each and every concept while playing interesting games and
            reading short reading materials.
          </Paragraph>
        </div>
      </Col>
      <Col xs={{ span: 22 }} xl={{ span: 11, offset: 1 }}>
        <Image src={CoverPage} preview={false} style={{ objectFit: 'cover' }} />
      </Col>
    </Row>
  );
}

Welcome.propTypes = {};

export default memo(Welcome);
