/**
 *
 * GradedFindCrosswordNodes
 *
 */

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo, useRef } from 'react';
import ExamNavigator from 'components/ExamNavigator';
import CustomCard from 'components/CustomCard';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Paragraph from 'antd/lib/typography/Paragraph';
import Crossword from 'components/Crossword';
import FormFindCrosswordNodes from '../FormFindCrosswordNodes';
import { useForm } from 'antd/lib/form/Form';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';

import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';
import useMediaQuery from '../../../../utils/useMediaQuery';
import GradedGamesFeedback from '../../../FEEDBACK/GradedGamesFeedback';
import SummaryReport from '../../../SummaryReport';

function GradedFindCrosswordNodes(props) {
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

  console.log(evaluatedAnswer);

  const [form1] = useForm();
  const [form2] = useForm();
  const [form3] = useForm();
  array.push(form1);
  array.push(form2);
  array.push(form3);

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px', width: '100%' }}>
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="Find Crossword Nodes"
          currentLevel={currentLevel}
          setCurrentLevel={props.setCurrentLevel}
          timeStamps={props.timeStamps}
          setTimeStamps={props.setTimeStamps}
          maxLevel={3}
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
          evaluatedAnswer={props.evaluatedAnswer}
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
                        {`${Math.round(
                          evaluatedAnswer[props.maxLevel].score * 100,
                        )}%`}
                      </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Correctly Answered" span={24}>
                      <Col span={24}>
                        {evaluatedAnswer[props.maxLevel].totalCorrect}
                      </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Wrong Answered" span={24}>
                      <Col span={24}>
                        {evaluatedAnswer[props.maxLevel].totalWrong}
                      </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Missed Nodes" span={24}>
                      <Col span={24}>
                        {evaluatedAnswer[props.maxLevel].totalMissed}
                      </Col>
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
          Find all the crossword nodes:{' '}
        </Title>
        <FormFindCrosswordNodes
          form={array[props.currentLevel]}
          key={`Number-${currentLevel + 1}`}
          ID={`Number-${currentLevel + 1}`}
          value={props.value}
          setValue={props.setValue}
          currentLevel={currentLevel}
          grid={gameData[currentLevel].grid}
        />

        {evaluatedAnswer && (
          <Row style={{ paddingTop: '10px', marginTop: '20px' }}>
            <Col span={24}>
              <Col xl={{ span: 23 }} xs={{ span: 24 }}>
                <Descriptions layout="vertical" bordered>
                  <Descriptions.Item label="Correct Nodes">
                    {evaluatedAnswer[currentLevel].correct_nodes_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Wrong Nodes">
                    {evaluatedAnswer[currentLevel].wrong_nodes_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
                        </Col>
                      ),
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mised Nodes">
                    {evaluatedAnswer[currentLevel].missed_nodes_list.map(
                      (key, idx) => (
                        <Col span={24}>
                          {`${key[0]}-${key[1]}-${key[2] === 65 ? 'A' : 'D'}`}
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

GradedFindCrosswordNodes.propTypes = {};

export default memo(GradedFindCrosswordNodes);
