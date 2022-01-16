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
import FormFindCrosswordNodes from '../FormFindCrosswordNodes';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function GradedFindCrosswordNodes(props) {
  const { gameData } = props;
  const { currentLevel } = props;

  return (
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 4 }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          submit={props.submit}
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
