/**
 *
 * GradedEvaluateAllNodesGame
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import ExamNavigator from 'components/ExamNavigator';
import Typography from 'antd/lib/typography';
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import CustomCard from 'components/CustomCard';
import Descriptions from 'antd/lib/descriptions';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import Graph from 'components/Graph';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';

import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';

import SummaryReport from 'components/SummaryReport';
import useMediaQuery from '../../../../utils/useMediaQuery';
import GradedGamesFeedback from '../../../FEEDBACK/GradedGamesFeedback';

function GradedEvaluateAllNodesGame(props) {
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
          examDuration={600}
          evaluatedAnswer={props.evaluatedAnswer}
          {...props}
        />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 8 }}>
        <Graph gameData={gameData[currentLevel]} nodeID />
      </Col>

      <Col xs={{ span: 24 }} xl={{ span: 11 }}>
        <H1
          style={{ marginBottom: '20px', marginTop: !isDesktop && '40px' }}
          fontWeight="700"
        >
          Enter value stored in each node after evaluation:{' '}
        </H1>
        <H1 style={{ fontWeight: 500, fontSize: '22px', marginBottom: '40px' }}>
          {`Assume  ${gameData[currentLevel].content.map((key, idx) =>
            key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122
              ? `${key} = ${gameData[currentLevel].values[idx]}`
              : '',
          )}`}
        </H1>
        <Form name={`Form-${props.currentLevel}`}>
          {gameData[currentLevel].values &&
            gameData[currentLevel].values.map((val, idx) => (
              <div>
                <Row key={val} style={{ display: 'flex' }}>
                  <Col xs={{ span: 24 }} xl={{ span: 18 }}>
                    <H1 code>{`${idx + 1}. Value at node ID: ${idx}`}</H1>
                  </Col>
                  <Col xs={{ span: 12 }} xl={{ span: 4 }}>
                    <Form.Item name={`Input-${props.currentLevel}-${idx}`}>
                      <InputNumber
                        style={{
                          fontSize: '20px',
                          width: '100%',
                          marginTop: !isDesktop && '10px',
                        }}
                        placeholder="Enter Value"
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
                  evaluatedAnswer[currentLevel].result &&
                  (evaluatedAnswer[currentLevel].result[idx] ? (
                    <Row style={{ paddingBottom: '20px' }}>
                      <Col span={24}>
                        <Icons src={RightIcon} size="40px" />
                      </Col>
                    </Row>
                  ) : (
                    <Row style={{ paddingBottom: '20px' }}>
                      <Col span={24} style={{ display: 'flex' }}>
                        <Icons src={WrongIcon} size="40px" />
                        <P style={{ paddingLeft: '10px' }}>
                          {`Correct Answer : ${
                            gameData[currentLevel].values[idx]
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

GradedEvaluateAllNodesGame.propTypes = {};

export default memo(GradedEvaluateAllNodesGame);
