/**
 *
 * Syp
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { Button, Form, Input, Alert, message, Space, FormInstance } from 'antd';
import BinaryTree from '../components/BinaryTree';


import PracticeGameStats from '../../../PracticeGameStats';
import TimeClock from '../../../TimeClock';
import H1 from '../../../atoms/H1';
import P from '../../../atoms/P';
import useMediaQuery from '../../../../utils/useMediaQuery';
import PracticeGamesFeedback from '../../../FEEDBACK/PracticeGamesFeedback';

function Syp(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { submit } = props;
  const isDesktop = useMediaQuery('(min-width: 960px)');
  const [form] = Form.useForm();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const updateTimeElapsed = (elapsedTime) => {
    setTimeElapsed(elapsedTime);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const FeedBack = __evaluatedAnswer =>
    __evaluatedAnswer && (
      <>
        <H1
          // level={3}
          fontWeight="700"
          textAlign="center"
          style={{ margin: '40px 0' }}
        >
          FEEDBACK
        </H1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isDesktop && '40px',
          }}
        >
          <PracticeGamesFeedback
            whatWentWrong={__evaluatedAnswer.score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </>
    );

  const renderNode = () => {
    const style = {
      width: '40px',
      height: '40px',
      backgroundColor: 'blue',
      borderRadius: '50%',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: '40px',
      color: 'white',
    };
    return <div style={style}>Node</div>;
  };


  return (
      <div>
        <Row>
          <Col xs={{ span: 24 }}
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
          <Col style={{ paddingLeft: isDesktop ? '200px' : '0' }}
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
            }>
            <TimeClock active={true} updateTimeElapsed={updateTimeElapsed} />
          </Col>
        </Row>
        <div className="game-gameDescription-section">
        <Row
          style={{
          paddingTop: '30px',
        }}
        >
          <H1 fontWeight="700" level={2}>
            How to play?
          </H1>
          <P >
            The game randomly generates 8 numbers between 0 and 99 and
            displays these numbers as a level of MAX nodes (depth 3). You are
            supposed to form the level of MIN nodes (of depth 2). Once you
            enter these values, you are supposed to form the level of MAX
            nodes (of depth 1). In this way, you are required to reach up to
            the root of the tree.
          </P>
        </Row>
        <Row>
          <Col>
          {gameData &&
          <BinaryTree questionTree={gameData.question_tree} nodeValues={gameData.nodeValues} functionToCall={props.submit} />
          }
          </Col>
        </Row>
        <Row>
          <Col>
            {FeedBack(gameData.nodeValues)}
          </Col>
        </Row>
        </div>
      </div>
  );
}


Syp.propTypes = {};

export default memo(Syp);
