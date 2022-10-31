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

const CrosswordBlock = styled.div`
  @media (max-width: 500px) {
    width: 10vw !important;
    height: 10vw !important;
  }

  @media (max-width: 1000px) {
    width: 5vw !important;
    height: 5vw !important;
  }

  width: 2vw !important;
  height: 2vw !important;
`;

function Crossword(props) {
  const { grid } = props;
  return (
    <Row
      style={{
        margin: '20px',
        // boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
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
        <Col span={24}>
          <Title level={2} style={{ fontWeight: 700, margin: '0' }}>
            CROSSWORD
          </Title>
        </Col>
      </Row>
      {grid && (
        <Row style={{}}>
          {grid.map((row, idx) => (
            <Row
              justify="center"
              key={`Row-${idx + 1}`}
              style={{ display: 'flex', width: '100%' }}
            >
              {row.map((col, jdx) => (
                <Col key={`Col-${jdx + 1}`}>
                  <CrosswordBlock
                    style={{
                      
                      border: idx !== 0 && jdx !== 0 && '1px solid grey',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        idx === 0 || jdx === 0
                          ? 'transparent'
                          : col === 46
                          ? 'white'
                          : 'black',
                    }}
                  >
                    {idx === 0 && jdx !== 0
                      ? jdx
                      : idx !== 0 && jdx === 0
                      ? idx
                      : ''}
                  </CrosswordBlock>
                </Col>
              ))}
            </Row>
          ))}
        </Row>
      )}
    </Row>
  );
}

Crossword.propTypes = {};

export default memo(Crossword);
