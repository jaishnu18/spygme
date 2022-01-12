/**
 *
 * ExpressionEvaluationGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Graph from 'components/Graph';
import CustomButton from 'components/atoms/CustomButton';

import Typography from 'antd/lib/typography';
import InputNumber from 'antd/lib/input-number';

const { Title } = Typography;

function ExpressionEvaluationGame(props) {
  const { gameData } = props;
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 10, offset: 2 }}>
          <div>
            <Title level={3}>Evaluate the expression: </Title>
            <Title level={1} style={{ fontWeight: 400 }}>
              {gameData.expression}
            </Title>
            <InputNumber
              onChange={e => {
                props.setValue(e);
              }}
            />
            <CustomButton
              onClick={() => {
                props.submit();
              }}
            >
              Check Answer
            </CustomButton>
          </div>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 12 }}>
          <Graph
            level={props.level}
            animate={props.animate}
            visualize={props.visualize}
            gameData={gameData}
            evaluatedAnswer={props.evaluatedAnswer}
          />
        </Col>
      </Row>
    </>
  );
}

ExpressionEvaluationGame.propTypes = {};

export default memo(ExpressionEvaluationGame);
