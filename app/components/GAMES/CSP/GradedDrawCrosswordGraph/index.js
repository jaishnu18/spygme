/**
 *
 * GradedDrawCrosswordGraph
 *
 */

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import CustomCard from 'components/CustomCard';

import ExamNavigator from 'components/ExamNavigator';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';
import Crossword from 'components/Crossword';
import { useForm } from 'antd/lib/form/Form';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';

import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import FormDrawCrosswordGraph from '../FormDrawCrosswordGraph';
import useMediaQuery from '../../../../utils/useMediaQuery';
import GradedGamesFeedback from '../../../FEEDBACK/GradedGamesFeedback';
import SummaryReport from '../../../SummaryReport';

function GradedDrawCrosswordGraph(props) {
  const { gameData } = props;
  const { currentLevel } = props;
  const { evaluatedAnswer } = props;
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
            whatWentWrong={__evaluatedAnswer[3].score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
          {console.log(__evaluatedAnswer)}
        </div>
      </div>
    );

  const array = [];

  const [form1] = useForm();
  const [form2] = useForm();
  const [form3] = useForm();
  array.push(form1);
  array.push(form2);
  array.push(form3);

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px' }}>
      <Col xs={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="Draw Crossword Graph"
          currentLevel={currentLevel}
          setCurrentLevel={props.setCurrentLevel}
          maxLevel={3}
          timeStamps={props.timeStamps}
          setTimeStamps={props.setTimeStamps}
          submit={() => {
            props.submit();
          }}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 5 }} style={{ padding: '20px' }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          value={props.value}
          examDuration={600}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9 }} style={{ padding: '20px' }}>
        <Crossword grid={gameData[currentLevel].grid} />
        {evaluatedAnswer && (
          <Row style={{ paddingTop: '40px', width: '100%' }}>
            <Col span={24}>
              <CustomCard title={<H1 fontWeight="700">Summary Report</H1>}>
                <Col xl={{ span: 24 }} xs={{ span: 24 }}>
                  <Descriptions layout="horizontal" bordered>
                    <Descriptions.Item label="Score" span={24}>
                      <Col span={24}>
                        {`${Math.round(evaluatedAnswer[0].score * 100)}%`}
                      </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Correctly Answered" span={24}>
                      <Col span={24}>{evaluatedAnswer[0].totalCorrect}</Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Wrong Answered" span={24}>
                      <Col span={24}>{evaluatedAnswer[0].totalWrong}</Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Missed Nodes" span={24}>
                      <Col span={24}>{evaluatedAnswer[0].totalMissed}</Col>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </CustomCard>
            </Col>
          </Row>
        )}
      </Col>

      <Col
        xs={{ span: 24 }}
        xl={{ span: 10 }}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}
      >
        <Title level={3} style={{ marginBottom: '20px' }}>
          Match all the crossword nodes:{' '}
        </Title>
        <FormDrawCrosswordGraph
          form={array[props.currentLevel]}
          key={`Item-D-${props.currentLevel + 1}`}
          ID={`D-Number-${currentLevel + 1}`}
          value={props.value}
          setValue={props.setValue}
          currentLevel={currentLevel}
          grid={gameData[currentLevel].grid}
          AcrossNodes={props.AcrossNodes}
          DownNodes={props.DownNodes}
        />

        {evaluatedAnswer && (
          <Row style={{ paddingTop: '10px', marginTop: '10px' }}>
            <Col span={24}>
              <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                <Descriptions layout="vertical" bordered>
                  <Descriptions.Item label="Correct Edges">
                    {evaluatedAnswer[props.currentLevel].correct_edges_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Wrong Edges">
                    {evaluatedAnswer[props.currentLevel].wrong_edges_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mised Edges">
                    {evaluatedAnswer[props.currentLevel].missed_edges_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${
                            key[2] === 65 ? 'A' : 'D'
                          } -> ${key[3]}-${key[4]}-${
                            key[5] === 65 ? 'A' : 'D'
                          }`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Col>
          </Row>
        )}
        {FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

GradedDrawCrosswordGraph.propTypes = {};

export default memo(GradedDrawCrosswordGraph);
