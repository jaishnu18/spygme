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
import FormFindCrosswordNodes from '../FormFindCrosswordNodes';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';

function GradedFindCrosswordNodes(props) {
  const { gameData } = props;
  const { currentLevel } = props;

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
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 8 }}>
        Crossword
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 12 }}>
        <FormFindCrosswordNodes
          key={`Number-${currentLevel + 1}`}
          ID={`Number-${currentLevel + 1}`}
          form={formInstanceArray[currentLevel]}
          value={props.value}
          setValue={props.setValue}
          currentLevel={currentLevel}
        />
      </Col>
    </Row>
  );
}

GradedFindCrosswordNodes.propTypes = {};

export default memo(GradedFindCrosswordNodes);
