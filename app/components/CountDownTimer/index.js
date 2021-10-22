/**
 *
 * CountDownTimer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

const StyledTimer = styled(Timer)`
  width: 400px !important;
  height: 400px !important;
  display: flex !important;
  align-items: center !important;

  span {
    font-size: 40px !important;
  }
`;

function CountDownTimer(props) {
  return (
    <div>
      <Timer active duration={props.maxHourDuration * 60 * 1000} />
      <Timecode time={props.duration - props.time} />
    </div>
  );
}

CountDownTimer.propTypes = {
  onTimerUpdate: PropTypes.func,
  duration: PropTypes.number,
  time: PropTypes.number,
  maxHourDuration: PropTypes.number,
};

export default memo(CountDownTimer);
