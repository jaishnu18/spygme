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
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
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
            Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to natural intelligence displayed by animals including humans.
            In this field of study, we learn how to make computers solve wide variety of problems, how to make them take intelligent decisions, how to make them recognize patterns, how to program them to learn from experience and provide some kind of predictions.
          </Paragraph>
          <Paragraph>
          AI applications include advanced web search engines (e.g., Google), recommendation systems (used by YouTube, Amazon and Netflix), understanding human speech (such as Siri and Alexa), self-driving cars (e.g., Tesla), automated decision-making and competing at the highest level in strategic game systems (such as chess and Go).
          </Paragraph>
          <Paragraph>
            This platform is built so that students of any age can start learning AI from the most basic concepts thereby building a strong foundation and having acquired the skills can apply them to solve real world problems. Don't worry!! We don't give
            lecture videos and take exams. We use AI to teach AI. Students will
            learn each and every concept while playing interesting games and
            reading short reading materials.
          </Paragraph>
          <Link to={localStorage.getItem('_UFT_') ? '/dashboard' : '/auth'}>
            <Button type="primary" shape="round">Get Started</Button>
          </Link>
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
