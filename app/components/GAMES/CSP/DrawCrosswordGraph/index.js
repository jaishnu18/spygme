/**
 *
 * DrawCrosswordGraph
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Crossword from 'components/Crossword';

// import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';
import notification from 'antd/lib/notification';
import Paragraph from 'antd/lib/typography/Paragraph';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Title from 'antd/lib/typography/Title';
import Affix from 'antd/lib/affix';

import GameDescription from 'components/GameDescription';
import TimeClock from 'components/TimeClock';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import PracticeGameStats from '../../../PracticeGameStats';

import useMediaQuery from '../../../../utils/useMediaQuery';
import PracticeGamesFeedback from '../../../FEEDBACK/PracticeGamesFeedback';

const { Option } = Select;
function DrawCrosswordGraph(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const isDesktop = useMediaQuery('(min-width: 960px)');
  const [form] = Form.useForm();

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

  return (
    <Row>
      <Col xl={{ span: 12 }} xs={{ span: 24 }}>
        <div style={{ padding: isDesktop ? '0 40px' : '0px' }}>
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
          >
            <PracticeGameStats
              maxLevel={4}
              level={props.level}
              attempts={props.attempts}
            />
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <TimeClock
              evaluatedAnswer={props.evaluatedAnswer}
              active={!props.evaluatedAnswer}
            />
          </Col>
        </Row>
        <GameDescription
          gameData={gameData}
          evaluatedAnswer={evaluatedAnswer}
        />
        <div style={{ padding: '40px' }}>
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={values => {
              props.setValue(values);
              props.submit(values);
            }}
            initialValues={props.value}
            autoComplete="off"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Form.List shouldUpdate name="nodes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area ||
                          prevValues.sights !== curValues.sights
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            label={index >= 0 ? 'Across' : ''}
                            name={[field.name, 'across']}
                            fieldKey={[field.fieldKey, 'node']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Node',
                              },
                            ]}
                          >
                            <Select style={{ width: 130 }}>
                              {props.AcrossNodes.map((item, index) => (
                                <Option key={index} value={item}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                      </Form.Item>
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area ||
                          prevValues.sights !== curValues.sights
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            label={index >= 0 ? 'Down' : ''}
                            name={[field.name, 'down']}
                            fieldKey={[field.fieldKey, 'node']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Node',
                              },
                            ]}
                          >
                            <Select style={{ width: 130 }}>
                              {props.DownNodes.map((item, index) => (
                                <Option key={index} value={item}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                      </Form.Item>

                      {index > 0 && (
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      )}
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      style={{ width: '20%' }}
                      type="dashed"
                      onClick={() => add()}
                      block
                    >
                      Add Edge
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item offset="3">
              <Button
                style={{
                  width: '140px',
                  marginTop: '20px',
                  backgroundColor: 'var(--primaryColor)',
                  color: 'white',
                }}
                htmlType="submit"
                disabled={evaluatedAnswer}
              >
                Check Answer
              </Button>
            </Form.Item>
          </Form>
          {evaluatedAnswer && (
            <Row style={{ paddingTop: '10px' }}>
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
                    labelStyle={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--primaryColor)',
                    }}
                    layout="vertical"
                    bordered
                  >
                    <Descriptions.Item
                      style={{
                        fontSize: '18px',
                        color: 'var(--primaryColor)',
                      }}
                      label="Correct Edges"
                    >
                      {evaluatedAnswer.correct_edges_list.map((key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
                        </Col>
                      ))}
                    </Descriptions.Item>
                    <Descriptions.Item
                      style={{
                        fontSize: '18px',
                        color: 'var(--primaryColor)',
                      }}
                      label="Wrong Edges"
                    >
                      {evaluatedAnswer.wrong_edges_list.map((key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
                        </Col>
                      ))}
                    </Descriptions.Item>
                    <Descriptions.Item
                      style={{
                        fontSize: '18px',
                        color: 'var(--primaryColor)',
                      }}
                      label="Mised Edges"
                    >
                      {evaluatedAnswer.missed_edges_list.map((key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
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

DrawCrosswordGraph.propTypes = {};

export default memo(DrawCrosswordGraph);
