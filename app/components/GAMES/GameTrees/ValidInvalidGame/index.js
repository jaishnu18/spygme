// /**
//  *
//  * ValidInvalidGame
//  *
//  */

import React, { memo, useState } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { Button, Form, Input, Select, Space } from 'antd';

import Connect4 from '../components/Connect4';
import PracticeGameStats from '../../../PracticeGameStats';
import TimeClock from '../../../TimeClock';
import H1 from '../../../atoms/H1';
import P from '../../../atoms/P';
// import GameDescription from '../../../GameDescription';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import useMediaQuery from '../../../../utils/useMediaQuery';

function ValidInvalidGame(props) {
  const { Option } = Select;
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <div className="main-div">
      <div className="level-time-section">
        <Row style={{ marginBottom: '40px' }}>
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
            <P
              style={{ marginTop: '12px' }}
              onMouseEnter={e =>
                props.setMovement([
                  ...props.movement,
                  {
                    location: 'Game Description',
                    timestamp: new Date(),
                    x: e.screenX,
                    y: e.screenY,
                  },
                ])
              }
            >
              In this game, you are given a crossword grid along with the row
              and column number and you need to take your first step towards
              modelling it as a CSP. Find all positions in the crossword which
              are considered as Nodes and enter them by choosing Node direction,
              its row and column number. To add a node, press the “Add node”
              button. Press on the “Check Answer” button to get the result. You
              get score = (correctNodeCount - 0.5 * wrongNodeCount) /
              (correctNodeCount + missedNodeCount)) and 0 if the quantity
              becomes negative.
            </P>
          </Col>
          {props.evaluatedAnswer && (
            <Col span={24}>
              <QuestionDataDownload gameData={props.gameData} />
            </Col>
          )}
        </Row>
      </div>
      <div className="game-section">
        <Row>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Connect4 />
            <Row style={{ margin: '0 8rem 0 8rem' }}>
              <Col span={24}>
                <div className="answer-check-section">
                  <Form style={{ textAlign: 'center' }}>
                    <Form.Item
                      name="Ansewer"
                      // label="Answer"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Choose answer">
                        <Option value="male">Valid</Option>
                        <Option value="female">Invalid</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Connect4 />
            <Row style={{ margin: '0 8rem 0 8rem' }}>
              <Col span={24}>
                <div className="answer-check-section">
                  <Form style={{ textAlign: 'center' }}>
                    <Form.Item
                      name="Ansewer"
                      // label="Answer"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Choose answer">
                        <Option value="male">Valid</Option>
                        <Option value="female">Invalid</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Connect4 />
            <Row style={{ margin: '0 8rem 0 8rem' }}>
              <Col span={24}>
                <div className="answer-check-section">
                  <Form style={{ textAlign: 'center' }}>
                    <Form.Item
                      name="Ansewer"
                      // label="Answer"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Choose answer">
                        <Option value="male">Valid</Option>
                        <Option value="female">Invalid</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        // style={{ backgroundColor: '#6ab5d6' }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

ValidInvalidGame.propTypes = {};

export default memo(ValidInvalidGame);
