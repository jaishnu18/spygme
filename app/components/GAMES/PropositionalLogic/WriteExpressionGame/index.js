/**
 *
 * WriteExpressionGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Graph from 'components/Graph';
import CustomButton from 'components/atoms/CustomButton';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import Typography from 'antd/lib/typography';
import Input from 'antd/lib/input';

const { Title } = Typography;
const { Paragraph } = Typography;

function WriteExpressionGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 13, offset: 1 }} style={{ padding: '10px' }}>
          <div>
            <Title level={3}>Write the expression depicted by the given graph: </Title>
            <Input
              onChange={e => {
                if (e.target.value === '')
                  props.setValue('$');
                else
                  props.setValue(e.target.value);
              }}
            />
            <CustomButton disableOnClick disabled={evaluatedAnswer && evaluatedAnswer.syntax_error === 'No syntax error'}
              onClick={() => {
                props.submit();
              }}
            >
              Check Answer
            </CustomButton>
            {evaluatedAnswer ? (
              evaluatedAnswer.syntax_error !== 'No syntax error' ?
                (
                  <Row style={{ paddingTop: '10px' }}>
                    <Col span={24} style={{ display: 'flex' }}>
                      <ExclamationCircleFilled style={{ fontSize: '20px', color: 'yellow' }} />
                      <Paragraph style={{ paddingLeft: '10px' }}>{"Syntax error : " + evaluatedAnswer.syntax_error}</Paragraph>
                    </Col>
                  </Row>
                ) : (
                  <Row style={{ paddingTop: '10px' }}>
                    <Col span={24} style={{ display: 'flex' }}>
                      {
                        evaluatedAnswer.score === 1 ?
                          <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                          : (
                            <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                          )

                      }
                      <Paragraph style={{ paddingLeft: '10px' }}>{evaluatedAnswer.score === 1 ? "" : "One of the correct answer : " + evaluatedAnswer.answer}</Paragraph>
                    </Col>
                    <Col span={24}>
                      <Title level={3}>{"Score : " + Math.round(evaluatedAnswer.score * 100) + "%"}</Title>
                    </Col>
                  </Row>
                )
            ) : null}
          </div>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 10 }}>
          <Graph
            level={props.level}
            gameData={gameData}
            evaluatedAnswer={props.evaluatedAnswer}
          />
        </Col>
      </Row>
    </>
  );
}

WriteExpressionGame.propTypes = {};

export default memo(WriteExpressionGame);
