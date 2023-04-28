/* eslint-disable no-plusplus */
/**
 *
 * Connect4
 *
 */

/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Typography from 'antd/lib/typography';
import styled from 'styled-components';
const { Title } = Typography;

const Connect4Block = styled.div`
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

const Connect4 = props => {
  const { board } = props;

  const json = {
    rows: 6,
    cols: 7,
    boards: board,
  };

  // const numRows = json.rows;
  // const numCols = json.cols;
  const { boards } = json;
  const [boardsState, setboardsState] = useState(boards);
  const [player, setPlayer] = useState('red');

  const getFirstEmptyRow = col => {
    for (let row = boardsState.length - 1; row >= 0; row--) {
      if (boardsState[row][col] === null) {
        return row;
      }
    }
    return -1;
  };

  const dropPiece = col => {
    const row = getFirstEmptyRow(col);
    if (row === -1) return;
    const updatedboards = [...boardsState];
    updatedboards[row][col] = player;
    setboardsState(updatedboards);
    setPlayer(player === 'red' ? 'yellow' : 'red');
  };

  const renderCell = (rowIndex, colIndex) => {
    const cellValue = boardsState[rowIndex][colIndex];
    return (
      <div
        className="cell"
        style={{
          backgroundColor: cellValue
            ? cellValue === 1
              ? 'red'
              : 'yellow'
            : '#ffffff',
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          margin: '2px',
          display: 'inline-block',
        }}
      />
    );
  };

  const renderRow = rowIndex => (
    <div>
      {boardsState[rowIndex].map((_, colIndex) =>
        renderCell(rowIndex, colIndex),
      )}
    </div>
  );

  const renderboards = () => (
    <div style={{ backgroundColor: '#6ab5d6', padding: '10px' }}>
      {boardsState.map((_, rowIndex) => renderRow(rowIndex))}
    </div>
  );

  return (
    <div className="connect-four">
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
            Connect4
          </Title>
        </Col>
      </Row>
      <Row
        style={{
          margin: '20px',
          padding: '40px 20px',
        }}
        justify="center"
      >
        {renderboards()}
      </Row>
    </div>
  );
};

export default Connect4;

// function Connect4() {
//   return <div>Hi</div>;
// }

// Connect4.propTypes = {};

// export default memo(Connect4);
