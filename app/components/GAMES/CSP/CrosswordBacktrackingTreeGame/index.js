/**
 *
 * CrosswordBacktrackingTreeGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import styled from 'styled-components';

import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import InputNumber from 'antd/lib/input-number';
import Crossword from 'components/Crossword';
import CustomCard from 'components/CustomCard';
import CustomButton from 'components/atoms/CustomButton';
import Graph from 'components/Graph';
import DagreGraph from 'components/DagreGraph';
import Affix from 'antd/lib/affix';

export const CrosswordBlock = styled.div`
  display: flex;
  justify-content: center !important;
  align-content: center;

  @media (max-width: 500px) {
    width: 10vw !important;
    height: 10vw !important;
  }

  @media (max-width: 1000px) {
    width: 5vw !important;
    height: 5vw !important;
  }

  width: 2vw !important;
  height: 2vw !important;
`;

function CrosswordBacktrackingTreeGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  return (
    <Row>
      <Col xs={{ span: 24 }} xl={{ span: 10 }}>
        <Row style={{ padding: '30px' }} span={24} offset={1}>
          <Title level={3}>
            Match crossword states with node IDs in Backtracking tree
          </Title>
        </Row>
        {gameData.gridStateList.map((grid, ldx) => (
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={14}>
              <Row style={{}}>
                {grid.map((row, idx) => (
                  <Row
                    justify="center"
                    key={`Row-${idx + 1}`}
                    style={{ display: 'flex', width: '100%' }}
                  >
                    {row.map((col, jdx) => (
                      <Col key={`Col-${jdx + 1}`}>
                        <CrosswordBlock
                          style={{
                            border: idx !== 0 && jdx !== 0 && '1px solid grey',
                            backgroundColor:
                              idx === 0 || jdx === 0
                                ? 'transparent'
                                : col === 35
                                ? 'black'
                                : 'white',
                          }}
                        >
                          {col !== 35 && col !== 46 && (
                            <Paragraph>{String.fromCharCode(col)}</Paragraph>
                          )}
                        </CrosswordBlock>
                      </Col>
                    ))}
                  </Row>
                ))}
              </Row>
            </Col>
            <Col span={7}>
              <Col span={24}>
                <InputNumber
                  min="0"
                  onChange={value => {
                    const v = props.value;
                    if (value !== null) {
                      v[ldx] = value;
                      props.setValue(v);
                    } else {
                      v[ldx] = -1;
                      props.setValue(v);
                    }
                  }}
                  style={{ border: '1px solid black' }}
                />
              </Col>
              <Col span={24}>
                {evaluatedAnswer &&
                  (evaluatedAnswer.result[ldx] === 1 ? (
                    <Row style={{ paddingBottom: '20px' }}>
                      <Col span={24}>
                        <CheckCircleFilled
                          style={{ fontSize: '20px', color: 'green' }}
                        />
                        <Paragraph>{`One of the correct Node ID: ${
                          evaluatedAnswer.orderList[ldx]
                        }`}</Paragraph>
                      </Col>
                    </Row>
                  ) : (
                    <Row style={{ paddingBottom: '20px' }}>
                      <Col span={24}>
                        <CloseCircleFilled
                          style={{ fontSize: '20px', color: 'red' }}
                        />
                        <Paragraph>
                          {evaluatedAnswer.result[ldx] === 0
                            ? 'Wrong ID'
                            : evaluatedAnswer.result[ldx] === -1
                            ? 'No appropriate parent found'
                            : 'ID Already used'}
                        </Paragraph>
                        <Paragraph>{`One of the correct Node ID: ${
                          evaluatedAnswer.orderList[ldx]
                        }`}</Paragraph>
                      </Col>
                    </Row>
                  ))}
              </Col>
            </Col>
          </Row>
        ))}
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 3 }} style={{ paddingTop: '50px' }}>
        <Affix offsetTop={150}>
          <CustomButton disableOnClick onClick={props.submit}>
            Check Answer
          </CustomButton>
        </Affix>
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 11 }}>
        <Affix offsetTop={150}>
          <DagreGraph gameData={gameData} evaluatedAnswer={evaluatedAnswer} />
          {evaluatedAnswer && (
            <Row style={{ paddingTop: '10px' }}>
              <Title level={3}>
                {'Score : ' + Math.round(evaluatedAnswer.score * 100) + '%'}
              </Title>
            </Row>
          )}
        </Affix>
      </Col>
    </Row>
  );
}

CrosswordBacktrackingTreeGame.propTypes = {};

export default memo(CrosswordBacktrackingTreeGame);
