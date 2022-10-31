/**
 *
 * FindCrosswordNodesGame
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Col from 'antd/lib/col';
import Title from 'antd/lib/typography/Title';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';
import Crossword from 'components/Crossword';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Row from 'antd/lib/row';
// import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import notification from 'antd/lib/notification';
import Affix from 'antd/lib/affix';

import GameDescription from 'components/GameDescription';
import TimeClock from 'components/TimeClock';
import PracticeGameStats from '../../../PracticeGameStats';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import PracticeGamesFeedback from '../../../FEEDBACK/PracticeGamesFeedback';

import useMediaQuery from '../../../../utils/useMediaQuery';

const { Option } = Select;
function FindCrosswordNodesGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const [form] = Form.useForm();
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const Nodes = [
    { label: 'Across Node', val: 65 },
    { label: 'Down Node', val: 68 },
  ];

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
            whatWentWrong={__evaluatedAnswer.score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </>
    );

  return (
    <Row>
      <Col xl={{ span: 12 }} xs={{ span: 24 }}>
        <div
          onMouseEnter={e =>
            props.setMovement([
              ...props.movement,
              {
                location: 'Crossword Component',
                timestamp: new Date(),
                x: e.screenX,
                y: e.screenY,
              },
            ])
          }
          style={{ padding: isDesktop ? '0 40px' : '0px' }}
        >
          <Crossword grid={gameData.grid} />
        </div>
        {isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
      </Col>
      <Col xl={{ span: 12 }} xs={{ span: 24 }}>
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
            <PracticeGameStats
              maxLevel={4}
              level={props.level}
              attempts={props.attempts}
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
              evaluatedAnswer={props.evaluatedAnswer}
              active={!props.evaluatedAnswer}
            />
          </Col>
        </Row>
        <div
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
          <GameDescription
            gameData={props.gameData}
            evaluatedAnswer={evaluatedAnswer}
          />
        </div>
        <div style={{ padding: '40px' }}>
          <Form
            form={form}
            name={`Form-${props.ID || ''}`}
            onFinish={value => {
              props.setValue(value);
              props.submit(value);
            }}
            initialValues={props.value}
            autoComplete="off"
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
            <Form.List
              shouldUpdate
              name="nodes"
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        // noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area ||
                          prevValues.sights !== curValues.sights
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            label={index >= 0 ? 'Direction' : ''}
                            name={[field.name, 'node']}
                            fieldKey={[field.fieldKey, 'node']}
                            rules={[
                              {
                                required: true,
                                message: 'Direction Required',
                              },
                            ]}
                          >
                            <Select style={{ width: 130 }}>
                              {Nodes.map((item, index) => (
                                <Option key={index} value={item.val}>
                                  {item.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label={index >= 0 ? 'Row' : ''}
                        name={[field.name, 'row']}
                        fieldKey={[field.fieldKey, 'row']}
                        rules={[
                          {
                            required: true,
                            message: 'Row Required',
                          },
                        ]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label={index >= 0 ? 'Column' : ''}
                        name={[field.name, 'col']}
                        fieldKey={[field.fieldKey, 'col']}
                        rules={[
                          {
                            required: true,
                            message: 'Column Required',
                          },
                        ]}
                      >
                        <InputNumber />
                      </Form.Item>

                      {index > 0 && (
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      )}
                    </Space>
                  ))}
                  <Row style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button style={{ width: '120px' }} onClick={() => add()}>
                      Add Nodes
                    </Button>
                    <Button
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
                  </Row>
                </>
              )}
            </Form.List>
          </Form>
          {evaluatedAnswer && (
            <Row
              style={{ paddingTop: '10px' }}
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
              <Col span={24} style={{ display: 'flex', margin: '20px 0' }}>
                {evaluatedAnswer.score === 1 ? (
                  <Icons src={RightIcon} size="40px" />
                ) : (
                  <Icons src={WrongIcon} size="40px" />
                )}
                <P style={{ paddingLeft: '10px' }}>
                  {evaluatedAnswer.score === 1
                    ? 'All are correct'
                    : 'All are not correct'}
                </P>
              </Col>
              <Col span={24}>
                <H1 fontWeight="700" style={{ marginBottom: '20px' }}>
                  {`Score : ${Math.round(evaluatedAnswer.score * 100)}%`}
                </H1>
                <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                  <Descriptions
                    layout="vertical"
                    bordered
                    labelStyle={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--primaryColor)',
                    }}
                  >
                    <Descriptions.Item
                      style={{
                        fontSize: '18px',
                        color: 'var(--primaryColor)',
                      }}
                      label="Correct Nodes"
                    >
                      {evaluatedAnswer.correct_nodes_list.map((key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
                        </Col>
                      ))}
                    </Descriptions.Item>
                    <Descriptions.Item
                      style={{
                        fontSize: '18px',
                        color: 'var(--primaryColor)',
                      }}
                      label="Wrong Nodes"
                    >
                      {evaluatedAnswer.wrong_nodes_list.map((key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
                        </Col>
                      ))}
                    </Descriptions.Item>
                    <Descriptions.Item
                      style={{
                        fontSize: '18px',
                        color: 'var(--primaryColor)',
                      }}
                      label="Mised Nodes"
                    >
                      {evaluatedAnswer.missed_nodes_list.map((key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
                        </Col>
                      ))}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Col>
            </Row>
          )}
        </div>
        {!isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

FindCrosswordNodesGame.propTypes = {};

export default memo(FindCrosswordNodesGame);
