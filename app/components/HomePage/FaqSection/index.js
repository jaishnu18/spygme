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
    <Row justify="center" style={{ padding: '20px' }}>
      <Col
        span={24}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title style={{ textAlign: 'center' }}>
          Frequenty Asked questions (FAQs)
        </Title>
      </Col>
      <Col span={20} style={{ marginTop: '2vh' }}>
        <Collapse accordion style={{}}>
          <Panel
            header="I have no prior knowledge of Artificial Intelligence. Can I solve the problems ?"
            key="1"
          >
            <Paragraph>
              No prior knowledge of AI is required. You will get to learn each
              concept by playing games accompanied by short reading materials. If you have basic mathematical and logical skills, you are good to go
            </Paragraph>
          </Panel>
          <Panel header="Does it help in my school exam as well ?" key="2">
            <Paragraph>
              Some boards of education have already introduced AI in their cirriculum.
              So, if you have this subject in your school cirriculum, it will certainly help you in exams as well because here you will learn concepts by playing games which will make you more involved with the topics 
            </Paragraph>
          </Panel>
          <Panel header="Who is this platform meant for ?" key="3">
            <Paragraph>
              Students from classes IV to XII can register on the platform and start learning AI from a very fundamental level. Apart from this, teachers and other people can also register on the platform by choosing option during registration if they want to try out the platform 
            </Paragraph>
          </Panel>
          <Panel header="Is there any time limit by which I should complete the course ?" key="4">
            <Paragraph>
              We have not put any limit on the time since this platform is meant for students of wide range of class. You can learn at your own pace 
            </Paragraph>
          </Panel>
          <Panel header="What topics are covered in this ?" key="5">
            <Paragraph>
              Currently we have reading materials, practice games and graded games for the most fundamental topics of AI which include Constraint Satisfaction Problems and Propositional Logic. Each topic has several concepts within it which you can learn. More topics will be added soon.
            </Paragraph>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

FaqSection.propTypes = {};

export default memo(FaqSection);
