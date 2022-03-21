/**
 *
 * GradedEvaluateAllNodesGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import ExamNavigator from 'components/ExamNavigator';
import Typography from 'antd/lib/typography';
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import CustomCard from 'components/CustomCard';
import Descriptions from 'antd/lib/descriptions';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';

const { Title } = Typography;
const { Paragraph } = Typography;
import Graph from 'components/Graph';

function GradedEvaluateAllNodesGame(props) {
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
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 11 }}>
        <Title level={3}>Enter value stored in each node after evaluation: </Title>
        <Title level={4} style={{ fontWeight: 400 }}>
          {'Assume  ' +
            gameData[currentLevel].content.map((key, idx) =>
              key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122
                ? key + ' = ' + gameData[currentLevel].values[idx]
                : '',
            )}
        </Title>
        <Form name={`Form-${props.currentLevel}`}>
          {gameData[currentLevel].values &&
            gameData[currentLevel].values.map((val, idx) => (
              <div>
                <Row key={val} style={{ display: 'flex' }}>
                  <Col span={18}>
                    <Title level={4} code>
                      {"Value at node ID: " + idx}
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
                        }}
                      />
                    </Form.Item>
                    <Col>

                    </Col>
                  </Col>
                </Row>
                {evaluatedAnswer && evaluatedAnswer[currentLevel].result && (
                  evaluatedAnswer[currentLevel].result[idx] ? (
                    <Row style={{ paddingBottom: '20px' }}>
                      <Col span={24}>
                        <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                      </Col>
                    </Row>) : (
                    <Row style={{ paddingBottom: '20px' }}>
                      <Col span={24} style={{ display: 'flex' }}>
                        <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                        <Paragraph style={{ paddingLeft: '10px' }}>{"Correct Answer : " + gameData[currentLevel].values[idx]}</Paragraph>
                      </Col>
                    </Row>
                  )
                )}
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

GradedEvaluateAllNodesGame.propTypes = {};

export default memo(GradedEvaluateAllNodesGame);
