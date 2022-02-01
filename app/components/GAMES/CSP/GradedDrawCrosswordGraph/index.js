/**
 *
 * GradedDrawCrosswordGraph
 *
 */

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import CustomCard from 'components/CustomCard';

import ExamNavigator from 'components/ExamNavigator';
import Form from 'antd/lib/form';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';
import Crossword from 'components/Crossword';
import FormDrawCrosswordGraph from '../FormDrawCrosswordGraph';

function GradedDrawCrosswordGraph(props) {
  const { gameData } = props;
  const { currentLevel } = props;
  const { evaluatedAnswer } = props;

  return (
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }}>
        <NavigationBar
          gradedGame
          currentLevel={currentLevel}
          setCurrentLevel={props.setCurrentLevel}
          maxLevel={3}
          submit={() => {
            props.submit();
          }}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 5 }} style={{ padding: '20px' }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          value={props.value}
          examDuration={300}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9 }} style={{ padding: '20px' }}>
        <Crossword grid={gameData[currentLevel].grid} />
      </Col>

      <Col
        xs={{ span: 24 }}
        xl={{ span: 10 }}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}
      >
        <Title level={3} style={{ marginBottom: '20px' }}>
          Match all the crossword nodes:{' '}
        </Title>
        <FormDrawCrosswordGraph
          key={`Item-D-${props.currentLevel + 1}`}
          ID={`D-Number-${currentLevel + 1}`}
          value={props.value}
          setValue={props.setValue}
          currentLevel={currentLevel}
          grid={gameData[currentLevel].grid}
          AcrossNodes={props.AcrossNodes}
          DownNodes={props.DownNodes}
        />
        {evaluatedAnswer && (
          <Row style={{ paddingTop: '40px' }}>
            <Col span={22}>
              <CustomCard title="Summary Report">
                <Col xl={{ span: 24 }} xs={{ span: 24 }}>
                  <Descriptions layout="horizontal" bordered>
                    <Descriptions.Item label="Score" span={24}>
                      <Col span={24}>
                        {`${Math.round(evaluatedAnswer[0].score * 100)}%`}
                      </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Correctly Answered" span={24}>
                      <Col span={24}>{evaluatedAnswer[0].totalCorrect}</Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Wrong Answered" span={24}>
                      <Col span={24}>{evaluatedAnswer[0].totalWrong}</Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Missed Nodes" span={24}>
                      <Col span={24}>{evaluatedAnswer[0].totalMissed}</Col>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </CustomCard>
            </Col>
          </Row>
        )}
        {evaluatedAnswer && (
          <Row style={{ paddingTop: '10px', marginTop: '10px' }}>
            <Col span={24}>
              <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                <Descriptions layout="vertical" bordered>
                  <Descriptions.Item label="Correct Edges">
                    {evaluatedAnswer[props.currentLevel].correct_edges_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Wrong Edges">
                    {evaluatedAnswer[props.currentLevel].wrong_edges_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mised Edges">
                    {evaluatedAnswer[props.currentLevel].missed_edges_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}

GradedDrawCrosswordGraph.propTypes = {};

export default memo(GradedDrawCrosswordGraph);
