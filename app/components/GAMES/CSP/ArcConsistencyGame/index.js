/**
 *
 * ArcConsistencyGame
 *
 */

import React, { memo, useEffect } from 'react';
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
import CustomCard from 'components/CustomCard';
import CustomButton from 'components/atoms/CustomButton';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form/Form';
import Graph from 'components/Graph';
import Affix from 'antd/lib/affix';

function ArcConsistencyGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;

  return (
    <div>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 10, offset: 1 }}>
          {gameData.nodes.map((key, idx) => (
            <CustomCard
              title={
                key[0] + ' - ' + key[1] + ' - ' + (key[2] === 65 ? 'A' : 'D')
              }
            >
              <Row>
                {gameData.word_bag[idx].map((nkey, jdx) => (
                  <Col span={7}>
                    <Button
                      style={{ backgroundColor: 'blue', color: 'white', fontWeight: 700, }}
                      id={`${idx}-${jdx}`}
                      onClick={e => {
                        const newArr = props.value;
                        newArr[idx][jdx] = newArr[idx][jdx] ? false : true;
                        props.setValue(newArr);
                        let target = e.target;
                        if (target.tagName === 'SPAN')
                          target = target.parentElement;
                        if (target.style.backgroundColor === 'yellow') {
                          target.style.backgroundColor = 'blue';
                          target.style.color = 'white';
                        }
                        else {
                          target.style.backgroundColor = 'yellow';
                          target.style.color = 'black';
                        }
                      }}
                    >
                      {nkey}
                    </Button>
                    {evaluatedAnswer &&
                      (evaluatedAnswer.tick_cross[idx][jdx] ? (
                        <CheckCircleFilled
                          style={{ fontSize: '20px', color: 'green' }}
                        />
                      ) : (
                        <CloseCircleFilled
                          style={{ fontSize: '20px', color: 'red' }}
                        />
                      ))}
                  </Col>
                ))}
              </Row>
              <Row>
                {evaluatedAnswer &&
                  (evaluatedAnswer.result[idx] ? (
                    <div>
                      <CheckCircleFilled
                        style={{ fontSize: '20px', color: 'green' }}
                      />
                      <Paragraph>You made its domain arc consistent</Paragraph>
                    </div>
                  ) : (
                    <div>
                      <CloseCircleFilled
                        style={{ fontSize: '20px', color: 'red' }}
                      />
                      <Paragraph>You could not make the domain arc consistent</Paragraph>
                    </div>
                  ))}
              </Row>
            </CustomCard>
          ))}
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 11, offset: 1 }}>
          <Affix offsetTop={60}>
            <Crossword grid={gameData.grid} />
            <Row>
              <Col>
                <CustomButton disableOnClick onClick={props.submit}>Check Answer</CustomButton>
              </Col>
              {evaluatedAnswer &&
                <Col span={24}>
                  <Title level={3}>{"Score : " + Math.round(evaluatedAnswer.score * 100) + "%"}</Title>
                </Col>
              }
            </Row>
          </Affix>
        </Col>
      </Row>
      {evaluatedAnswer && (
        <Row>
          <Col xs={{ span: 24 }} xl={{ span: 10, offset: 1 }}>
            <Graph gameData={evaluatedAnswer} width={'60'} />
          </Col>
        </Row>
      )
        //sdf
      }
    </div>
  );
}

ArcConsistencyGame.propTypes = {};

export default memo(ArcConsistencyGame);
