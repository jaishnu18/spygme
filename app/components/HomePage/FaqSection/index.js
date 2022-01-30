/**
 *
 * FaqSection
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import Collapse from 'antd/lib/collapse';

const { Panel } = Collapse;
const { Title } = Typography;
const { Paragraph } = Typography;

function FaqSection() {
  return (
    <Row>
      <Col span={12} offset={6}>
        <Title>Frequenty Asked questions (FAQs)</Title>
      </Col>
      <Col span={18} offset={3}>
        <Collapse accordion style={{}}>
          <Panel
            header="I have no prior knowledge of Artificial Intelligence. Can I solve the problems ?"
            key="1"
          >
            <Paragraph>
              No prior knowledge of AI is required. You will get to learn each
              concept by playing games accompanied by short reading materials
            </Paragraph>
          </Panel>
          <Panel
            header="Is there any backward free navigation so I can revisit my question that has been previously attempted ? "
            key="2"
          >
            <Paragraph>
              During practice sessions, you will enter into a level of the game
              where you wll get a new instance almost every time, complete it
              and go to next item. For graded sessions, you can navigate
              backward and forward as many times as you want.
            </Paragraph>
          </Panel>
          <Panel header="Does it help in my school exam as well ?" key="3">
            <Paragraph>
              It does not help you directly in your school curriculum. But
              learning on our platform can improve your logical thinking skills,
              make you smarter than others and this may indirectly influence
              your performance in school exams
            </Paragraph>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

FaqSection.propTypes = {};

export default memo(FaqSection);
