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
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';

const { Title } = Typography;
const { Paragraph } = Typography;

function ExpressionEvaluationGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;

  gameData.ptr = 0;
  gameData.ptr2 = 0;

  return (
    <>
      <Row>
        <Col offset={1} style={{ padding: '10px' }} span={11}>
          <div>
            <Title level={3}>Evaluate the expression: </Title>
            <Title level={4} style={{ fontWeight: 400 }}>
              {gameData.expression}
            </Title>
            <Title level={4} style={{ fontWeight: 400 }}>
              {"where " +
                (
                  gameData.content.map((key, idx) => (
                    key.match(/[a-z]/i) ? key + " = " + gameData.values[idx] : ""
                  )))}
            </Title>

            <InputNumber
              onChange={e => {
                props.setValue(e);
              }}
            />
            <CustomButton
            disableOnClick
              onClick={e => {
                props.submit();
              }}
            >
              Check Answer
            </CustomButton>
            {evaluatedAnswer ? (
              <Row style={{ paddingTop: '10px' }}>
                <Col span={24} style={{ display: 'flex' }}>
                  {
                    evaluatedAnswer.score === 1 ?
                      <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                      :
                      <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />

                  }
                  <Paragraph style={{ paddingLeft: '10px' }}>{evaluatedAnswer.score === 1 ? "" : "Correct Answer : " + evaluatedAnswer.answer}</Paragraph>
                </Col>
                <Col span={24}>
                  <Title level={3}>{"Score : " + Math.round(evaluatedAnswer.score * 100) + "%"}</Title>
                </Col>
              </Row>
            ) : null}
          </div>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 12 }}>
          <Graph
            level={props.level}
            animate={props.animate}
            visualize={props.visualize}
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
          />
        </Col>
      </Row>
    </>
  );
}

ExpressionEvaluationGame.propTypes = {};

export default memo(ExpressionEvaluationGame);
