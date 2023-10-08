/**
 *
 * WhatIsTheDecisionComponent
 *
 */

import React, { memo, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import { Select, Table, Row, Col } from 'antd';
import H1 from 'components/atoms/H1';
import PracticeGamesFeedback from 'components/FEEDBACK/PracticeGamesFeedback';
import PracticeGameStats from 'components/PracticeGameStats';
import TimeClock from 'components/TimeClock';
import DecisionTree from 'components/Tree';
import GameDescription from 'components/GameDescription';
import useMediaQuery from 'utils/useMediaQuery';

function WhatIsTheDecisionComponent(props) {
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

  const { dataset } = gameData;
  const { labels } = gameData;
  const { input } = gameData;

  // Dataset Table
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
    });
  }

  // Input Table
  let inputRow = { key: 'input-row' };
  for (let i = 0; i < labels.length - 1; i++) {
    inputRow[labels[i]] = input[i];
  }
  inputRow[labels[labels.length - 1]] = '?';
  let inputDataSource = [inputRow];

  let inputColumns = [];
  for (const label of labels) {
    inputColumns.push({
      title: label,
      dataIndex: label,
      key: label,
    })
  }

  // binary decision tree only
  const selectOptions = [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' },
  ];

  return (
    gameData && (
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
                  location: 'WhatIsTheDecision Component',
                  timestamp: new Date(),
                  x: e.screenX,
                  y: e.screenY,
                },
              ])
            }
          >
            <Table
              style={{ padding: '10px 0px 40px 10px', whiteSpace: 'pre' }}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered={true}
              scroll={{ x: true }}
            />
          </div>

          {evaluatedAnswer && (
            <DecisionTree
              adjList={evaluatedAnswer.adjList}
              nodeLabels={evaluatedAnswer.nodeLabels}
            />
          )}

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

          <div style={{ padding: '40px', overflow: 'auto' }}>
            <h2>Select the final decision for the following input:</h2>
            <div>
              <Table
                style={{ whiteSpace: 'pre' }}
                scroll={{ x: true }}
                dataSource={inputDataSource}
                columns={inputColumns}
                pagination={false}
                bordered={true}
              />
            </div>
            {!evaluatedAnswer && (
              <Form
                style={{ paddingTop: '40px' }}
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
                  name="output"
                  label="Decision"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a decision.',
                    },
                  ]}
                >
                  <Select
                    placeholder={'select'}
                    style={{ width: '90px' }}
                    options={selectOptions}
                    disabled={evaluatedAnswer}
                  />
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
                  <h3>Incorrect! The answer is <string>{evaluatedAnswer.answer}</string>.</h3>
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

WhatIsTheDecisionComponent.propTypes = {};

export default memo(WhatIsTheDecisionComponent);
