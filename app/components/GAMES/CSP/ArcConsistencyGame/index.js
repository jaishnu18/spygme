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

import GameDescription from 'components/GameDescription';
import TimeClock from 'components/TimeClock';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import PracticeGameStats from '../../../PracticeGameStats';
import PracticeGamesFeedback from '../../../FEEDBACK/PracticeGamesFeedback';

import useMediaQuery from '../../../../utils/useMediaQuery';

function ArcConsistencyGame(props) {
  const { gameData } = props;
  console.log('123', gameData);
  const { evaluatedAnswer } = props;

  const isDesktop = useMediaQuery('(min-width: 960px)');

  const FeedBack = __evaluatedAnswer =>
    __evaluatedAnswer && (
      <>
        <H1
          // level={3}
          fontWeight="700"
          textAlign="center"
          style={{ margin: '40px 0' }}
        >
          FEEDBACK
        </H1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isDesktop && '40px',
          }}
        >
          <PracticeGamesFeedback
            whatWentWrong={__evaluatedAnswer.score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </>
    );

  return (
    <div>
      <Row>
        <Col xl={{ span: 12 }} xs={{ span: 24 }}>
          {isDesktop && (
            <Affix offsetTop={250}>
              <div style={{ padding: isDesktop ? '0 40px' : '0px' }}>
                <Crossword grid={gameData.grid} />
              </div>
            </Affix>
          )}
        </Col>
        <Col xl={{ span: 12 }} xs={{ span: 24 }}>
          <Row style={{ marginBottom: '40px' }}>
            <Col
              xs={{ span: 24 }}
              xl={{ span: 14 }}
              style={{ display: 'flex', alignItems: 'flex-end' }}
            >
              <PracticeGameStats
                maxLevel={2}
                level={props.level}
                attempts={props.attempts}
              />
            </Col>
            <Col xs={{ span: 24 }} xl={{ span: 8 }}>
              <TimeClock
                evaluatedAnswer={props.evaluatedAnswer}
                active={!props.evaluatedAnscomwer}
              />
            </Col>
            comcom9
          </Row>
          <GameDescription
            gameData={props.gameData}
            evaluatedAnswer={evaluatedAnswer}
            // movement={movement}
            // setMovement={setMovement}
          />
          {!isDesktop && (
            <div
              style={{
                padding: isDesktop ? '0 40px' : '0px',
                // position: !isDesktop && 'fixed',
                // width: 'fit-content',
                // height: 'fit-content',
              }}
            >
              <Crossword grid={gameData.grid} />
            </div>
          )}
          <div
            style={{
              padding: '40px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {gameData.nodes.map((key, idx) => (
              <CustomCard
                title={
                  <H1>{`${key[0]} - ${key[1]} - ${
                    key[2] === 65 ? 'A' : 'D'
                  }`}</H1>
                }
                marginBottom="20px"
              >
                <Row gutter={[32, 20]}>
                  {gameData.word_bag[idx].map((nkey, jdx) => (
                    <Col span={7}>
                      <Button
                        style={{
                          backgroundColor: 'blue',
                          color: 'white',
                          fontWeight: 700,
                        }}
                        id={`${idx}-${jdx}`}
                        onClick={e => {
                          const newArr = props.value;
                          newArr[idx][jdx] = !newArr[idx][jdx];
                          props.setValue(newArr);
                          let { target } = e;
                          if (target.tagName === 'SPAN')
                            target = target.parentElement;
                          if (target.style.backgroundColor === 'yellow') {
                            target.style.backgroundColor = 'blue';
                            target.style.color = 'white';
                          } else {
                            target.style.backgroundColor = 'yellow';
                            target.style.color = 'black';
                          }
                        }}
                      >
                        {nkey}
                      </Button>
                      {evaluatedAnswer && (
                        <div style={{ marginLeft: '4px' }}>
                          {evaluatedAnswer.tick_cross[idx][jdx] ? (
                            <Icons src={RightIcon} size="20px" />
                          ) : (
                            <Icons src={WrongIcon} size="20px" />
                          )}
                        </div>
                      )}
                    </Col>
                  ))}
                </Row>
                <Row>
                  {evaluatedAnswer &&
                    (evaluatedAnswer.result[idx] ? (
                      <div style={{ marginTop: '20px' }}>
                        <Icons src={RightIcon} size="20px" />
                        <P>You made its domain arc consistent</P>
                      </div>
                    ) : (
                      <div style={{ marginTop: '20px' }}>
                        <Icons src={WrongIcon} size="20px" />
                        <P>You could not make the domain arc consistent</P>
                      </div>
                    ))}
                </Row>
              </CustomCard>
            ))}
            {evaluatedAnswer && (
              <Col span={24} style={{ margin: '20px 0' }}>
                <H1 fontWeight="700">{`Score : ${Math.round(
                  evaluatedAnswer.score * 100,
                )}%`}</H1>
              </Col>
            )}
            <CustomButton
              fontSize="16px"
              width="150px"
              disabled={evaluatedAnswer}
              onClick={props.submit}
            >
              Check Answer
            </CustomButton>
          </div>

          {evaluatedAnswer && FeedBack(evaluatedAnswer)}
        </Col>
      </Row>
    </div>
  );
}

ArcConsistencyGame.propTypes = {};

export default memo(ArcConsistencyGame);
