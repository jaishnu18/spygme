/**
 *
 * MatchExpressionGame
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

function MatchExpressionGame(props) {
  const { gameData } = props;
  const { exp_to_display } = gameData;
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 10, offset: 2 }}>
          <div>
            <Title level={3}>Match each expression with their node ID: </Title>
            {
              exp_to_display ?
                (
                  exp_to_display.map((exp, idx) => (
                    <Row style={{ display: 'flex' }}>
                      <Col span={18}>
                        <Title level={4} code>{exp}</Title>
                      </Col>
                      <Col span={4}>
                        <InputNumber 
                        onChange={e => {
                          const arr=props.value;
                          arr[idx]=e;
                          props.setValue(arr);
                        }} />
                      </Col>
                    </Row>
                  )
                  )
                ) : null
            }
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
            nodeID
          />
        </Col>
      </Row>
    </>
  );
}

MatchExpressionGame.propTypes = {};

export default memo(MatchExpressionGame);
