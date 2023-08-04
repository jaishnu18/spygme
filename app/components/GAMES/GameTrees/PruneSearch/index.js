/**
 *
 * PruneSearch
 *
 */

import React, { memo } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import H1 from '../../../atoms/H1';
import P from '../../../atoms/P';
import PracticeGameStats from '../../../PracticeGameStats';
import TimeClock from '../../../TimeClock';
import PruneBinaryTree from '../components/PruneBinaryTree';
import useMediaQuery from '../../../../utils/useMediaQuery';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const generateRandomTree = () => {
  const generateNode = () => ({
    value: Math.floor(Math.random() * 100) + 1,
    left: null,
    right: null,
  });

  const generateRandomBinaryTree = depth => {
    if (depth === 0) return null;

    const node = generateNode();

    node.left = generateRandomBinaryTree(depth - 1);
    node.right = generateRandomBinaryTree(depth - 1);

    return node;
  };

  return generateRandomBinaryTree(4); // Adjust the depth as needed
};

function PruneSearch(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');
  //   const demoTree = {
  //   value: 1,
  //   left: {
  //     value: 2,
  //     left: {
  //       value: 4,
  //       left: {
  //         value: 8,
  //         left: null,
  //         right: null,
  //       },
  //       right: {
  //         value: 9,
  //         left: null,
  //         right: null,
  //       },
  //     },
  //     right: {
  //       value: 5,
  //       left: {
  //         value: 10,
  //         left: null,
  //         right: null,
  //       },
  //       right: {
  //         value: 11,
  //         left: null,
  //         right: null,
  //       },
  //     },
  //   },
  //   right: {
  //     value: 3,
  //     left: {
  //       value: 6,
  //       left: {
  //         value: 12,
  //         left: null,
  //         right: null,
  //       },
  //       right: {
  //         value: 13,
  //         left: null,
  //         right: null,
  //       },
  //     },
  //     right: {
  //       value: 7,
  //       left: {
  //         value: 14,
  //         left: null,
  //         right: null,
  //       },
  //       right: {
  //         value: 15,
  //         left: null,
  //         right: null,
  //       },
  //     },
  //   },
  // };

  const demoTree = generateRandomTree();
  console.log('demotree', demoTree);
  return (
    <>
      <div className="level-time-section">
        <Row style={{ marginBottom: '40px' }}>
          <Col
            xs={{ span: 24 }}
            xl={{ span: 14 }}
            style={{ display: 'flex', alignItems: 'flex-end' }}
          >
            <PracticeGameStats maxLevel={4} level={1} attempts={1} />
          </Col>
          <Col
            style={{ paddingLeft: isDesktop ? '200px' : '0' }}
            xs={{ span: 24 }}
            xl={{ span: 8 }}
          >
            <TimeClock
              evaluatedAnswer={props.evaluatedAnswer}
              active={!props.evaluatedAnswer}
            />
          </Col>
        </Row>
      </div>
      <div className="game-description-section">
        <Row
          style={{
            minHeight: '4vh',
            alignItems: 'center',
            margin: '40px 10px',
          }}
        >
          <Col span={24} style={{ padding: isDesktop ? '0 20px' : '20px' }}>
            <H1 fontWeight="700" level={2}>
              How to play?
            </H1>
            <P style={{ marginTop: '12px', textAlign: 'justify' }}>
              Given a randomly generated game state, identify whether the state
              is valid or invalid. <br />
              In order to decide the validity of the state, the user first
              checks if the board has any floating coins. If it is so, the user
              marks it as invalid. If the board does not have any floating
              coins, the user checks if there are any coin imbalances. To check
              the coin imbalance, the user checks the absolute difference
              between the number of red coins and yellow coins. If this
              difference exceeds 1, this means that the board is invalid. If the
              difference is less than or equal to 1, then the user has to check
              if the first move is provided or is kept anonymous.
              <br />
              If the first move is provided, then the user checks the difference
              between the number of coins of the first player and the opponent.
              If this difference is -1, then the board is invalid as this
              difference cannot be negative, it has to be either 0 or 1. If this
              difference is 0 or 1, then the user checks the winning condition,
              i.e., if any player has 4 connected coins either horizontally,
              vertically, or diagonally. If there is no player winning, then the
              board is a valid board.
            </P>
          </Col>
        </Row>
      </div>
      <PruneBinaryTree
        tree={demoTree}
        // numEdges={6}
        // correctEdges={[1, 3, 4, 5, 6, 7]}
      />
    </>
  );
}

PruneSearch.propTypes = {};

export default memo(PruneSearch);
