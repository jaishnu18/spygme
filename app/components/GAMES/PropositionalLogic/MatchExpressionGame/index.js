/* eslint-disable indent */
/**
 *
 * MatchExpressionGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Graph from 'components/Graph';
import CustomButton from 'components/atoms/CustomButton';
import Typography from 'antd/lib/typography';
import InputNumber from 'antd/lib/input-number';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import GameDescription from 'components/GameDescription';
import TimeClock from 'components/TimeClock';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';

import PracticeGamesFeedback from 'components/FEEDBACK/PracticeGamesFeedback';
import PracticeGameStats from '../../../PracticeGameStats';

import useMediaQuery from '../../../../utils/useMediaQuery';

function MatchExpressionGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { exp_to_display } = gameData;

  if (gameData) gameData.ptr = 0;
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const FeedBack = __evaluatedAnswer =>
    __evaluatedAnswer && (
      <div>
        {props.setAlreadyFeedback(true)}
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
      </div>
    );

  return (
    <Row>
      <Col xl={{ span: 12 }} xs={{ span: 24 }}>
        <div style={{ padding: isDesktop ? '0 40px' : '0px' }}>
          <Graph
            level={props.level}
            animate={props.animate}
            visualize={props.visualize}
            gameData={gameData}
            evaluatedAnswer={props.evaluatedAnswer}
            nodeID
          />
          {isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
        </div>
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 12 }} style={{ padding: '10px' }}>
        <Row style={{ marginBottom: '40px' }}>
          <Col
            xs={{ span: 24 }}
            xl={{ span: 14 }}
            style={{ display: 'flex', alignItems: 'flex-end' }}
          >
            <PracticeGameStats
              maxLevel={4}
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
        <div style={{ padding: '30px' }}>
          <H1 fontWeight="700" level={3}>
            Match each expression with their node ID:{' '}
          </H1>
          {exp_to_display
            ? exp_to_display.map((exp, idx) => (
                <div style={{ margin: '20px 0' }}>
                  <Row key={exp} style={{ display: 'flex' }}>
                    <Col xs={{ span: 24 }} xl={{ span: 18 }}>
                      <H1 level={4} code>
                        {exp}
                      </H1>
                    </Col>
                    <Col xs={{ span: 24 }} xl={{ span: 5 }}>
                      <InputNumber
                        bordered={false}
                        style={{
                          width: '100%',
                          borderBottom: '1px solid var(--primaryColor)',
                          fontSize: isDesktop ? '24px' : '18px',
                          marginTop: !isDesktop && '10px',
                        }}
                        placeholder="Enter value"
                        onChange={e => {
                          const resArray = props.value;
                          if (e !== null) resArray[idx] = e;
                          else resArray[idx] = -1;
                          props.changeResponse(resArray);
                        }}
                      />
                      <Col />
                    </Col>
                  </Row>
                  {evaluatedAnswer &&
                    evaluatedAnswer.correctResponse &&
                    (evaluatedAnswer.correctResponse.includes(idx) ? (
                      <Row style={{ paddingBottom: '20px' }}>
                        <Col span={24}>
                          <Icons src={RightIcon} size="40px" />
                        </Col>
                      </Row>
                    ) : (
                      <Row style={{ paddingBottom: '20px' }}>
                        <Col span={24} style={{ display: 'flex' }}>
                          <Icons src={WrongIcon} size="40px" />
                          <P
                            style={{
                              paddingLeft: '10px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {`Correct Node ID : ${
                              evaluatedAnswer.wrongResponse[gameData.ptr++][1]
                            }`}
                          </P>
                        </Col>
                      </Row>
                    ))}
                </div>
              ))
            : null}
          <CustomButton
            // disableOnClick
            disabled={evaluatedAnswer}
            onClick={() => {
              props.submit();
            }}
          >
            Check Answer
          </CustomButton>
          {evaluatedAnswer && (
            <Row style={{ paddingTop: '10px' }}>
              <H1 fontWeight="700" level={3}>
                {`Score : ${Math.round(evaluatedAnswer.score * 100)}%`}
              </H1>
            </Row>
          )}
        </div>
        {!isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

MatchExpressionGame.propTypes = {};

export default memo(MatchExpressionGame);
