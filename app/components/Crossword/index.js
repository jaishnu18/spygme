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

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Typography from 'antd/lib/typography';
const { Title } = Typography;

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
  const { grid } = props;
  return (
    <Row
      style={{
        width: '100%',
        minHeight: '100%',
        // margin: '20px',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        padding: '40px 20px',
      }}
      justify="center"
    >
      <Row
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '100%',
          // margin: '20px',
          padding: '10px 10px',
        }}
        justify="center"
      >
        <Col span={12} style={{ fontFamily: 'montserrat' }}>
          <Title style={{ fontWeight: 700 }}>CROSSWORD</Title>
        </Col>
      </Row>
      <Row style={{}}>
        {grid.map(
          (row, idx) =>
            idx !== 0 && (
              <Row style={{ display: 'flex', width: '100%' }}>
                {row.map(
                  (col, jdx) =>
                    jdx !== 0 && (
                      <Col>
                        <div
                          style={{
                            height: '38px',
                            width: '38px',
                            border: '1px solid grey',
                            backgroundColor: col === 35 ? 'black' : 'white',
                          }}
                        />
                      </Col>
                    ),
                )}
              </Row>
            ),
        )}
      </Row>
    </Row>
  );
}

Crossword.propTypes = {};

export default memo(Crossword);
