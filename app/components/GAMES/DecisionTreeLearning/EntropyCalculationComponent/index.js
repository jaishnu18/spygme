/**
 *
 * EntropyCalculationComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import { InputNumber } from 'antd';
import H1 from 'components/atoms/H1';
import PracticeGamesFeedback from 'components/FEEDBACK/PracticeGamesFeedback';
import PracticeGameStats from 'components/PracticeGameStats';
import TimeClock from 'components/TimeClock';
import GameDescription from 'components/GameDescription';
import EntropyBucket from 'components/EntropyBucket';
import useMediaQuery from 'utils/useMediaQuery';

function EntropyCalculationComponent(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const [form] = Form.useForm();
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const FeedBack = __evaluatedAnswer =>
    __evaluatedAnswer && (
      <>
        <H1 fontWeight="700" textAlign="center" style={{ margin: '40px 0' }}>
          FEEDBACK
        </H1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isDesktop && '40px',
          }}
          onMouseEnter={e =>
            props.setMovement([
              ...props.movement,
              {
                location: 'Feedback',
                timestamp: new Date(),
                x: e.screenX,
                y: e.screenY,
              },
            ])
          }
        >
          <PracticeGamesFeedback
            movement={props.movement}
            setMovement={props.setMovement}
            whatWentWrong={__evaluatedAnswer.score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </>
    );

  return (
    gameData && (
      <Row>
        <Col xl={{ span: 12 }} xs={{ span: 24 }}>
          <div
            style={{
              padding: isDesktop ? '200px 40px 0px 40px' : '50px 0px 50px 0px',
            }}
            onMouseEnter={e =>
              props.setMovement([
                ...props.movement,
                {
                  location: 'Entropy Component',
                  timestamp: new Date(),
                  x: e.screenX,
                  y: e.screenY,
                },
              ])
            }
          >
            <EntropyBucket bucket={gameData.bucket} />
          </div>
          {isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
        </Col>
        <Col xl={{ span: 12 }} xs={{ span: 24 }}>
          <Row style={{ marginBottom: '40px' }}>
            <Col
              xs={{ span: 24 }}
              xl={{ span: 14 }}
              style={{ display: 'flex', alignItems: 'flex-end' }}
            >
              <PracticeGameStats
                maxLevel={3}
                level={props.level}
                attempts={gameData.attempt}
              />
            </Col>
            <Col
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
                evaluatedAnswer={evaluatedAnswer}
                active={!evaluatedAnswer}
              />
            </Col>
          </Row>
          <GameDescription
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
            movement={props.movement}
            setMovement={props.setMovement}
          />
          {!evaluatedAnswer && (
            <div style={{ padding: '40px' }}>
              <h2>Enter the entropy of the bucket: </h2>
              <Form
                form={form}
                name={`Form-${props.ID || ''}`}
                autoComplete="off"
                onFinish={value => {
                  props.submit(value);
                }}
                onMouseEnter={e =>
                  props.setMovement([
                    ...props.movement,
                    {
                      location: 'Input Fields',
                      timestamp: new Date(),
                      x: e.screenX,
                      y: e.screenY,
                    },
                  ])
                }
              >
                <Form.Item
                  label="Entropy: "
                  name="entropy"
                  fieldKey="entropy_key"
                  rules={[
                    {
                      required: true,
                      message: 'Answer Required',
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Button
                  key="entropy_button"
                  style={{
                    width: '140px',
                    marginTop: '20px',
                    backgroundColor: 'var(--primaryColor)',
                    color: 'white',
                  }}
                  htmlType="submit"
                  disabled={evaluatedAnswer}
                  onMouseEnter={e =>
                    props.setMovement([
                      ...props.movement,
                      {
                        location: 'Submit Answer',
                        timestamp: new Date(),
                        x: e.screenX,
                        y: e.screenY,
                      },
                    ])
                  }
                >
                  Check Answer
                </Button>
              </Form>
            </div>
          )}
          <div style={{ padding: '40px' }}>
            {evaluatedAnswer && (
              <div
                onMouseEnter={e =>
                  props.setMovement([
                    ...props.movement,
                    {
                      location: 'Solution',
                      timestamp: new Date(),
                      x: e.screenX,
                      y: e.screenY,
                    },
                  ])
                }
              >
                {evaluatedAnswer.evaluation === 'CORRECT' ? (
                  <h3>Correct Answer!</h3>
                ) : (
                  <h3>Incorrect! The answer is {evaluatedAnswer.answer}</h3>
                )}
              </div>
            )}
          </div>
          {!isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
        </Col>
      </Row>
    )
  );
}

EntropyCalculationComponent.propTypes = {};

export default memo(EntropyCalculationComponent);
