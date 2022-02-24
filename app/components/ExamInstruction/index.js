/**
 *
 * ExamInstruction
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomCard from 'components/CustomCard';
import CustomButton from 'components/atoms/CustomButton';
import Title from 'antd/lib/typography/Title';

function ExamInstruction(props) {
  return (
    <Row style={{ padding: '40px' }}>
      <Col span={24}>
        <CustomCard title={<Title level={4}>General Instructions</Title>}>
          <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
            {`            1. This is a timed test and the timer on the screen will show you the time left before submission.\n
            2. You must Press the "Submit" Button at the top-right corner to submit your test. The test will be automatically submitted once the timer runs out of time.\n
            3. You can navigate between the questions using “Next” and “Previous” buttons or directly from the question palette.\n
            4. Each game has to be played in the same way as you played in the Practice section.\n
            5. Each graded test can be attempted at most 3 times and the average of all those scores will be taken to calculate your proficiency.\n
            6. All your responses will be automatically saved.
`}
          </pre>
          <CustomButton
            style={{ marginTop: '16px', fontWeight: '700' }}
            onClick={() => {
              props.setCurrentLevel(0);
            }}
          >
            Start Test
          </CustomButton>
          <CustomButton
            style={{ marginTop: '16px', fontWeight: '700' }}
            onClick={() => {
              history.back();
            }}
            type="ghost"
          >
            Back to Materials
          </CustomButton>
        </CustomCard>
      </Col>
      <Col span={24} />
    </Row>
  );
}

ExamInstruction.propTypes = {};

export default memo(ExamInstruction);
