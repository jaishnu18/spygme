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
import { useForm } from 'antd/lib/form/Form';

function GradedFindCrosswordNodes(props) {
  const { gameData } = props;
  const { currentLevel } = props;
  const { evaluatedAnswer } = props;

  const array = [];
  for (let i = 0; i < props.currentLevel; i += 1) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = useForm();
    array.push(form);
  }

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
          examDuration={600}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9 }} style={{ padding: '20px' }}>
        <Crossword grid={gameData[currentLevel].grid} />
        {evaluatedAnswer && (
          <Row style={{ paddingTop: '40px', width: '100%' }}>
            <Col span={24}>
              <CustomCard title="Summary Report">
                <Col xl={{ span: 24 }} xs={{ span: 24 }}>
                  <Descriptions layout="horizontal" bordered>
                    <Descriptions.Item label="Score" span={24}>
                      <Col span={24}>
                        {`${Math.round(
                          evaluatedAnswer[props.maxLevel].score * 100,
                        )}%`}
                      </Col>
                    </Descriptions.Item>
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
      </Col>

      <Col
        xs={{ span: 24 }}
        xl={{ span: 10 }}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}
      >
        <Title level={3} style={{ marginBottom: '20px' }}>
          Find all the crossword nodes:{' '}
        </Title>
        <FormFindCrosswordNodes
          form={array[props.currentLevel]}
          key={`Number-${currentLevel + 1}`}
          ID={`Number-${currentLevel + 1}`}
          value={props.value}
          setValue={props.setValue}
          currentLevel={currentLevel}
          grid={gameData[currentLevel].grid}
        />

        {evaluatedAnswer && (
          <Row style={{ paddingTop: '10px', marginTop: '20px' }}>
            <Col span={24}>
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
