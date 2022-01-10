/* eslint-disable no-nested-ternary */
/**
 *
 * Crossword
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MyGrid = styled.div`
  width: ${props => props.size * 72}px;
  height: ${props => props.size * 72}px;
  .chessboard {
    width: 70px;
    height: 70px;
    border: 2px solid #333;
  }
`;

function Crossword(props) {
  return (
    <MyGrid size={props.gridSize}>
      <div style={{ display: 'flex', marginBottom: '0px' }}>
        {[...Array(props.gridSize)].map((k, j) => (
          <h1
            style={{
              width: '100%',
              marginBottom: '0px',
              marginLeft: '42px',
              textAlign: 'right',
            }}
          >
            {j + 1}
          </h1>
        ))}
      </div>
      {[...Array(props.gridSize + 1)].map(
        (x, i) =>
          i > 0 && (
            <div style={{ display: 'flex' }}>
              {[...Array(props.gridSize + 1)].map((y, j) => (
                <div>
                  {props.grid ? (
                    j === 0 ? (
                      <h1
                        style={{
                          width: '25px',
                          height: '25px',
                          marginBottom: '0px',
                        }}
                      >
                        {i}
                      </h1>
                    ) : (
                      <div
                        style={{
                          backgroundColor:
                            props.grid[i][j] === 35 ? 'black' : 'white',
                        }}
                        className="chessboard"
                      />
                    )
                  ) : null}
                </div>
              ))}
            </div>
          ),
      )}
    </MyGrid>
  );
}

Crossword.propTypes = {
  grid: PropTypes.array,
  gridSize: PropTypes.string,
};

export default memo(Crossword);
