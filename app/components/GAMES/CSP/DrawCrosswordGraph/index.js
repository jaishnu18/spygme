/**
 *
 * DrawCrosswordGraph
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Title from 'antd/lib/typography/Title';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';
import Crossword from 'components/Crossword';
import FormFindCrosswordNodes from '../FormFindCrosswordNodes';

function DrawCrosswordGraph(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;

  return (
    <Row>
      {/* <Col xl={{ span: 12 }}>
        <Crossword gridSize={gameData.grid_size} grid={gameData.grid} />
      </Col> */}
      <Col
        xl={{ span: 24 }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Row>
          <Col span={12}>
            <Crossword grid={gameData.grid} />
          </Col>
          <Col span={10} offset={2}>
            <FormFindCrosswordNodes {...props} />
          </Col>
        </Row>

        {evaluatedAnswer && (
          <Row style={{ paddingTop: '10px' }}>
            <Col span={24} style={{ display: 'flex' }}>
              {evaluatedAnswer.score === 1 ? (
                <CheckCircleFilled
                  style={{ fontSize: '20px', color: 'green' }}
                />
              ) : (
                <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
              )}
              <Paragraph style={{ paddingLeft: '10px' }}>
                {evaluatedAnswer.score === 1
                  ? 'All are correct'
                  : 'All are not correct'}
              </Paragraph>
            </Col>
            <Col span={24}>
              <Title level={3}>
                {`Score : ${Math.round(evaluatedAnswer.score * 100)}%`}
              </Title>
              <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                <Descriptions layout="vertical" bordered>
                  <Descriptions.Item label="Correct Nodes">
                    {evaluatedAnswer.correct_nodes_list.map((key, idx) => (
                      <Col span={24}>
                        {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                      </Col>
                    ))}
                  </Descriptions.Item>
                  <Descriptions.Item label="Wrong Nodes">
                    {evaluatedAnswer.wrong_nodes_list.map((key, idx) => (
                      <Col span={24}>
                        {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                      </Col>
                    ))}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mised Nodes">
                    {evaluatedAnswer.missed_nodes_list.map((key, idx) => (
                      <Col span={24}>
                        {`${key[0]}-${key[1]}-${key[1] === 65 ? 'A' : 'D'}`}
                      </Col>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}

DrawCrosswordGraph.propTypes = {};

export default memo(DrawCrosswordGraph);
