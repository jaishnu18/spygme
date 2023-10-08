/**
 *
 * GradedWhatIsTheDecisionComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import { Table, Row, Col, Select, Form } from 'antd';
import H1 from 'components/atoms/H1';

import useMediaQuery from 'utils/useMediaQuery';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import ExamNavigator from 'components/ExamNavigator';
import SummaryReport from 'components/SummaryReport';
import DecisionTree from 'components/Tree';

function GradedWhatIsTheDecisionComponent(props) {
  const { gameData } = props;
  const { currentLevel } = props;
  const { evaluatedAnswer } = props;
  const { value } = props;
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
            whatWentWrong={__evaluatedAnswer[props.maxLevel].score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </div>
    );

  function getTable(i) {
    let dataSource = [];
    let rowKey = 1
    for (const row of gameData[i].dataset) {
      let inputRow = {
        key: 'row-' + rowKey,
      };
      for (let j = 0; j < gameData[i].labels.length; j++) {
        inputRow[gameData[i].labels[j]] = row[j];
      }
      dataSource.push(inputRow);
      rowKey++;
    }

    let columns = [];
    for (const label of gameData[i].labels) {
      columns.push({
        title: label,
        dataIndex: label,
        key: label,
      });
    }

    return [dataSource, columns];
  }

  let tables = [];
  for (let i = 0; i < props.maxLevel; i++) {
    let [dataSource, columns] = getTable(i);
    tables.push({
      ID: 'table-' + i,
      dataSource: dataSource,
      columns: columns,
    });
  }

  // Input Table
  let inputTables = []
  for (let l = 0; l < props.maxLevel; l++) {
    let inputRow = { key: 'input-row' };
    for (let i = 0; i < gameData[l].labels.length - 1; i++) {
      inputRow[gameData[l].labels[i]] = gameData[l].input[i];
    }
    inputRow[gameData[l].labels[gameData[l].labels.length - 1]] = '?';

    let inputColumns = [];
    for (const label of gameData[l].labels) {
      inputColumns.push({
        title: label,
        dataIndex: label,
        key: label,
      });
    }

    inputTables.push({
      dataSource: [inputRow],
      columns: inputColumns,
    });
  }

  // binary decision tree only
  const selectOptions = [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' },
  ];

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px', width: '100%' }}>
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="What Is The Decision"
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
          examDuration={900}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9 }} style={{ padding: '20px' }}>
        <div>
          <Table
            style={{ whiteSpace: 'pre' }}
            scroll={{ x: true }}
            dataSource={tables[currentLevel].dataSource}
            columns={tables[currentLevel].columns}
            pagination={false}
            bordered={true}
          />
        </div>
        {evaluatedAnswer && (
          <>
            {tables.map((_, index) => (
              <div style={{
                paddingTop: '20px',
                display: index == currentLevel ? 'block' : 'none',
              }}>
                <DecisionTree
                  adjList={evaluatedAnswer[index].adjList}
                  nodeLabels={evaluatedAnswer[index].nodeLabels}
                />
              </div>
            ))}
            <SummaryReport
              evaluatedAnswer={evaluatedAnswer}
              maxLevel={props.maxLevel}
            />
          </>
        )}
      </Col>

      <Col
        xs={{ span: 24 }}
        xl={{ span: 10 }}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}
      >
        <Title level={3} style={{ marginBottom: '20px' }}>
          What Is The Decision:{' '}
        </Title>

        <h2>Select the final decision for the following input:</h2>
        <div>
          <Table
            style={{ whiteSpace: 'pre' }}
            scroll={{ x: true }}
            dataSource={inputTables[currentLevel].dataSource}
            columns={inputTables[currentLevel].columns}
            pagination={false}
            bordered={true}
          />
        </div>

        {tables.map((table, index) => (
          <Form
            key={table.ID}
            autoComplete="off"
            style={{ paddingTop: '40px', display: currentLevel === index ? 'block' : 'none' }}
          >
            <Form.Item
              key='output'
              name='output'
              label='Decision'
            >
              <Select
                placeholder={'select'}
                style={{ width: '90px' }}
                options={selectOptions}
                disabled={evaluatedAnswer}
                onChange={(decision) => {
                  const nextV = { ...value[index], 'output': decision };
                  const nextValue = value.map((v, i) => {
                    if (i === index) {
                      return nextV;
                    }
                    else {
                      return v;
                    }
                  });
                  props.setValue(nextValue);
                }}
              />
            </Form.Item>
          </Form>
        ))}

        {evaluatedAnswer && (
          <div style={{ padding: '40px' }}>
            {evaluatedAnswer[currentLevel].evaluation === 'CORRECT' ? (
              <h3>Correct Answer!</h3>
            ) : (
              <h3>Incorrect! The answer is <string>{evaluatedAnswer[currentLevel].answer}</string>.</h3>
            )}
          </div>
        )}

        {FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

GradedWhatIsTheDecisionComponent.propTypes = {};

export default memo(GradedWhatIsTheDecisionComponent);
