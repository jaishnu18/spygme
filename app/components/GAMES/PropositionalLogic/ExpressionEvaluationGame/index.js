/**
 *
 * ExpressionEvaluationGame
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

const { Title } = Typography;
const { Paragraph } = Typography;

function ExpressionEvaluationGame(props) {
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

  gameData.ptr = 0;
  gameData.ptr2 = 0;

  return (
    <Row>
      <Col xl={{ span: 10 }} xs={{ span: 24 }}>
        <div style={{ padding: isDesktop ? '0 40px' : '0px' }}>
          <Graph
            isDesktop={isDesktop}
            level={props.level}
            animate={props.animate}
            visualize={props.visualize}
            gameData={gameData}
            evaluatedAnswer={evaluatedAnswer}
          />
          {isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
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
        <div style={{ padding: isDesktop ? '0 30px' : '20px' }}>
          <H1 fontWeight="700" level={3}>
            Evaluate the expression:{' '}
          </H1>
          <H1 level={4} style={{ fontWeight: 400, margin: '20px 0' }}>
            {gameData.expression}
          </H1>
          <P style={{ fontWeight: 400, fontSize: '20px' }}>
            {`where ${gameData.content.map((key, idx) =>
              key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122
                ? `${key} = ${gameData.values[idx]}`
                : '',
            )}`}
          </P>

          <InputNumber
            onChange={e => {
              props.setValue(e);
            }}
            required
          />
          <CustomButton
            disableOnClick
            onClick={e => {
              props.submit();
            }}
          >
            Check Answer
          </CustomButton>
          {evaluatedAnswer ? (
            <Row style={{ marginTop: '30px' }}>
              <Col span={24} style={{ display: 'flex', alignItems: 'center' }}>
                {evaluatedAnswer.score === 1 ? (
                  <Icons src={RightIcon} size="40px" />
                ) : (
                  <Icons src={WrongIcon} size="40px" />
                )}
                <P
                  style={{
                    paddingLeft: '10px',
                    fontWeight: 700,
                    // display: 'flex',
                    // alignItems: 'center',
                  }}
                >
                  {evaluatedAnswer.score === 1
                    ? ''
                    : `The Correct Answer is : ${evaluatedAnswer.answer}`}
                </P>
              </Col>
              <Col span={24} style={{ marginTop: '20px' }}>
                <H1 fontWeight="700" level={3}>
                  {`Score : ${Math.round(evaluatedAnswer.score * 100)}%`}
                </H1>
              </Col>
            </Row>
          ) : null}
        </div>
        {!isDesktop && evaluatedAnswer && FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

ExpressionEvaluationGame.propTypes = {};

export default memo(ExpressionEvaluationGame);
