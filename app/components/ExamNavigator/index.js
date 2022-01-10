/* eslint-disable no-nested-ternary */
/**
 *
 * ExamNavigator
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button } from 'antd';

function ExamNavigator(props) {
  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        backgroundColor: 'lightgrey',
        display: 'flex',
        padding: '20px',
        border: '2px solid black',
      }}
    >
      {[...Array(props.levels)].map((k, j) => (
        <Button
          style={{
            width: '40px',
            height: '40px',
            marginBottom: '0px',
            marginLeft: '42px',
            textAlign: 'right',
            backgroundColor: !props.markedForReview[j]
              ? props.visited[j]
                ? props.attempted[j]
                  ? 'green'
                  : 'red'
                : 'lightgrey'
              : 'purple',
            border:
              props.markedForReview[j] && props.attempted[j]
                ? '5px solid lightgreen'
                : '1px solid black',
          }}
          onClick={() => {
            const X = props.visited;
            X[j] = 1;
            const { timeStamps } = props;
            const endTime = new Date();
            timeStamps[props.currLevel].push(endTime);
            timeStamps[j].push(endTime);

            props.setTimeStamps(timeStamps);
            props.setVisited(X);
            props.setCurrLevel(j);
          }}
        >
          {j + 1}
        </Button>
      ))}
    </div>
  );
}

ExamNavigator.propTypes = {};

export default memo(ExamNavigator);
