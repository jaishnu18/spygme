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
          margin: '20px',
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
        {grid &&
          <Row style={{}}>
            {grid.map(
              (row, idx) =>
              (
                <Row style={{ display: 'flex', width: '100%' }}>
                  {row.map(
                    (col, jdx) =>
                    (
                      <Col>
                        <div
                          style={{
                            height: '38px',
                            width: '38px',
                            border: idx !== 0 && jdx !== 0 && '1px solid grey',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: idx === 0 || jdx === 0 ? 'transparent' : (col === 46 ? 'white' : 'black'),
                          }}
                        >
                          {idx === 0 && jdx !== 0 ? jdx : (idx !== 0 && jdx === 0 ? idx : '')}
                        </div>
                      </Col>
                    ),
                  )}
                </Row>
              ),
            )}
          </Row>
        }
      </Row>
  );
}

Crossword.propTypes = {};

export default memo(Crossword);
