/**
 *
 * TimeClock
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

const StyledTimer = styled(Timer)`
  // width: 400px !important;
  // height: 400px !important;
  // display: flex !important;
  // align-items: center !important;

  span {
    font-size: 30px !important;
  }
`;

function TimeClock(props) {
  return (
    <>
      <StyledTimer active={props.active} duration={props.maxDuration || null}>
        <Timecode />
      </StyledTimer>
    </>
  );
}

TimeClock.propTypes = {
  active: PropTypes.bool,
  maxDuration: PropTypes.number,
};

export default memo(TimeClock);
