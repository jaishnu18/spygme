/**
 *
 * GradedCrosswordBacktrackingGame
 *
 */

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo, useEffect } from 'react';
import ExamNavigator from 'components/ExamNavigator';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import DagreGraph from 'components/DagreGraph';
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CustomCard from 'components/CustomCard';
import Descriptions from 'antd/lib/descriptions';
import Affix from 'antd/lib/affix';

const CrosswordBlock = styled.div`
  @media (max-width: 500px) {
    width: 10vw !important;
    height: 10vw !important;
  }

  @media (max-width: 1000px) {
    width: 5vw !important;
    height: 5vw !important;
  }

  width: 2vw !important;
  height: 2vw !important;
`;

function GradedCrosswordBacktrackingGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { currentLevel } = props;
  console.log(props);
  return (
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 4 }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          submit={props.submit}
          value={props.value}
          examDuration={1200}
          evaluatedAnswer={evaluatedAnswer}
          submit={props.submit}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 20 }}>
        <Title level={3}>Match crossword states with node IDs in Backtracking tree</Title>
        <Form name={`Form-${props.currentLevel}`}>
          {gameData[currentLevel].gridStateList.map((grid, ldx) => (
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col span={14}>
                <Row style={{}}>
                  {grid.map((row, idx) => (
                    <Row
                      justify="center"
                      key={`Row-${idx + 1}`}
                      style={{ display: 'flex', width: '100%' }}
                    >
                      {row.map((col, jdx) => (
                        <Col key={`Col-${jdx + 1}`}>
                          <CrosswordBlock
                            style={{
                              border: idx !== 0 && jdx !== 0 && '1px solid grey',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor:
                                idx === 0 || jdx === 0
                                  ? 'transparent'
                                  : col === 35
                                    ? 'black'
                                    : 'white',
                            }}
                          >
                            {col !== 35 && col !== 46 && (
                              <Paragraph>{String.fromCharCode(col)}</Paragraph>
                            )}
                          </CrosswordBlock>
                        </Col>
                      ))}
                    </Row>
                  ))}
                </Row>
              </Col>
              <Col span={7}>
                <Col span={24}>
                  <Form.Item name={`Input-${currentLevel}-${ldx}`}>
                    <InputNumber
                      min="0"
                      onChange={value => {
                        const v = props.value;
                        if (value !== null) {
                          v[currentLevel][ldx] = value;
                          props.setValue(v);
                        } else {
                          v[currentLevel][ldx] = -1;
                          props.setValue(v);
                        }
                      }}
                      style={{ border: '1px solid black' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  {evaluatedAnswer && (
                    evaluatedAnswer[currentLevel].result[ldx] === 1 ? (
                      <Row style={{ paddingBottom: '20px' }}>
                        <Col span={24}>
                          <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                          <Paragraph>{`One of the correct Node ID: ${evaluatedAnswer[currentLevel].orderList[ldx]}`}</Paragraph>
                        </Col>
                      </Row>
                    ) :
                      (
                        <Row style={{ paddingBottom: '20px' }}>
                          <Col span={24}>
                            <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                            <Paragraph>{evaluatedAnswer[currentLevel].result[ldx] === 0 ? 'Wrong ID' : (evaluatedAnswer[currentLevel].result[ldx] === -1 ? 'No appropriate parent found' : 'ID Already used')}</Paragraph>
                            <Paragraph>{`One of the correct Node ID: ${evaluatedAnswer[currentLevel].orderList[ldx]}`}</Paragraph>
                          </Col>
                        </Row>
                      )
                  )}
                </Col>
              </Col>
            </Row>
          ))}
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Affix offsetTop={150}>
              <Form.Item name={`Graph-${currentLevel}`}>
                <DagreGraph gameData={gameData[currentLevel]} />
              </Form.Item>
            </Affix>
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
        </Form>

      </Col>
    </Row>
  )
}

GradedCrosswordBacktrackingGame.propTypes = {};

export default memo(GradedCrosswordBacktrackingGame);
