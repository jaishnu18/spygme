/**
 *
 * GradedMatchExpressionGame
 *
 */

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo, useEffect } from 'react';
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

function GradedMatchExpressionGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { currentLevel } = props;

  gameData[currentLevel].ptr = 0;

  return (
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 4 }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          submit={props.submit}
          value={props.value}
          examDuration={300}
          evaluatedAnswer={evaluatedAnswer}
          submit={props.submit}
          {...props}
        />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 11 }}>
        <Title level={3}>Match each expression with their node ID: </Title>
        <Form name={`Form-${props.currentLevel}`}>
          {gameData[currentLevel].exp_to_display &&
            gameData[currentLevel].exp_to_display.map((exp, idx) => (
              <div>
                <Row key={exp} style={{ display: 'flex' }}>
                  <Col span={18}>
                    <Title level={4} code>
                      {exp}
                    </Title>
                  </Col>
                  <Col span={4}>
                    <Form.Item name={`Input-${props.currentLevel}-${idx}`}>
                      <InputNumber
                        onChange={e => {
                          const resArray = props.value;
                          if (e !== null) resArray[currentLevel][idx] = e;
                          else resArray[currentLevel][idx] = -1;
                          props.setValue(resArray);
                          console.log(props.value);
                        }}
                      />
                    </Form.Item>
                    <Col />
                  </Col>
                </Row>
                {evaluatedAnswer &&
                  evaluatedAnswer[currentLevel].correctResponse &&
                  (evaluatedAnswer[currentLevel].correctResponse.includes(
                    idx,
                  ) ? (
                    <Row style={{paddingBottom: '20px' }}>
                      <Col span={24}>
                        <CheckCircleFilled
                          style={{ fontSize: '20px', color: 'green' }}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row style={{paddingBottom: '20px' }}>
                      <Col span={24} style={{ display: 'flex' }}>
                        <CloseCircleFilled
                          style={{ fontSize: '20px', color: 'red' }}
                        />
                        <Paragraph style={{ padding: '10px' }}>
                          {'Correct Node ID : ' +
                            evaluatedAnswer[currentLevel].wrongResponse[
                              gameData[currentLevel].ptr++
                            ][1]}
                        </Paragraph>
                      </Col>
                    </Row>
                  ))}
              </div>
            ))}
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
        <Graph gameData={gameData[currentLevel]} nodeID />
      </Col>
    </Row>
  );
}
GradedMatchExpressionGame.propTypes = {};

export default memo(GradedMatchExpressionGame);
