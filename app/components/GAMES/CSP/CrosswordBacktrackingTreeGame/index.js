/* eslint-disable no-nested-ternary */
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
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import GameDescription from 'components/GameDescription';
import TimeClock from 'components/TimeClock';

import PracticeGamesFeedback from 'components/FEEDBACK/PracticeGamesFeedback';
import PracticeGameStats from '../../../PracticeGameStats';

import useMediaQuery from '../../../../utils/useMediaQuery';

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
      <Col xs={{ span: 24 }} xl={{ span: 10 }}>
        <div style={{ padding: isDesktop ? '0 40px' : '0px' }}>
          {isDesktop ? (
            <Affix offsetTop={50}>
              <DagreGraph
                gameData={gameData}
                evaluatedAnswer={evaluatedAnswer}
              />
            </Affix>
          ) : (
            <DagreGraph gameData={gameData} evaluatedAnswer={evaluatedAnswer} />
          )}
        </div>
      </Col>
      <Col xl={{ span: 14 }} xs={{ span: 24 }}>
        <Row style={{ marginBottom: '40px' }}>
          <Col
            xs={{ span: 24 }}
            xl={{ span: 14 }}
            style={{ display: 'flex', alignItems: 'flex-end' }}
          >
            <PracticeGameStats
              maxLevel={3}
              level={props.level}
              attempts={props.attempts}
            />
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <TimeClock
              evaluatedAnswer={props.evaluatedAnswer}
              active={!props.evaluatedAnswer}
            />
          </Col>
        </Row>
        <GameDescription
          gameData={gameData}
          evaluatedAnswer={evaluatedAnswer}
        />
        <div style={{ padding: isDesktop ? '0 30px' : '20px' }}>
          <H1 fontWeight="700">
            Match crossword states with node IDs in Backtracking tree
          </H1>
          <CustomButton
            marginTop="50px 0"
            disabled={evaluatedAnswer}
            onClick={props.submit}
          >
            Check Answer
          </CustomButton>

          {gameData.gridStateList.map((grid, ldx) => (
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: '1px solid black',
                margin: '16px',
                paddingBottom: '28px',
              }}
            >
              <Col span={10}>
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
              </Col>
              <Col span={10}>
                <InputNumber
                  min="0"
                  placeholder={'Enter the Value'}
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
                  style={{
                    border: 'none',
                    borderBottom: '1px solid grey',
                    width: '90%',
                  }}
                />

                {evaluatedAnswer &&
                  (evaluatedAnswer.result[ldx] === 1 ? (
                    <Row style={{ marginTop: '20px' }}>
                      <Col span={24}>
                        <Icons src={RightIcon} size="40px" />
                        <P
                          fontsize={!isDesktop && '14'}
                        >{`One of the correct Node ID: ${
                          evaluatedAnswer.orderList[ldx]
                        }`}</P>
                      </Col>
                    </Row>
                  ) : (
                    <Row style={{ marginTop: '20px' }}>
                      <Col span={23} offset={1}>
                        <Icons src={WrongIcon} size="40px" />
                        <P fontsize={!isDesktop && '14'}>
                          {evaluatedAnswer.result[ldx] === 0
                            ? 'Wrong ID'
                            : evaluatedAnswer.result[ldx] === -1
                            ? 'No appropriate parent found'
                            : 'ID Already used'}
                        </P>
                        <P
                          fontsize={!isDesktop && '14'}
                        >{`One of the correct Node ID: ${
                          evaluatedAnswer.orderList[ldx]
                        }`}</P>
                      </Col>
                    </Row>
                  ))}
              </Col>
            </Row>
          ))}
          {evaluatedAnswer && FeedBack(evaluatedAnswer)}
        </div>
      </Col>
    </Row>
  );
}

CrosswordBacktrackingTreeGame.propTypes = {};

export default memo(CrosswordBacktrackingTreeGame);
