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
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CustomCard from 'components/CustomCard';
import Affix from 'antd/lib/affix';
import CustomButton from 'components/atoms/CustomButton';

function ExamNavigator(props) {
  const arr = new Array(props.levels);
  for (let i = 0; i < props.levels; i++) {
    arr[i] = i + 1;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Affix offsetTop={120}>
        <Row style={{ zIndex: 999 }}>
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
                const mint = Math.floor(remainingTime / 60);
                const secs = remainingTime % 60;
                
                let minutes=mint.toString();
                if(minutes.length==1)
                minutes='0'+minutes;
                
                let seconds=secs.toString();
                if(seconds.length==1)
                seconds='0'+seconds;
                return `${minutes}:${seconds}`;
              }}
            </CountdownCircleTimer>
          </Col>
        </Row>
        <Row style={{ paddingTop: '10px' }}>
          <Col span={22} style={{ display: 'flex', flexDirection: 'column' }}>
            <CustomCard title="Questions">
              {arr.map((x, i) => (
                <CustomButton
                  onClick={() => {
                    if (props.currentLevel !== i) {
                      const D = new Date();
                      const T = props.timeStamps;
                      T[props.currentLevel].push(D);
                      props.setCurrentLevel(i);
                      T[i].push(D);
                      props.setTimeStamps(T);
                    }
                  }}
                  key={`Button-${i + 1}`}
                  style={{
                    margin: '4px',
                    backgroundColor:
                      props.currentLevel === i ? 'green' : 'blue',
                  }}
                >
                  {x}
                </CustomButton>
              ))}
            </CustomCard>
          </Col>
        </Row>
      </Affix>
    </div>
  );
}

ExamNavigator.propTypes = {};

export default memo(ExamNavigator);
