/**
 *
 * GradedExpressionEvaluationGame
 *
 */

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import ExamNavigator from 'components/ExamNavigator';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Graph from 'components/Graph';
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CustomCard from 'components/CustomCard';
import Descriptions from 'antd/lib/descriptions';
import CountdownCircleTimer from 'react-countdown-circle-timer';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import useMediaQuery from '../../../../utils/useMediaQuery';
import GradedGamesFeedback from '../../../FEEDBACK/GradedGamesFeedback';

function GradedExpressionEvaluationGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { currentLevel } = props;

  const isDesktop = useMediaQuery('(min-width: 960px)');

  console.log(evaluatedAnswer);

  const FeedBack = __evaluatedAnswer =>
    __evaluatedAnswer && (
      <div>
        <H1
          fontWeight="700"
          textAlign="center"
          style={{ margin: '30px 0', marginTop: '60px' }}
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
          <GradedGamesFeedback
            whatWentWrong={__evaluatedAnswer[4].score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
          {console.log(__evaluatedAnswer)}
        </div>
      </div>
    );

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 5 }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          submit={props.submit}
          value={props.value}
          evaluatedAnswer={evaluatedAnswer}
          examDuration={300}
          {...props}
        />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 8 }}>
        <Graph gameData={gameData[currentLevel]} />
      </Col>

      <Col
        xs={{ span: 24 }}
        xl={{ span: 11 }}
        style={{ padding: isDesktop ? '40px' : '20px' }}
      >
        <H1 fontWeight="700" style={{ marginBottom: '20px' }} level={3}>
          Evaluate the expression:{' '}
        </H1>
        <H1 level={4} style={{ fontWeight: 400, marginBottom: '20px' }}>
          {gameData[currentLevel].expression}
        </H1>
        <P
          level={4}
          style={{ fontWeight: 400, fontSize: '20px', marginBottom: '20px' }}
        >
          {`where ${gameData[currentLevel].content.map((key, idx) =>
            key.match(/[a-z]/i)
              ? `${key} = ${gameData[currentLevel].values[idx]}`
              : '',
          )}`}
        </P>
        <Form name={`Form-${props.currentLevel}`}>
          <Form.Item name={`Input-${props.currentLevel}`}>
            <InputNumber
              style={{ width: '200px' }}
              onChange={e => {
                const newArr = props.value;
                newArr[currentLevel] = e;
                props.setValue(newArr);
              }}
            />
          </Form.Item>
          {evaluatedAnswer && (
            <Row style={{ paddingTop: '10px' }}>
              <Col span={24} style={{ display: 'flex' }}>
                {evaluatedAnswer[currentLevel].score === 1 ? (
                  <Icons src={RightIcon} size="40px" />
                ) : (
                  <Icons src={WrongIcon} size="40px" />
                )}
                <P
                  style={{
                    paddingLeft: '10px',
                    fontWeight: 500,
                    fontSize: '20px',
                  }}
                >
                  {evaluatedAnswer[currentLevel].score === 1
                    ? ''
                    : `Correct Answer : ${
                        evaluatedAnswer[currentLevel].answer
                      }`}
                </P>
              </Col>
            </Row>
          )}
        </Form>
        {evaluatedAnswer && (
          <Row style={{ paddingTop: '40px' }}>
            <Col span={24}>
              <CustomCard title={<H1 fontWeight="700">Summary Report</H1>}>
                <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                  <Descriptions layout="horizontal" bordered>
                    <Descriptions.Item label={<P>Score</P>} span={24}>
                      <P>{`${Math.round(
                        evaluatedAnswer[props.maxLevel].score * 100,
                      )}%`}</P>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<P>Attempted question </P>}
                      span={24}
                    >
                      <P>{evaluatedAnswer[props.maxLevel].attempted}</P>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<P>Not attempted question</P>}
                      span={24}
                    >
                      <P>{evaluatedAnswer[props.maxLevel].notAttempted}</P>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<P>Correctly Answered</P>}
                      span={24}
                    >
                      <P>{evaluatedAnswer[props.maxLevel].correctlyAnswered}</P>
                    </Descriptions.Item>
                    <Descriptions.Item label={<P>Wrong Answered</P>} span={24}>
                      <P>{evaluatedAnswer[props.maxLevel].wrongAnswered}</P>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </CustomCard>
            </Col>
            {FeedBack(evaluatedAnswer)}
          </Row>
        )}
      </Col>
    </Row>
  );
}
GradedExpressionEvaluationGame.propTypes = {};

export default memo(GradedExpressionEvaluationGame);
