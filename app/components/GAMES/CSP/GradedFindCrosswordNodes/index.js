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

  const formInstanceArray = [];

  for (let i = 0; i < gameData.length; i += 1) {
    const [form] = Form.useForm();
    formInstanceArray.push(form);
  }

  console.log(formInstanceArray);

  return (
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 4 }}>
        <NavigationBar
          gradedGame
          currentLevel={currentLevel}
          setCurrentLevel={props.setCurrentLevel}
          maxLevel="3"
          submit={() => {
            props.submit(formInstanceArray);
          }}
        />
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          value={props.value}
        />
        <Crossword grid={gameData.grid} />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 20 }}>
        <FormFindCrosswordNodes
          key={`Number-${currentLevel + 1}`}
          ID={`Number-${currentLevel + 1}`}
          form={formInstanceArray[currentLevel]}
          value={props.value}
          setValue={props.setValue}
          currentLevel={currentLevel}
          grid={gameData[currentLevel].grid}
        />
      </Col>

      {evaluatedAnswer && (
        <Row style={{ paddingTop: '10px' }}>
          <Col span={24} style={{ display: 'flex' }}>
            {evaluatedAnswer[currentLevel].score === 1 ? (
              <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
            ) : (
              <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
            )}
            <Paragraph style={{ paddingLeft: '10px' }}>
              {evaluatedAnswer[currentLevel].score === 1
                ? 'All are correct'
                : 'All are not correct'}
            </Paragraph>
          </Col>
          <Col span={24}>
            <Title level={3}>
              {`Score : ${Math.round(
                evaluatedAnswer[currentLevel].score * 100,
              )}%`}
            </Title>
            <Col xl={{ span: 23 }} xs={{ span: 24 }}>
              <Descriptions layout="vertical" bordered>
                <Descriptions.Item label="Correct Nodes">
                  {evaluatedAnswer[currentLevel].correct_nodes_list.map(
                    (key, idx) => (
                      <Col span={24}>
                        {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                      </Col>
                    ),
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Wrong Nodes">
                  {evaluatedAnswer[currentLevel].wrong_nodes_list.map(
                    (key, idx) => (
                      <Col span={24}>
                        {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                      </Col>
                    ),
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Mised Nodes">
                  {evaluatedAnswer[currentLevel].missed_nodes_list.map(
                    (key, idx) => (
                      <Col span={24}>
                        {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                      </Col>
                    ),
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Col>
        </Row>
      )}
    </Row>
  );
}

GradedFindCrosswordNodes.propTypes = {};

export default memo(GradedFindCrosswordNodes);
