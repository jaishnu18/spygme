/**
 *
 * FindSubsetsOfFeatureComponent
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import { Input, Table, Row, Col, Select } from 'antd';
import H1 from 'components/atoms/H1';
import PracticeGamesFeedback from 'components/FEEDBACK/PracticeGamesFeedback';
import PracticeGameStats from 'components/PracticeGameStats';
import TimeClock from 'components/TimeClock';
import GameDescription from 'components/GameDescription';
import useMediaQuery from 'utils/useMediaQuery';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';

function FindSubsetsOfFeatureComponent(props) {
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
  const { feature } = gameData;
  const [rowColors, setRowColors] = useState({});

  function getStyledTable(colors, rowKeyPrefix, enableSelection) {
    // Input Table
    let dataSource = [];
    let rowKey = 1
    for (const row of dataset) {
      let inputRow = {
        key: rowKeyPrefix + rowKey,
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
        render: (text, _, index) => ({
          props: {
            style: {
              background: colors[index] ? colors[index] : 'default',
            },
          },
          children: text,
        })
      })
    }

    if (enableSelection) {
      if (!evaluatedAnswer) {
        columns.push({
          title: 'Color',
          dataIndex: 'color',
          key: 'color',
          render: (_, record, index) => {
            return {
              props: {
                style: {
                  background: colors[index] ? colors[index] : 'default',
                },
              },
              children:
                <Select
                  placeholder='select'
                  style={{ width: '90px' }}
                  onChange={(value) => {
                    setRowColors({ ...rowColors, [index]: value });
                    form.setFieldsValue({ [dataSource[index].key]: value });
                    const values = form.getFieldsValue(true);
                    if (Object.keys(values).length == dataSource.length)
                      form.setFieldsValue({ fsof_done: 'true' });
                  }}
                  options={[
                    { value: 'green', label: 'green' },
                    { value: 'red', label: 'red' },
                    { value: 'blue', label: 'blue' },
                    { value: 'yellow', label: 'yellow' },
                  ]}
                />
            }
          }
        });
      }
      if (evaluatedAnswer) {
        columns.push({
          title: 'Remarks',
          dataIndex: 'color',
          key: 'color',
          render: (_, record, index) => (
            evaluatedAnswer.evaluation[index] === 'INCORRECT' ?
              <Icons src={WrongIcon} size="40px" />
              : <Icons src={RightIcon} size="40px" />
          )
        });
      }
    }

    return [dataSource, columns];
  }

  let [dataSource, columns] = getStyledTable(rowColors, 'row-', true);
  const [answerDataSource, setAnswerDataSource] = useState(undefined);
  const [answerColums, setAnswerColumns] = useState(undefined);

  useEffect(() => {
    if (evaluatedAnswer) {
      const [data, cols] = getStyledTable(evaluatedAnswer.answer, 'answer-row-', false);
      setAnswerDataSource(data);
      setAnswerColumns(cols);
    }
  }, [evaluatedAnswer]);

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
                location: 'FindSubsetsOfFeature Component',
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

          {evaluatedAnswer && answerDataSource && answerColums && (
            evaluatedAnswer.evaluation.includes('INCORRECT') ? (
              <div style={{ paddingTop: '30px' }}>
                <h3>Possible Answer:</h3>
                <Table
                  dataSource={answerDataSource}
                  columns={answerColums}
                  pagination={false}
                  bordered={true}
                />
              </div>
            ) : null
          )}
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
          <h2>Assign colors to the rows of the given table for the feature "<strong>{feature}</strong>"</h2>
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
                key='fsof_done'
                name='fsof_done'
                rules={[
                  {
                    required: true,
                    message: 'Please select colors for all rows.',
                  },
                ]}
              >
                <Input style={{ display: 'none' }} />
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
              {
                dataSource.map((row) => (
                  <Form.Item
                    key={crypto.randomUUID()}
                    name={row.key}
                    style={{ display: 'none' }}
                  >
                    <Input
                      style={{ display: 'none' }} />
                  </Form.Item>
                ))
              }
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
              {!(evaluatedAnswer.evaluation.includes('INCORRECT')) ? (
                <h3>Correct Answer!</h3>
              ) : (
                <h3>Incorrect! Some rows are in the wrong subset.</h3>
              )}
            </div>
          )}
        </div>
        {evaluatedAnswer && FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

FindSubsetsOfFeatureComponent.propTypes = {};

export default memo(FindSubsetsOfFeatureComponent);
