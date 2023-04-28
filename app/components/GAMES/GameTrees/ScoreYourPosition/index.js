/**
 *
 * ScoreYourPosition
 *
 */

import React, { memo, useState } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { Button, Form, Input, Select, Space } from 'antd';
import BinaryTree from '../components/BinaryTree';

import PracticeGameStats from '../../../PracticeGameStats';
import TimeClock from '../../../TimeClock';
import H1 from '../../../atoms/H1';
import P from '../../../atoms/P';
import useMediaQuery from '../../../../utils/useMediaQuery';

function ScoreYourPosition(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const { gameData } = props;

  console.log('component', gameData.question_tree);

  return (
    <div className="main-div">
      <div className="level-time- section">
        <Row>
          <Col
            xs={{ span: 24 }}
            xl={{ span: 14 }}
            style={{ display: 'flex', alignItems: 'flex-end' }}
            onMouseEnter={e =>
              props.setMovement([
                ...props.movement,
                {
                  location: 'Stats',
                  timestamp: new Date(),
                  x: e.screenX,
                  y: e.screenY,
                },
              ])
            }
          >
            <PracticeGameStats maxLevel={4} level={1} attempts={1} />
          </Col>
          <Col
            style={{ paddingLeft: isDesktop ? '200px' : '0' }}
            xs={{ span: 24 }}
            xl={{ span: 8 }}
            onMouseEnter={e =>
              props.setMovement([
                ...props.movement,
                {
                  location: 'Timer',
                  timestamp: new Date(),
                  x: e.screenX,
                  y: e.screenY,
                },
              ])
            }
          >
            <TimeClock
              evaluatedAnswer={props.evaluatedAnswer}
              active={!props.evaluatedAnswer}
            />
          </Col>
        </Row>
      </div>
      <div className="game-gameDescription-section">
        <Row
          style={{
            paddingTop: '30px',
          }}
        >
          <Col
            xs={{ span: 24 }}
            xl={{ span: 12 }}
            style={{
              paddingBottom: isDesktop ? '0' : '30px',
            }}
          >
            <BinaryTree nodes={gameData.question_tree} />
          </Col>
          <Col
            xs={{ span: 24 }}
            xl={{ span: 12 }}
            style={{
              padding: isDesktop ? '0' : '20px',
            }}
          >
            <H1 fontWeight="700" level={2}>
              How to play?
            </H1>
            <P>
              The game randomly generates 8 numbers between 0 and 99 and
              displays these numbers as a level of MAX nodes (depth 3). You are
              supposed to form the level of MIN nodes (of depth 2). Once you
              enter these values, you are supposed to form the level of MAX
              nodes (of depth 1). In this way, you are required to reach up to
              the root of the tree.
            </P>
          </Col>
        </Row>
      </div>
    </div>
  );
}

ScoreYourPosition.propTypes = {};

export default memo(ScoreYourPosition);
