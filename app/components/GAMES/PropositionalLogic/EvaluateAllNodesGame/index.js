/**
 *
 * EvaluateAllNodesGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Graph from 'components/Graph';
import CustomButton from 'components/atoms/CustomButton';
import Typography from 'antd/lib/typography';
import InputNumber from 'antd/lib/input-number';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';

const { Title } = Typography;
const { Paragraph } = Typography;

function EvaluateAllNodesGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { values } = gameData;
  return (
    <Row>
      <Col xs={{ span: 24 }} xl={{ span: 13, offset: 1 }} style={{ padding: '10px' }}>
        <div>
          <Title level={3}>Enter value stored in each node after evaluation: </Title>
          <Title level={4} style={{ fontWeight: 400 }}>
            {'Assume  ' +
              gameData.content.map((key, idx) =>
                key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122
                  ? key + ' = ' + gameData.values[idx]
                  : '',
              )}
          </Title>
          {values
            ? values.map((val, idx) => (
              <div>
                <Row key={val} style={{ display: 'flex' }}>
                  <Col span={18}>
                    <Title level={4} code>
                      {"Value at node ID: " + idx}
                    </Title>
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      onChange={e => {
                        const resArray = props.value;
                        if (e !== null)
                          resArray[idx] = e;
                        else
                          resArray[idx] = -1;
                        props.changeResponse(resArray);
                      }}
                    />
                    <Col>

                    </Col>
                  </Col>
                </Row>
                {evaluatedAnswer && evaluatedAnswer.result && (
                  evaluatedAnswer.result[idx] ? (
                    <Row style={{paddingBottom: '20px' }}>
                      <Col span={24}>
                        <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                      </Col>
                    </Row>) : (
                    <Row style={{paddingBottom: '20px' }}>
                      <Col span={24} style={{ display: 'flex' }}>
                        <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                        <Paragraph style={{ paddingLeft: '10px' }}>{"Correct Answer : " + gameData.values[idx]}</Paragraph>
                      </Col>
                    </Row>
                  )
                )}
              </div>

            ))
            : null}
          <CustomButton disableOnClick
            onClick={() => {
              props.submit();
            }}
          >
            Check Answer
          </CustomButton>
          {evaluatedAnswer && (
            <Row style={{ paddingTop: '10px' }}>
              <Title level={3}>{"Score : " + Math.round(evaluatedAnswer.score * 100) + "%"}</Title>
            </Row>
          )}
        </div>
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 10 }}>
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
  );
}

EvaluateAllNodesGame.propTypes = {};

export default memo(EvaluateAllNodesGame);
