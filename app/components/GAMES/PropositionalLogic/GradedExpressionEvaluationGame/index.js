/**
 *
 * GradedExpressionEvaluationGame
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
import InputNumber from 'antd/lib/input-number';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CustomCard from 'components/CustomCard';
import Descriptions from 'antd/lib/descriptions';
import CountdownCircleTimer from 'react-countdown-circle-timer';

function GradedExpressionEvaluationGame(props) {
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
          evaluatedAnswer={evaluatedAnswer}
          examDuration={300}
          submit={props.submit}
          {...props}
        />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 11 }}>
        <Title level={3}>Evaluate the expression: </Title>
        <Title level={4} style={{ fontWeight: 400 }}>
          {gameData[currentLevel].expression}
        </Title>
        <Title level={4} style={{ fontWeight: 400 }}>
          {'where ' +
            gameData[currentLevel].content.map((key, idx) =>
              key.match(/[a-z]/i)
                ? key + ' = ' + gameData[currentLevel].values[idx]
                : '',
            )}
        </Title>
        <Form name={`Form-${props.currentLevel}`}>
          <Form.Item name={`Input-${props.currentLevel}`}>
            <InputNumber
              onChange={e => {
                const newArr = props.value;
                newArr[currentLevel] = e;
                props.setValue(newArr);
              }}
            />
          </Form.Item>
          {evaluatedAnswer && (
            <Row style={{ paddingTop: '10px' }}>
              <Col span={24} style={{ display: 'flex' }}>
                {evaluatedAnswer[currentLevel].score === 1 ? (
                  <CheckCircleFilled
                    style={{ fontSize: '20px', color: 'green' }}
                  />
                ) : (
                  <CloseCircleFilled
                    style={{ fontSize: '20px', color: 'red' }}
                  />
                )}
                <Paragraph style={{ paddingLeft: '10px' }}>
                  {evaluatedAnswer[currentLevel].score === 1
                    ? ''
                    : 'Correct Answer : ' +
                      evaluatedAnswer[currentLevel].answer}
                </Paragraph>
              </Col>
            </Row>
          )}
        </Form>
        {evaluatedAnswer && (
          <Row style={{ paddingTop: '40px' }}>
            <Col span={22}>
              <CustomCard title="Summary Report">
                <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                  <Descriptions layout="horizontal" bordered>
                    <Descriptions.Item label="Score" span={24}>
                      <Col span={24}>
                        {Math.round(
                          evaluatedAnswer[props.maxLevel].score * 100,
                        ) + '%'}
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
        )}
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 9 }}>
        <Graph gameData={gameData[currentLevel]} />
      </Col>
    </Row>
  );
}
GradedExpressionEvaluationGame.propTypes = {};

export default memo(GradedExpressionEvaluationGame);
