/* eslint-disable radix */
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
  const { hours } = props;
  const { minutes } = props;
  const { seconds } = props;

  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
    if (secs === 0 && hrs === 0 && mins === 0) {
      props.setExamOver(true);
    }
  };

  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
    const timerId = !props.isExamOver && setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
    </div>
  );
}

CountDownTimer.propTypes = {
  hoursMinSecs: PropTypes.number,
};

export default memo(CountDownTimer);
