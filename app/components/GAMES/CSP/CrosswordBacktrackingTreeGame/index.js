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
import InputNumber from 'antd/lib/input-number';
import Crossword from 'components/Crossword';
import CustomCard from 'components/CustomCard';
import CustomButton from 'components/atoms/CustomButton';
import Graph from 'components/Graph';

const CrosswordBlock = styled.div`
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
      <Col xs={{ span: 24 }} xl={{ span: 12 }}>
        {
          gameData.gridStateList.map((grid) => (
            <Row>
              <Col span={20}>
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
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor:
                                idx === 0 || jdx === 0
                                  ? 'transparent'
                                  : col === 35
                                    ? 'black'
                                    : 'white',
                            }}
                          >
                            
                            {
                              col !== 35 && col !== 46 && (
                                <Paragraph>{String.fromCharCode(col)}</Paragraph>
                              )
                            }
                          </CrosswordBlock>
                        </Col>
                      ))}
                    </Row>
                  ))}
                </Row>
              </Col>
              <Col span={3}>

                <InputNumber min="0" />
              </Col>
            </Row>

          ))
        }
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 12 }}>
        <Graph
          gameData={gameData}
          evaluatedAnswer={evaluatedAnswer}
        />
        <CustomButton onClick={props.submit}>
          Check Answer
        </CustomButton>
      </Col>
    </Row>
  )
}

CrosswordBacktrackingTreeGame.propTypes = {};

export default memo(CrosswordBacktrackingTreeGame);
