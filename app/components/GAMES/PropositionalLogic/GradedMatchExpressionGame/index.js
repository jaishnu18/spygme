/**
 *
 * GradedMatchExpressionGame
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
import SummaryReport from '../../../SummaryReport';

function GradedMatchExpressionGame(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { currentLevel } = props;

  gameData[currentLevel].ptr = 0;
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
    <Row style={{ padding: '40px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 5 }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          submit={props.submit}
          value={props.value}
          examDuration={300}
          evaluatedAnswer={evaluatedAnswer}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 8 }}>
        <Graph gameData={gameData[currentLevel]} nodeID />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 11 }}>
        <H1
          fontWeight="700"
          style={{ marginBottom: '20px', marginTop: !isDesktop && '20px' }}
        >
          Match each expression with their node ID:{' '}
        </H1>
        <Form name={`Form-${props.currentLevel}`}>
          {gameData[currentLevel].exp_to_display &&
            gameData[currentLevel].exp_to_display.map((exp, idx) => (
              <div>
                <Row key={exp} style={{ display: 'flex' }}>
                  <Col xs={{ span: 24 }} xl={{ span: 18 }}>
                    <H1 fontSize={isDesktop ? '28' : '20'}>{exp}</H1>
                  </Col>
                  <Col xs={{ span: 16 }} xl={{ span: 4 }}>
                    <Form.Item name={`Input-${props.currentLevel}-${idx}`}>
                      <InputNumber
                        style={{ fontSize: '18px', width: '100%' }}
                        placeholder={'Enter Value'}
                        onChange={e => {
                          const resArray = props.value;
                          if (e !== null) resArray[currentLevel][idx] = e;
                          else resArray[currentLevel][idx] = -1;
                          props.setValue(resArray);
                        }}
                      />
                    </Form.Item>
                    <Col />
                  </Col>
                </Row>
                {evaluatedAnswer &&
                  evaluatedAnswer[currentLevel].correctResponse &&
                  (evaluatedAnswer[currentLevel].correctResponse.includes(
                    idx,
                  ) ? (
                    <Row style={{ paddingBottom: '20px' }}>
                      <Col span={24}>
                        <Icons src={RightIcon} size="40px" />
                      </Col>
                    </Row>
                  ) : (
                    <Row style={{ paddingBottom: '20px' }}>
                      <Col span={24} style={{ display: 'flex' }}>
                        <Icons src={WrongIcon} size="40px" />
                        <P style={{ padding: '10px' }}>
                          {`Correct Node ID : ${
                            evaluatedAnswer[currentLevel].wrongResponse[
                              gameData[currentLevel].ptr++
                            ][1]
                          }`}
                        </P>
                      </Col>
                    </Row>
                  ))}
              </div>
            ))}
        </Form>
        <SummaryReport {...props} />
        {FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}
GradedMatchExpressionGame.propTypes = {};

export default memo(GradedMatchExpressionGame);
