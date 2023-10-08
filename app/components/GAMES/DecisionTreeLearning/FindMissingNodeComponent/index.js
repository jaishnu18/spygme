/**
 *
 * FindMissingNodeComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import { Select, Table, Row, Col } from 'antd';
import H1 from 'components/atoms/H1';
import PracticeGamesFeedback from 'components/FEEDBACK/PracticeGamesFeedback';
import PracticeGameStats from 'components/PracticeGameStats';
import TimeClock from 'components/TimeClock';
import GameDescription from 'components/GameDescription';
import DecisionTree from 'components/Tree';
import useMediaQuery from 'utils/useMediaQuery';

function FindMissingNodeComponent(props) {
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
  const { adjList } = gameData;
  const { nodeLabels } = gameData;

  // Input Table
  let dataSource = [];
  let rowKey = 1;
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

  let selectOptions = []
  for (var feature of labels.slice(0, -1)) {
    selectOptions.push({
      value: feature, label: feature
    });
  }

  let decisions = new Set();
  for (const row of dataset) {
    decisions.add(row[labels.length - 1]);
  }

  for (const decision of decisions) {
    selectOptions.push({
      value: decision, label: decision
    });
  }

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
                  location: 'FindMissingNode Component',
                  timestamp: new Date(),
                  x: e.screenX,
                  y: e.screenY,
                },
              ])
            }
          >
            <Table
              style={{ padding: '0px 10px 40px 10px', whiteSpace: 'pre' }}
              scroll={{ x: true }}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered={true}
            />
            <DecisionTree
              adjList={gameData.adjList}
              nodeLabels={gameData.nodeLabels}
            />
          </div>
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
            <h2>Select the missing node's {'(?)'} value of the tree.</h2>
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
                  name="output"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a value for the missing node.',
                    },
                  ]}
                >
                  <Select
                    placeholder='select'
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
                  <h3>Incorrect! The missing node is <strong>{evaluatedAnswer.answer}</strong>.</h3>
                )}
              </div>
            )}
          </div>
          {FeedBack(evaluatedAnswer)}
        </Col>
      </Row>
    )
  );
}

FindMissingNodeComponent.propTypes = {};

export default memo(FindMissingNodeComponent);
