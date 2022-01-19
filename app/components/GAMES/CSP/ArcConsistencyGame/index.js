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


function ArcConsistencyGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;

  return (
    <div>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 10, offset: 1 }}>
          {
            gameData.nodes.map((key, idx) => (
              <CustomCard title={key[0] + " - " + key[1] + " - " + (key[2] === 65 ? "A" : "D")}>
                <Row>
                  {
                    gameData.word_bag[idx].map((nkey, jdx) => (
                      <Col span={7}>
                        <Button style={{ backgroundColor: 'blue', color: 'white' }} id={`${idx}-${jdx}`} onClick={(e) => {
                          const newArr = props.value;
                          newArr[idx][jdx] = newArr[idx][jdx] ? false : true;
                          props.setValue(newArr);
                          let target = e.target;
                          if (target.tagName === 'SPAN')
                            target = target.parentElement;
                          if (target.style.backgroundColor === 'red')
                            target.style.backgroundColor = 'blue';
                          else
                            target.style.backgroundColor = 'red';
                        }}>
                          {nkey}
                        </Button>
                        {
                          evaluatedAnswer && (
                            evaluatedAnswer.tick_cross[idx][jdx] ?
                              <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                              :
                              <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                          )
                        }
                      </Col>
                    ))
                  }
                </Row>
                <Row>
                  {
                    evaluatedAnswer && (
                      evaluatedAnswer.result[idx] ?
                        <div>
                          <CheckCircleFilled style={{ fontSize: '20px', color: 'green' }} />
                          <Paragraph>All choices are correct</Paragraph>
                        </div>
                        :
                        <div>
                          <CloseCircleFilled style={{ fontSize: '20px', color: 'red' }} />
                          <Paragraph>All choices are not correct</Paragraph>
                        </div>
                    )
                  }
                </Row>

              </CustomCard>
            ))
          }
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 11, offset: 1 }}>
          <Crossword grid={gameData.grid} />
          <Row>
            <Col>
              <CustomButton disableOnClick onClick={props.submit}>Check Answer</CustomButton>
            </Col>
          </Row>
        </Col>
      </Row>
      {evaluatedAnswer &&
        <Row>
          <Graph gameData={evaluatedAnswer} width={'60'}/>
        </Row>
        //sdf
      }
    </div>
  );
}

ArcConsistencyGame.propTypes = {};

export default memo(ArcConsistencyGame);
