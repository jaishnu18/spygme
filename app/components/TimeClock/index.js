/* eslint-disable radix */
/**
 *
 * TimeClock
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import P from 'components/atoms/P';

const Wrapper = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center !important;
  margin: 20px;

  font-family: Arial !important;
`;

const Block = styled.div`
  height: 75px;
  width: 75px;
  border-radius: 12px;
  border: 4px solid var(--bgColor);
  background-color: var(--bgColor);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  padding: 4px;
  box-shadow: 0 2px rgba(100, 100, 100, 0.5);
`;

const BlockContainer = styled.div`
  height: 110px;
  width: 110px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TimeClock(props) {
  const [targetTime, setTargetTime] = useState(
    props.targetTime ? new Date(props.targetTime) : new Date().getTime(),
  );
  const timerRef = React.useRef(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const currentDate = new Date().getTime();
      let secondsLeft;
      if (props.submit) {
        if (targetTime.getTime() > currentDate) {
          secondsLeft = (targetTime - currentDate) / 1000;
        } else secondsLeft = 0;
      } else {
        secondsLeft = (currentDate - targetTime) / 1000;
      }

      if (!props.evaluatedAnswer) {
        setHours(pad(parseInt(secondsLeft / 3600)));
        secondsLeft %= 3600;
        setMinutes(pad(parseInt(secondsLeft / 60)));
        setSeconds(pad(parseInt(secondsLeft % 60)));
      }
    }, 1000);
    return () => {
      window.clearInterval(timerRef.current);
    };
  }, [props.evaluatedAnswer]);

  useEffect(() => {
    if (props.submit && hours === '00' && minutes === '00' && seconds === '00')
      props.submit();
  }, [hours, minutes, seconds]);

  return (
    <Wrapper>
      <Timer active={props.active} duration={props.maxDuration || null}>
        {/* <Timecode /> */}
      </Timer>
      <div>
        <div style={{ display: 'flex' }}>
          {hours > 0 && (
            <BlockContainer
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Block>
                <P
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--primaryColor)',
                  }}
                >
                  {hours}
                </P>
              </Block>
              <P style={{ fontSize: '24px', fontWeight: 700 }}>Hours</P>
            </BlockContainer>
          )}
          <BlockContainer style={{ display: 'flex', flexDirection: 'column' }}>
            <Block>
              <P
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--primaryColor)',
                }}
              >
                {minutes}
              </P>
            </Block>
            <P style={{ fontSize: '24px', fontWeight: 700 }}>Minutes</P>
          </BlockContainer>
          <BlockContainer style={{ display: 'flex', flexDirection: 'column' }}>
            <Block>
              <P
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--primaryColor)',
                }}
              >
                {seconds}
              </P>
            </Block>
            <P style={{ fontSize: '24px', fontWeight: 700 }}>Seconds</P>
          </BlockContainer>
        </div>
      </div>
    </Wrapper>
  );
}

TimeClock.propTypes = {
  active: PropTypes.bool,
  maxDuration: PropTypes.number,
};

export default memo(TimeClock);
