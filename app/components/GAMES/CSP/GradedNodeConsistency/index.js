/* eslint-disable no-nested-ternary */
/**
 *
 * GradedNodeConsistency
 *
 */

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomCard from 'components/CustomCard';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form/Form';
import React, { memo } from 'react';
import Crossword from 'components/Crossword';
import ExamNavigator from 'components/ExamNavigator';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Descriptions from 'antd/lib/descriptions';
import Affix from 'antd/lib/affix';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';

import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import NavigationBar from 'components/NavigationBar';
import useMediaQuery from '../../../../utils/useMediaQuery';
import GradedGamesFeedback from '../../../FEEDBACK/GradedGamesFeedback';
import SummaryReport from '../../../SummaryReport';

function GradedNodeConsistency(props) {
  const { gameData } = props;
  const { evaluatedAnswer } = props;
  const { currentLevel } = props;

  const isDesktop = useMediaQuery('(min-width: 960px)');

  console.log(evaluatedAnswer);
  console.log(currentLevel);

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
            whatWentWrong={__evaluatedAnswer[2].score < 1}
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
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="Node Consistency"
          currentLevel={props.currentLevel}
          setCurrentLevel={props.setCurrentLevel}
          maxLevel={2}
          submit={props.submit}
          timeStamps={props.timeStamps}
          setTimeStamps={props.setTimeStamps}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 5 }} style={{ padding: '20px' }}>
        <ExamNavigator
          levels={props.maxLevel}
          currentLevel={props.currentLevel}
          setCurrentLevel={props.setCurrentLevel}
          examDuration={300}
          evaluatedAnswer={evaluatedAnswer}
          submit={props.submit}
          timeStamps={props.timeStamps}
          setTimeStamps={props.setTimeStamps}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9 }} style={{ padding: '20px' }}>
        {!isDesktop ? (
          <Crossword grid={gameData[currentLevel].grid} />
        ) : (
          <Affix offsetTop={100}>
            <Crossword grid={gameData[currentLevel].grid} />
            {evaluatedAnswer && (
              <Row style={{ paddingTop: '40px' }}>
                <Col span={22}>
                  <CustomCard title={<H1 fontWeight="700">Summary Report</H1>}>
                    <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                      <Descriptions layout="horizontal" bordered>
                        <Descriptions.Item label="Score" span={24}>
                          <Col span={24}>
                            {`${Math.round(
                              evaluatedAnswer[props.maxLevel].score * 100,
                            )}%`}
                          </Col>
                        </Descriptions.Item>
                        <Descriptions.Item label="Correctly Answered" span={24}>
                          <Col span={24}>
                            {evaluatedAnswer[props.maxLevel].correctlyAnswered}
                          </Col>
                        </Descriptions.Item>
                        <Descriptions.Item label="Wrong Answered" span={24}>
                          <Col span={24}>
                            {evaluatedAnswer[props.maxLevel].wrongAnswered}
                          </Col>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </CustomCard>
                </Col>
              </Row>
            )}
          </Affix>
        )}
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 10 }} style={{ padding: '12px' }}>
        <Form name={`Form-${currentLevel}`}>
          {gameData[currentLevel].nodes.map((key, idx) => (
            <CustomCard
              title={
                <H1>{`${key[0]} - ${key[1]} - ${
                  key[2] === 65 ? 'A' : 'D'
                }`}</H1>
              }
              marginBottom="20px"
            >
              <Row key={`R-${idx + 1}`}>
                {gameData[currentLevel].shuffled_bag.map((nkey, jdx) => (
                  <Col key={`C-${jdx + 1}`} span={8}>
                    <Form.Item name={`Input-${currentLevel}-${idx}-${jdx}`}>
                      <Button
                        style={{
                          color: 'white',
                          backgroundColor:
                            currentLevel === 0
                              ? props.value1[idx][jdx]
                                ? 'blue'
                                : 'yellow'
                              : props.value2[idx][jdx]
                              ? 'blue'
                              : 'yellow',
                          color:
                            currentLevel === 0
                              ? props.value1[idx][jdx]
                                ? 'white'
                                : 'black'
                              : props.value2[idx][jdx]
                              ? 'white'
                              : 'black',
                          fontWeight: 700,
                          minWidth: '75%',
                        }}
                        onClick={e => {
                          if (currentLevel === 0) {
                            const newArr = props.value1;
                            newArr[idx][jdx] = !newArr[idx][jdx];
                            props.setValue1(newArr);
                          } else {
                            const newArr = props.value2;
                            newArr[idx][jdx] = !newArr[idx][jdx];
                            props.setValue2(newArr);
                          }

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
                      {evaluatedAnswer &&
                        (evaluatedAnswer[currentLevel].tick_cross[idx][jdx] ? (
                          <Icons src={RightIcon} size="20px" />
                        ) : (
                          <Icons src={WrongIcon} size="20px" />
                        ))}
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              <Row>
                {evaluatedAnswer &&
                  (evaluatedAnswer[currentLevel].result[idx] ? (
                    <div style={{ marginTop: '20px' }}>
                      <Icons src={RightIcon} size="20px" />
                      <P>You made its domain node consistent</P>
                    </div>
                  ) : (
                    <div style={{ marginTop: '20px' }}>
                      <Icons src={WrongIcon} size="20px" />
                      <P>You could not make the domain node consistent</P>
                    </div>
                  ))}
              </Row>
            </CustomCard>
          ))}
          {evaluatedAnswer && FeedBack(evaluatedAnswer)}
        </Form>
      </Col>
    </Row>
  );
}

GradedNodeConsistency.propTypes = {};

export default memo(GradedNodeConsistency);
