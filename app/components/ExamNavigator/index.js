/**
 *
 * ExamNavigator
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomButton from '../atoms/CustomButton';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CustomCard from 'components/CustomCard';

function ExamNavigator(props) {
  const arr = new Array(props.levels);
  for (let i = 0; i < props.levels; i++) {
    arr[i] = i + 1;
  }
  console.log(props);
  return (
    <div>
      <Row>
        <Col span={24}>
          <CountdownCircleTimer
            isPlaying={!props.evaluatedAnswer}
            duration={props.examDuration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            size={120}
            strokeWidth={8}
            onComplete={props.submit}
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60)
              const seconds = remainingTime % 60

              return `${minutes}:${seconds}`
            }}
          </CountdownCircleTimer>
        </Col>
      </Row>
      <Row style={{ paddingTop: '10px' }}>
        <Col span={22} style={{ display: 'flex', flexDirection: 'column' }}>
          <CustomCard title="Navigator">
            {arr.map((x, i) => (
              // <Col
              //   key={x}
              //   span={2}
              //   // offset={1}
              //   style={{
              //     display: 'flex',
              //     alignItems: 'center',
              //     justifyContent: 'center',
              //     border: '1px solid grey',
              //   }}
              // >
              <CustomButton
                onClick={() => {
                  props.setCurrentLevel(i);
                }}
              >
                {x}
              </CustomButton>
              // </Col>
            ))}
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
}

ExamNavigator.propTypes = {};

export default memo(ExamNavigator);
