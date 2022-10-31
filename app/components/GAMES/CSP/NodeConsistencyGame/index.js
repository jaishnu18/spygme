/**
 *
 * NodeConsistencyGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Crossword from 'components/Crossword';
import CustomCard from 'components/CustomCard';
import CustomButton from 'components/atoms/CustomButton';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form/Form';
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

function NodeConsistencyGame(props) {
  const { gameData } = props;
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
            <div style={{ width: isDesktop ? '60%' : '100%' }}>
              <CustomCard
                title={
                  <H1>
                    {`${key[0]} - ${key[1]} - ${key[2] === 65 ? 'A' : 'D'}`}
                  </H1>
                }
                marginBottom="20px"
              >
                <Row gutter={[32, 20]}>
                  {gameData.shuffled_bag.map((nkey, jdx) => (
                    <Col span={7}>
                      <Button
                        style={{
                          backgroundColor: 'var(--primaryColor)',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '16px',
                          minWidth: '100%',
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
                            target.style.backgroundColor =
                              'var(--primaryColor)';
                            target.style.color = 'white';
                          } else {
                            target.style.backgroundColor = 'yellow';
                            target.style.color = 'black';
                          }
                        }}
                      >
                        {nkey}
                      </Button>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          margin: '8px',
                        }}
                      >
                        {evaluatedAnswer &&
                          (evaluatedAnswer.tick_cross[idx][jdx] ? (
                            <Icons src={RightIcon} size="20px" />
                          ) : (
                            <Icons src={WrongIcon} size="20px" />
                          ))}
                      </div>
                    </Col>
                  ))}
                </Row>
                <Row style={{ marginTop: '24px' }}>
                  {evaluatedAnswer &&
                    (evaluatedAnswer.result[idx] ? (
                      <div>
                        <Icons src={RightIcon} size="40px" />
                        <P>You made its domain node consistent</P>
                      </div>
                    ) : (
                      <div>
                        <Icons src={WrongIcon} size="40px" />
                        <P>You could not make the domain node consistent</P>
                      </div>
                    ))}
                </Row>
              </CustomCard>
            </div>
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
  );
}

NodeConsistencyGame.propTypes = {};

export default memo(NodeConsistencyGame);
