/**
 *
 * AboutUs
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Timeline from 'antd/lib/timeline';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import useMediaQuery from '../../../utils/useMediaQuery';

function AboutUs() {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <Row id="about" justify="center">
      <Col xs={{ span: 24 }} xl={{ span: 16 }}>
        <H1
          margin={isDesktop ? '40' : '20'}
          fontSize={isDesktop ? '50' : '32'}
          textAlign="center"
          style={{ textShadow: '0.1em 0.1em 0 #c4ccc6' }}
        >
          Why Ai4Schools?
        </H1>
      </Col>
      <Col xs={{ span: 22 }} xl={{ span: 16 }}>
        <P
          textalign="center"
          fontsize={isDesktop ? '20' : '16'}
          fontweight="500"
        >
          AI4Schools is a creative, AI-driven platform assisting students from
          class 6 to undergraduate level in India and abroad to master AI
          concepts through interesting and conceptual games. We believe that AI
          can help teachers identify and support individualized learning paths
          for each student, making education more personalized, efficient, and
          impactful.
        </P>
      </Col>
      <Col xs={{ span: 16 }} xl={{ span: 10 }} style={{ marginTop: '40px' }}>
        <Timeline>
          <Timeline.Item color="var(--primaryColor)">
            <P fontweight="500" textalign="center">
              Numerous learning challenges that students encounter are the
              result of the interaction of cognitive, motivational/affective,
              and social factors. When combined with past classroom dynamics,
              the students' pre-existing knowledge, experiences, and learning
              methodologies may affect their motivation to study.
            </P>
          </Timeline.Item>

          <Timeline.Item color="var(--primaryColor)">
            <P fontweight="500" textalign="center">
              Artificial intelligence has the potential to address some of
              today's most pressing educational concerns, to reinvent teaching
              and learning techniques, and, eventually, to accelerate
              development.
            </P>
          </Timeline.Item>
          <Timeline.Item color="var(--primaryColor)">
            <P fontweight="500" textalign="center">
              AI4Schools can help students get deeper understanding about AI and
              teachers structure their courses and keep track of their students'
              progress and performance, as well as change the way students
              approach learning in general.
            </P>
          </Timeline.Item>
        </Timeline>
      </Col>
    </Row>
  );
}

AboutUs.propTypes = {};

export default memo(AboutUs);
