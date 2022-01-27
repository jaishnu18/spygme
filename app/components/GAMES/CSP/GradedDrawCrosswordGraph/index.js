/**
 *
 * GradedDrawCrosswordGraph
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
import FormDrawCrosswordGraph from '../FormDrawCrosswordGraph';

function GradedDrawCrosswordGraph(props) {
  const { gameData } = props;
  const { currentLevel } = props;
  const { evaluatedAnswer } = props;

  const formInstanceArray = [];

  for (let i = 0; i < gameData.length; i += 1) {
    const [form] = Form.useForm();
    formInstanceArray.push(form);
  }

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
        <Crossword grid={gameData[currentLevel].grid} />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 20 }}>
        <FormDrawCrosswordGraph
          key={`Number-${currentLevel + 1}`}
          ID={`Number-${currentLevel + 1}`}
          form={formInstanceArray[currentLevel]}
          value={props.value}
          setValue={props.setValue}
          currentLevel={currentLevel}
          grid={gameData[currentLevel].grid}
          AcrossNodes={props.AcrossNodes}
          DownNodes={props.DownNodes}
        />
      </Col>
    </Row>
  );
}

GradedDrawCrosswordGraph.propTypes = {};

export default memo(GradedDrawCrosswordGraph);
