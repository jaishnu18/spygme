/**
 *
 * GradedWriteExpressionGame
 *
 */

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import ExamNavigator from 'components/ExamNavigator';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Graph from 'components/Graph';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CustomCard from 'components/CustomCard';
import Descriptions from 'antd/lib/descriptions';

import SummaryReport from 'components/SummaryReport';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import useMediaQuery from '../../../../utils/useMediaQuery';
import GradedGamesFeedback from '../../../FEEDBACK/GradedGamesFeedback';

function GradedWriteExpressionGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { currentLevel } = props;

  const isDesktop = useMediaQuery('(min-width: 960px)');

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
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 5 }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          submit={props.submit}
          value={props.value}
          examDuration={900}
          evaluatedAnswer={evaluatedAnswer}
          {...props}
        />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 8 }}>
        <Graph gameData={gameData[currentLevel]} />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 11 }}>
        <H1
          fontWeight="700"
          style={{ marginBottom: '20px', marginTop: !isDesktop && '40px' }}
        >
          Write the expression depicted by the given graph:{' '}
        </H1>
        <Form name={`Form-${props.currentLevel}`}>
          <Form.Item name={`Input-${props.currentLevel}`}>
            <Input
              placeholder="Enter the Expression"
              style={{ fontSize: 20 }}
              onChange={e => {
                const newArr = props.value;
                if (e.target.value === '') newArr[currentLevel] = '$$$';
                else newArr[currentLevel] = e.target.value;
                props.setValue(newArr);
              }}
            />
          </Form.Item>
          {evaluatedAnswer &&
            (evaluatedAnswer[currentLevel].syntax_error !==
            'No syntax error' ? (
              <Row style={{ paddingTop: '10px' }}>
                <Col span={24} style={{ display: 'flex' }}>
                  <ExclamationCircleFilled
                    style={{ fontSize: '20px', color: 'yellow' }}
                  />
                  <P style={{ paddingLeft: '10px' }}>
                    {`Syntax error : ${
                      evaluatedAnswer[currentLevel].syntax_error
                    }`}
                  </P>
                </Col>
              </Row>
            ) : (
              <Row style={{ paddingTop: '10px' }}>
                <Col span={24} style={{ display: 'flex' }}>
                  {evaluatedAnswer[currentLevel].score === 1 ? (
                    <Icons src={RightIcon} size="40px" />
                  ) : (
                    <Icons src={WrongIcon} size="40px" />
                  )}
                  <P style={{ paddingLeft: '10px' }}>
                    {evaluatedAnswer[currentLevel].score === 1
                      ? ''
                      : `One of the correct answer : ${
                          evaluatedAnswer[currentLevel].answer
                        }`}
                  </P>
                </Col>
              </Row>
            ))}
          <SummaryReport {...props} />
          {FeedBack(evaluatedAnswer)}
        </Form>
      </Col>
    </Row>
  );
}
GradedWriteExpressionGame.propTypes = {};

export default memo(GradedWriteExpressionGame);
