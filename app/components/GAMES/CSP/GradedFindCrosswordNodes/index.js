/**
 *
 * GradedFindCrosswordNodes
 *
 */

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import ExamNavigator from 'components/ExamNavigator';
import CustomCard from 'components/CustomCard';

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
import FormFindCrosswordNodes from '../FormFindCrosswordNodes';

function GradedFindCrosswordNodes(props) {
  const { gameData } = props;
  const { currentLevel } = props;
  const { evaluatedAnswer } = props;

  return (
    <Row style={{ padding: '40px', width: '100%' }}>
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
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
      <Col xs={{ span: 24 }} xl={{ span: 6 }} style={{ padding: '20px' }}>
        <Crossword grid={gameData[currentLevel].grid} />
      </Col>

      <Col
        xs={{ span: 24 }}
        xl={{ span: 13 }}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}
      >
        <Title level={3} style={{ marginBottom: '20px' }}>
          Find all the crossword nodes:{' '}
        </Title>
        <FormFindCrosswordNodes
          key={`Number-${currentLevel + 1}`}
          ID={`Number-${currentLevel + 1}`}
          value={props.value}
          setValue={props.setValue}
          currentLevel={currentLevel}
          grid={gameData[currentLevel].grid}
        />
        {evaluatedAnswer && (
          <Row style={{ paddingTop: '40px' }}>
            <Col span={22}>
              <CustomCard title="Summary Report">
                <Col xl={{ span: 24 }} xs={{ span: 24 }}>
                  <Descriptions layout="horizontal" bordered>
                    <Descriptions.Item label="Correctly Answered" span={24}>
                      <Col span={24}>
                        {evaluatedAnswer[props.maxLevel].totalCorrect}
                      </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Wrong Answered" span={24}>
                      <Col span={24}>
                        {evaluatedAnswer[props.maxLevel].totalWrong}
                      </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Missed Nodes" span={24}>
                      <Col span={24}>
                        {evaluatedAnswer[props.maxLevel].totalMissed}
                      </Col>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </CustomCard>
            </Col>
          </Row>
        )}

        {evaluatedAnswer && (
          <Row style={{ paddingTop: '10px', marginTop: '20px' }}>
            <Col span={24} style={{ display: 'flex' }}>
              {evaluatedAnswer[props.maxLevel].score === 1 ? (
                <CheckCircleFilled
                  style={{ fontSize: '20px', color: 'green' }}
                />
              ) : (
                <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
              )}
            </Col>
            <Col span={24}>
              <Title level={3} style={{ marginTop: '4px' }}>
                {`Overall Score : ${Math.round(
                  evaluatedAnswer[props.maxLevel].score,
                )}%`}
              </Title>
              <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                <Descriptions layout="vertical" bordered>
                  <Descriptions.Item label="Correct Nodes">
                    {evaluatedAnswer[currentLevel].correct_nodes_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Wrong Nodes">
                    {evaluatedAnswer[currentLevel].wrong_nodes_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mised Nodes">
                    {evaluatedAnswer[currentLevel].missed_nodes_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
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

GradedFindCrosswordNodes.propTypes = {};

export default memo(GradedFindCrosswordNodes);
