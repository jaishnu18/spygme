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
import Chatbot from '../components/Chatbot';
// import GameDescription from '../../../GameDescription';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import useMediaQuery from '../../../../utils/useMediaQuery';

function ValidInvalidGame(props) {
  const { Option } = Select;
  const { gameData } = props;

  // chatbot
  const [active, setActive] = useState(0);
  const [userResponse, setUserRespone] = useState();
  function handleChatbot() {
    setActive(0);
  }

  // board1

  // const [{ ROW_COUNT, COLUMN_COUNT, state, board }] = props.gameData;
  const [answer, setAnswer] = useState(0);
  const [disable, setDisable] = useState(0);

  console.log('userResponse', userResponse);

  const handleAnswer = e => {
    const getAnswer = e;
    setAnswer(getAnswer);
    setUserRespone(parseInt(getAnswer, 10));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setDisable(1);
    setActive(1);
  };

  // console.log({ ROW_COUNT, COLUMN_COUNT, state, board });

  // board2

  const [answer1, setAnswer1] = useState(0);
  const [disable1, setDisable1] = useState(0);

  const handleAnswer1 = e => {
    const getAnswer = e;
    setAnswer1(getAnswer);
    setUserRespone(parseInt(getAnswer, 10));
  };
  const handleSubmit1 = e => {
    e.preventDefault();
    setDisable1(1);
    setActive(1);
  };

  // board3 data

  const [answer2, setAnswer2] = useState(0);
  const [disable2, setDisable2] = useState(0);

  const handleAnswer2 = e => {
    const getAnswer = e;
    setAnswer2(getAnswer);
    setUserRespone(parseInt(getAnswer, 10));
  };
  const handleSubmit2 = e => {
    e.preventDefault();
    setDisable2(1);
    setActive(1);
  };

  // const { evaluatedAnswer } = props;
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <div className="main-div">
      <Chatbot
        isActive={active}
        getData={handleChatbot}
        getResponse={userResponse}
      />
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
              board is a valid board. However, if both players are winning, then
              it is an invalid state. If only the first player wins, then the
              user again checks the difference between the number of coins of
              the first-move player and the opponent. If the difference is 1,
              then the board is valid, otherwise, it is invalid. If only the
              opponent wins, then if this difference is 0, then the board is
              valid, otherwise, it is invalid. <br />
              If the first move is kept anonymous, then the user checks the
              winning condition. If there is no player winning, then the board
              is a valid board. However, if both players are winning, then it is
              an invalid state. If only one player wins, then the user checks
              the difference between the number of coins of the winner and the
              opponent. If this difference is -1, then the board is invalid. If
              this difference is either 0 or 1, then the board is valid.
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
        <Row style={{ paddingBottom: isDesktop ? '70px' : '0' }}>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Connect4 board={gameData[0].board} />
            <div className="First-move">
              <Row
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: '10px',
                }}
                justify="center"
              >
                <Col span={24}>
                  <div>
                    <P>First move: Red</P>
                  </div>
                </Col>
              </Row>
            </div>
            <Row style={{ margin: '0 8rem 0 8rem' }}>
              <Col span={24}>
                <div className="answer-check-section">
                  <Form
                    style={{ textAlign: 'center' }}
                    onSubmitCapture={handleSubmit}
                  >
                    <Form.Item
                      name="Ansewer"
                      // label="Answer"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Choose answer"
                        disabled={disable}
                        onChange={e => handleAnswer(e)}
                      >
                        <Option value="1">Valid</Option>
                        <Option value="0">Invalid</Option>
                        {/* <Option value="not_sure">Not sure</Option> */}
                      </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={disable}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
            {disable === 1 && (
              <Row justify="center" style={{ paddingBottom: '40px' }}>
                <Col>
                  {answer === gameData[0].state.toString() ? (
                    <P>Your answer is correct!</P>
                  ) : (
                    <P>Your answer is incorrect!</P>
                  )}
                </Col>
              </Row>
            )}
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Connect4 board={gameData[1].board} />
            <div className="First-move">
              <Row
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: '10px',
                }}
                justify="center"
              >
                <Col span={24}>
                  <div>
                    <P>First move: Red</P>
                  </div>
                </Col>
              </Row>
            </div>
            <Row style={{ margin: '0 8rem 0 8rem' }}>
              <Col span={24}>
                <div className="answer-check-section">
                  <Form
                    style={{ textAlign: 'center' }}
                    onSubmitCapture={handleSubmit1}
                  >
                    <Form.Item
                      name="Ansewer"
                      // label="Answer"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Choose answer"
                        disabled={disable1}
                        onChange={e => handleAnswer1(e)}
                      >
                        <Option value="1">Valid</Option>
                        <Option value="0">Invalid</Option>
                        {/* <Option value="not_sure">Not sure</Option> */}
                      </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={disable1}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
            {disable1 === 1 && (
              <Row justify="center" style={{ paddingBottom: '40px' }}>
                <Col>
                  {answer1 === gameData[1].state.toString() ? (
                    <P>Your answer is correct!</P>
                  ) : (
                    <P>Your answer is incorrect!</P>
                  )}
                </Col>
              </Row>
            )}
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Connect4 board={gameData[2].board} />
            <div className="First-move">
              <Row
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: '10px',
                }}
                justify="center"
              >
                <Col span={24}>
                  <div>
                    <P>First move: Red</P>
                  </div>
                </Col>
              </Row>
            </div>
            <Row style={{ margin: '0 8rem 0 8rem' }}>
              <Col span={24}>
                <div className="answer-check-section">
                  <Form
                    style={{ textAlign: 'center' }}
                    onSubmitCapture={handleSubmit2}
                  >
                    <Form.Item
                      name="Ansewer"
                      // label="Answer"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Choose answer"
                        disabled={disable2}
                        onChange={e => handleAnswer2(e)}
                      >
                        <Option value="1">Valid</Option>
                        <Option value="0">Invalid</Option>
                        {/* <Option value="not_sure">Not sure</Option> */}
                      </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        // style={{ backgroundColor: '#6ab5d6' }}
                        disabled={disable2}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
            {disable2 === 1 && (
              <Row justify="center" style={{ paddingBottom: '40px' }}>
                <Col>
                  {answer2 === gameData[2].state.toString() ? (
                    <P>Your answer is correct!</P>
                  ) : (
                    <P>Your answer is incorrect!</P>
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

ValidInvalidGame.propTypes = {};

export default memo(ValidInvalidGame);
