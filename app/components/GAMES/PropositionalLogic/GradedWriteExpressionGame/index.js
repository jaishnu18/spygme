/**
 *
 * GradedWriteExpressionGame
 *
 */

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import ExamNavigator from 'components/ExamNavigator';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Graph from 'components/Graph';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CustomCard from 'components/CustomCard';
import Descriptions from 'antd/lib/descriptions';

function GradedWriteExpressionGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { currentLevel } = props;

  return (
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 4 }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          submit={props.submit}
          value={props.value}
          examDuration={600}
          evaluatedAnswer={evaluatedAnswer}
          submit={props.submit}
        />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 11 }}>
        <Title level={3}>Write the expression depicted by the given graph: </Title>
        <Form
          name={`Form-${props.currentLevel}`}>
          <Form.Item name={`Input-${props.currentLevel}`}>
            <Input onChange={(e) => {
              const newArr = props.value;
              if (e.target.value === '')
                newArr[currentLevel] = '$$$';
              else
                newArr[currentLevel] = e.target.value;
              props.setValue(newArr);
            }} />
          </Form.Item>
          {
            evaluatedAnswer && (
              evaluatedAnswer[currentLevel].syntax_error !== 'No syntax error' ?
                (
                  <Row style={{ paddingTop: '10px' }}>
                    <Col span={24} style={{ display: 'flex' }}>
                      <ExclamationCircleFilled style={{ fontSize: '20px', color: 'yellow' }} />
                      <Paragraph style={{ paddingLeft: '10px' }}>{"Syntax error : " + evaluatedAnswer[currentLevel].syntax_error}</Paragraph>
                    </Col>
                  </Row>
                ) : (
                  <Row style={{ paddingTop: '10px' }}>
                    <Col span={24} style={{ display: 'flex' }}>
                      {
                        evaluatedAnswer[currentLevel].score === 1 ?
                          <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                          : (
                            <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                          )

                      }
                      <Paragraph style={{ paddingLeft: '10px' }}>{evaluatedAnswer[currentLevel].score === 1 ? "" : "One of the correct answer : " + evaluatedAnswer[currentLevel].answer}</Paragraph>
                    </Col>
                  </Row>
                )
            )
          }
        </Form>
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
                    <Descriptions.Item label="Attempted question" span={24}>
                      <Col span={24}>
                        {evaluatedAnswer[props.maxLevel].attempted}
                      </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Not attempted question" span={24}>
                      <Col span={24}>
                        {evaluatedAnswer[props.maxLevel].notAttempted}
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

      <Col xs={{ span: 24 }} xl={{ span: 9 }}>
        <Graph
          gameData={gameData[currentLevel]}
        />
      </Col>
    </Row >
  );
}
GradedWriteExpressionGame.propTypes = {};

export default memo(GradedWriteExpressionGame);
