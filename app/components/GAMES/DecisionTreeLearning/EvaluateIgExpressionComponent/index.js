/**
 *
 * EvaluateIgExpressionComponent
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import { Table, Row, Col, InputNumber } from 'antd';
import H1 from 'components/atoms/H1';
import PracticeGamesFeedback from 'components/FEEDBACK/PracticeGamesFeedback';
import PracticeGameStats from 'components/PracticeGameStats';
import TimeClock from 'components/TimeClock';
import GameDescription from 'components/GameDescription';
import useMediaQuery from 'utils/useMediaQuery';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';

function EvaluateIgExpressionComponent(props) {
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

  const { labels } = gameData;
  const { dataset } = gameData;
  const { feature1 } = gameData;
  const { feature2 } = gameData;
  const { feature2Value } = gameData;

  // Input Table
  let dataSource = [];
  let rowKey = 1
  for (const row of dataset) {
    let inputRow = {
      key: 'row-' + rowKey,
    };
    for (let i = 0; i < labels.length; i++) {
      inputRow[labels[i]] = row[i];
    }
    dataSource.push(inputRow);
    rowKey++;
  }

  let columns = [];
  for (const label of labels) {
    columns.push({
      title: label,
      dataIndex: label,
      key: label,
    })
  }

  return gameData && (
    <Row>
      <Col xl={{ span: 12 }} xs={{ span: 24 }}>
        <div
          style={{
            padding: isDesktop ? '50px 40px 0px 40px' : '50px 0px 50px 0px',
          }}
          onMouseEnter={e =>
            props.setMovement([
              ...props.movement,
              {
                location: 'EvaluateIGExpression Component',
                timestamp: new Date(),
                x: e.screenX,
                y: e.screenY,
              },
            ])
          }
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered={true}
          />
        </div>
        {isDesktop ? evaluatedAnswer && FeedBack(evaluatedAnswer) : null}
      </Col>
      <Col xl={{ span: 12 }} xs={{ span: 24 }}>
        <Row style={{ marginBottom: '40px' }}>
          <Col
            xs={{ span: 24 }}
            xl={{ span: 14 }}
            style={{ display: 'flex', alignItems: 'flex-end' }}
          >
            <PracticeGameStats
              maxLevel={props.maxLevel}
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

        <div style={{ padding: '40px', overflow: 'auto' }}>
          <h3>
            Find the information gain for the following expression:<br /><br />
            {'IG(' + feature1 + ' | ' + feature2 + ' = ' + feature2Value + ')'}
          </h3>
          {!evaluatedAnswer && (
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
                key='ig'
                name='ig'
                label='Informatio Gain'
                rules={[
                  {
                    required: true,
                    message: 'Please enter the value of information gain.',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Button
                key="submit_button"
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
          )}
        </div>

        {evaluatedAnswer && (
          <div
            style={{ padding: '0px 40px 40px 40px' }}
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
              <h3>Incorrect! Information Gain = <strong>{evaluatedAnswer.answer}</strong>.</h3>
            )}
          </div>
        )}
        {!isDesktop ? evaluatedAnswer && FeedBack(evaluatedAnswer) : null}
      </Col>
    </Row>
  );
}

EvaluateIgExpressionComponent.propTypes = {};

export default memo(EvaluateIgExpressionComponent);
