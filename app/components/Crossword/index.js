/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/**
 *
 * Crossword
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import Col from 'antd/lib/col';
// import Row from 'antd/lib/row';

const MyGrid = styled.div`
  width: 100%;
  height: 100%;
  .chessboard {
    width: ${props => props.blocksize};
    height: ${props => props.blocksize};
    border: 2px solid #333;
  }
`;

function Crossword(props) {
  return (
    <div>
      <MyGrid
        size={props.gridSize}
        blocksize={`calc(100% / ${props.gridSize})`}
      >
        {/* <div style={{ display: 'flex', marginBottom: '0px' }}>
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
        </div> */}
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
    </div>
  );
}

Crossword.propTypes = {};

export default memo(Crossword);
