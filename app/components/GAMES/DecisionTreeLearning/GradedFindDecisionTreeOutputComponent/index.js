/**
 *
 * GradedFindDecisionTreeOutputComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import DecisionTree from 'components/Tree';
import { Table, Row, Col } from 'antd';
import H1 from 'components/atoms/H1';

import useMediaQuery from 'utils/useMediaQuery';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import ExamNavigator from 'components/ExamNavigator';
import SummaryReport from 'components/SummaryReport';

function GradedFindDecisionTreeOutputComponent(props) {
  const { gameData } = props;
  const { currentLevel } = props;
  const { evaluatedAnswer } = props;
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
            movement={props.movement}
            setMovement={props.setMovement}
            whatWentWrong={__evaluatedAnswer[3].score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </div>
    );

  let tables = [];
  for (let i = 0; i < props.maxLevel; i++) {
    const { labels } = gameData[i];
    const { input } = gameData[i];

    // Input Table
    let inputRow = { key: 'input-row' };
    for (let i = 0; i < labels.length - 1; i++) {
      inputRow[labels[i]] = input[i];
    }
    inputRow[labels[labels.length - 1]] = '?';
    let dataSource = [inputRow];

    let columns = [];
    for (const label of labels) {
      columns.push({
        title: label,
        dataIndex: label,
        key: label,
      })
    }

    tables.push({
      'dataSource': dataSource,
      'columns': columns,
    })
  }

  let setSelections = [];
  for (let i = 0; i < props.maxLevel; i++) {
    setSelections.push((id) => {
      props.value[i] = { 'output': id };
    })
  }

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px', width: '100%' }}>
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="Find Decision Tree Output"
          currentLevel={currentLevel}
          setCurrentLevel={props.setCurrentLevel}
          timeStamps={props.timeStamps}
          setTimeStamps={props.setTimeStamps}
          maxLevel={props.maxLevel}
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
          evaluatedAnswer={evaluatedAnswer}
          examDuration={600}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9 }} style={{ padding: '20px' }}>
        {props.value.map((_, index) => (
          <div
            key={_.ID}
            style={{ display: index === currentLevel ? 'block' : 'none' }}>
            <DecisionTree
              evaluatedAnswer={evaluatedAnswer ? evaluatedAnswer[index] : undefined}
              adjList={gameData[index].adjList}
              nodeLabels={gameData[index].nodeLabels}
              setSelection={setSelections[index]}
            />
          </div>
        ))}
        {evaluatedAnswer && (
          <SummaryReport
            evaluatedAnswer={evaluatedAnswer}
            maxLevel={props.maxLevel}
          />
        )}
      </Col>

      <Col
        xs={{ span: 24 }}
        xl={{ span: 10 }}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}
      >
        <Title level={3} style={{ marginBottom: '20px' }}>
          Find Decision Tree Output:{' '}
        </Title>

        <div style={{ padding: '40px' }}>
          <h2>Select the output node of the tree for the following input:</h2>
          <Table
            dataSource={tables[currentLevel].dataSource}
            columns={tables[currentLevel].columns}
            pagination={false}
            bordered={true}
          />
        </div>

        {evaluatedAnswer && (
          <div style={{ padding: '40px' }}>
            {evaluatedAnswer[currentLevel].evaluation === 'CORRECT' ? (
              <h3>Correct Answer!</h3>
            ) : (
              <h3>
                Incorrect! The answer is the node highligted in green.
              </h3>
            )}
          </div>
        )}

        {FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

GradedFindDecisionTreeOutputComponent.propTypes = {};

export default memo(GradedFindDecisionTreeOutputComponent);
