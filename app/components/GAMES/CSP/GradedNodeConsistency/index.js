/**
 *
 * GradedNodeConsistency
 *
 */

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomCard from 'components/CustomCard';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form/Form';
import React, { memo } from 'react';
import Crossword from 'components/Crossword';
import ExamNavigator from 'components/ExamNavigator';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';
import Descriptions from 'antd/lib/descriptions';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function GradedNodeConsistency(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { currentLevel } = props;

  return (
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 4 }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          examDuration={300}
          evaluatedAnswer={evaluatedAnswer}
          submit={props.submit}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 20 }}>
        <Form name={`Form-${currentLevel}`}>
          <Row>
            <Col xs={{ span: 24 }} xl={{ span: 10, offset: 1 }}>
              {
                gameData[currentLevel].nodes.map((key, idx) => (
                  <CustomCard title={key[0] + " - " + key[1] + " - " + (key[2] === 65 ? "A" : "D")}>
                    <Row>
                      {
                        gameData[currentLevel].shuffled_bag.map((nkey, jdx) => (
                          <Col span={6}>
                            <Form.Item name={`Input-${currentLevel}-${idx}-${jdx}`}>
                              <Button style={{ color: 'white', backgroundColor: currentLevel === 0 ? (props.value1[idx][jdx] ? 'blue' : 'red') : (props.value2[idx][jdx] ? 'blue' : 'red') }} onClick={(e) => {
                                if (currentLevel === 0) {
                                  const newArr = props.value1;
                                  newArr[idx][jdx] = newArr[idx][jdx] ? false : true;
                                  props.setValue1(newArr);
                                }
                                else {
                                  const newArr = props.value2;
                                  newArr[idx][jdx] = newArr[idx][jdx] ? false : true;
                                  props.setValue2(newArr);
                                }

                                let target = e.target;
                                if (target.tagName === 'SPAN')
                                  target = target.parentElement;
                                if (target.style.backgroundColor === 'red')
                                  target.style.backgroundColor = 'blue';
                                else
                                  target.style.backgroundColor = 'red';
                              }}>
                                {nkey}
                              </Button>
                            </Form.Item>
                            {
                              evaluatedAnswer && (
                                evaluatedAnswer[currentLevel].tick_cross[idx][jdx] ?
                                  <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                                  :
                                  <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                              )
                            }
                          </Col>
                        ))
                      }
                    </Row>
                    <Row>
                      {
                        evaluatedAnswer && (
                          evaluatedAnswer[currentLevel].result[idx] ?
                            <div>
                              <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                              <Paragraph>All choices are correct</Paragraph>
                            </div>
                            :
                            <div>
                              <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                              <Paragraph>All choices are not correct</Paragraph>
                            </div>
                        )
                      }
                    </Row>
                  </CustomCard>
                ))
              }
            </Col>
            <Col xs={{ span: 24 }} xl={{ span: 11, offset: 1 }}>
              <Crossword grid={gameData[currentLevel].grid} />
              {evaluatedAnswer &&
                <Row style={{ paddingTop: '40px' }}>
                  <Col span={22}>
                    <CustomCard title="Summary Report">
                      <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                        <Descriptions layout="horizontal" bordered>
                          <Descriptions.Item label="Score" span={24}>
                            <Col span={24}>
                              {Math.round(evaluatedAnswer[props.maxLevel].score * 100) + "%"}
                            </Col>
                          </Descriptions.Item>
                          <Descriptions.Item label="Correctly Answered" span={24}>
                            <Col span={24}>
                              {evaluatedAnswer[props.maxLevel].correctlyAnswered}
                            </Col>
                          </Descriptions.Item>
                          <Descriptions.Item label="Wrong Answered" span={24}>
                            <Col span={24}>
                              {evaluatedAnswer[props.maxLevel].wrongAnswered}
                            </Col>
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                    </CustomCard>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

GradedNodeConsistency.propTypes = {};

export default memo(GradedNodeConsistency);
