/**
 *
 * ExamNavigator
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CustomCard from 'components/CustomCard';
import Affix from 'antd/lib/affix';
import CustomButton from 'components/atoms/CustomButton';
import H1 from 'components/atoms/H1';
import TimeClock from 'components/TimeClock';
import useMediaQuery from '../../utils/useMediaQuery';

const StyledDiv = styled.div`
  padding: 24px;
  display: flex;
  width: 100%;
  background-color: #eaeaea;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 16px;
  flex-direction: column;
  justify-content: ${props => props.justifyContent || 'left'} .ant-progress-text {
    font-size: 14px !important;
    font-weight: 700 !important;
  }
`;

function ExamNavigator(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const arr = new Array(props.levels);
  for (let i = 0; i < props.levels; i += 1) {
    arr[i] = i + 1;
  }

  const Component = () => (
    <>
      <Row style={{ zIndex: 999 }} justify="center">
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <TimeClock
            targetTime={
              new Date(new Date().getTime() + props.examDuration * 1000)
            }
            submit={props.submit}
            evaluatedAnswer={props.evaluatedAnswer}
          />
        </Col>
      </Row>

      <StyledDiv>
        <Row
          justify="center"
          style={{
            margin: '10px 0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Col span={24}>
            <H1
              style={{ marginBottom: '20px' }}
              fontWeight="700"
              textAlign="center"
            >
              Questions
            </H1>
          </Col>
          {arr.map((x, i) => (
            <Col>
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
                  width: '50px',
                  height: '50px',
                  fontSize: '20px',
                  fontWeight: 700,
                  backgroundColor:
                    props.currentLevel === i ? 'green' : 'var(--primaryColor)',
                }}
              >
                {x}
              </CustomButton>
            </Col>
          ))}
        </Row>
      </StyledDiv>
    </>
  );

  console.log(props.examDuration);

  return (
    <div style={{ padding: '20px' }}>
      {isDesktop ? <Affix offsetTop={120}>{Component()}</Affix> : Component()}
    </div>
  );
}

ExamNavigator.propTypes = {};

export default memo(ExamNavigator);
