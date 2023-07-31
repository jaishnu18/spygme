/**
 *
 * EntropyBucket
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function EntropyBucket(props) {
  const { bucket } = props;
  const bucketYEnd = bucket.length > 4 ? '150px' : '80px';
  const colors = { 97: '#FF3131', 98: '#1F51FF', 99: '#32CD32', 100: 'yellow' };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg width="260px" height={bucket.length > 4 ? '200px' : '100px'}>
        {bucket.map((ball, i) =>
          bucket.length <= 4 ? (
            <circle
              key={crypto.randomUUID()}
              cx={40 + 60 * i}
              cy="50px"
              r="25px"
              stroke="black"
              fill={colors[ball]}
            />
          ) : (
            <circle
              key={crypto.randomUUID()}
              cx={40 + 60 * (i < 4 ? i : i - 4)}
              cy={i < 4 ? '120px' : '50px'}
              r="25px"
              stroke="black"
              fill={colors[ball]}
            />
          ),
        )}

        <line
          x1="10px"
          y1="10px"
          x2="10px"
          y2={bucketYEnd}
          style={{
            strokeWidth: 3,
            stroke: 'black',
          }}
        />
        <line
          x1="10px"
          y1={bucketYEnd}
          x2="250px"
          y2={bucketYEnd}
          style={{
            strokeWidth: 3,
            stroke: 'black',
          }}
        />
        <line
          x1="250px"
          y1="10px"
          x2="250px"
          y2={bucketYEnd}
          style={{
            strokeWidth: 3,
            stroke: 'black',
          }}
        />
      </svg>
    </div>
  );
}

EntropyBucket.propTypes = {
  bucket: PropTypes.array,
};

export default memo(EntropyBucket);
