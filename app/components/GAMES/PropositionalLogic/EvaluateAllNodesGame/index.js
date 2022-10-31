/**
 *
 * EvaluateAllNodesGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
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
import PracticeGameStats from '../../../PracticeGameStats';

import useMediaQuery from '../../../../utils/useMediaQuery';
import PracticeGamesFeedback from '../../../FEEDBACK/PracticeGamesFeedback';

const { Title } = Typography;
const { Paragraph } = Typography;

function EvaluateAllNodesGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { values } = gameData;
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
            animate={props.animate}
            visualize={props.visualize}
            gameData={gameData}
            evaluatedAnswer={props.evaluatedAnswer}
            nodeID
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
          <H1 fontWeight={700}>
            Enter value stored in each node after evaluation:{' '}
          </H1>
          <P fontsize="24" style={{ fontWeight: 500, margin: '10px 0 30px' }}>
            {`Assume  ${gameData.content.map((key, idx) =>
              key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122
                ? `${key} = ${gameData.values[idx]}`
                : '',
            )}`}
          </P>
          {values
            ? values.map((val, idx) => (
                <div style={{ margin: '20px 0' }}>
                  <Row key={val} style={{ display: 'flex', margin: '10px 0' }}>
                    <Col span={18}>
                      <P fontsize="24" code>{`${idx +
                        1}. Value at node ID: ${idx}`}</P>
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        style={{
                          width: '100%',
                          border: '1px solid var(--primaryColor)',
                          fontSize: '18px',
                        }}
                        placeholder="Enter Value"
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
                    evaluatedAnswer.result &&
                    (evaluatedAnswer.result[idx] ? (
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
                              fontWeight: 500,
                              fontSize: '18px',
                            }}
                          >
                            {`Correct Answer : ${gameData.values[idx]}`}
                          </P>
                        </Col>
                      </Row>
                    ))}
                </div>
              ))
            : null}
          <CustomButton
            style={{ marginTop: '20px' }}
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

EvaluateAllNodesGame.propTypes = {};

export default memo(EvaluateAllNodesGame);
