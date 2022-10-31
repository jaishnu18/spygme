/* eslint-disable no-nested-ternary */
/**
 *
 * WriteExpressionGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Graph from 'components/Graph';
import CustomButton from 'components/atoms/CustomButton';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import Typography from 'antd/lib/typography';
import Input from 'antd/lib/input';

import GameDescription from 'components/GameDescription';
import TimeClock from 'components/TimeClock';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import PracticeGameStats from '../../../PracticeGameStats';

import useMediaQuery from '../../../../utils/useMediaQuery';
import PracticeGamesFeedback from '../../../FEEDBACK/PracticeGamesFeedback';
PracticeGamesFeedback;

const { Title } = Typography;

function WriteExpressionGame(props) {
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
        <div style={{ padding: isDesktop ? '0 40px' : '0px' }}>
          <Graph
            level={props.level}
            gameData={gameData}
            evaluatedAnswer={props.evaluatedAnswer}
          />
        </div>
        {isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
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
            Write the expression depicted by the given graph:{' '}
          </H1>
          <Input
            placeholder="Enter your expression"
            style={{ width: '70%', fontSize: '20px', margin: '20px 0' }}
            onChange={e => {
              if (e.target.value === '') props.setValue('$');
              else props.setValue(e.target.value);
            }}
          />
          <CustomButton
            style={{ fontSize: '20px', height: 'fit-content' }}
            disabled={
              (evaluatedAnswer &&
                evaluatedAnswer.syntax_error === 'No syntax error') ||
              props.value === '$'
            }
            onClick={() => {
              props.submit();
            }}
          >
            Check Answer
          </CustomButton>
          {evaluatedAnswer ? (
            evaluatedAnswer.syntax_error !== 'No syntax error' ? (
              <Row style={{ paddingTop: '10px' }}>
                <Col span={24} style={{ display: 'flex' }}>
                  <ExclamationCircleFilled
                    style={{ fontSize: '20px', color: 'yellow' }}
                  />
                  <P style={{ paddingLeft: '10px' }}>
                    {`Syntax error : ${evaluatedAnswer.syntax_error}`}
                  </P>
                </Col>
              </Row>
            ) : (
              <Row style={{ paddingTop: '10px' }}>
                <Col span={24} style={{ display: 'flex' }}>
                  {evaluatedAnswer.score === 1 ? (
                    <Icons src={RightIcon} size="40px" />
                  ) : (
                    <Icons src={WrongIcon} size="40px" />
                  )}
                  <P style={{ paddingLeft: '10px' }}>
                    {evaluatedAnswer.score === 1
                      ? ''
                      : `One of the correct answer : ${evaluatedAnswer.answer}`}
                  </P>
                </Col>
                <Col span={24}>
                  <H1 style={{ margin: '16px 0' }} fontWeight="700" level={3}>
                    {`Score : ${Math.round(evaluatedAnswer.score * 100)}%`}
                  </H1>
                </Col>
              </Row>
            )
          ) : null}
        </div>
        {!isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

WriteExpressionGame.propTypes = {};

export default memo(WriteExpressionGame);
