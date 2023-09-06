/**
 *
 * GradedFindMissingNodeComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import DecisionTree from 'components/Tree';
import { Form, Select, Table, Row, Col } from 'antd';
import H1 from 'components/atoms/H1';

import useMediaQuery from 'utils/useMediaQuery';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import ExamNavigator from 'components/ExamNavigator';
import SummaryReport from 'components/SummaryReport';

function GradedFindMissingNodeComponent(props) {
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
            whatWentWrong={__evaluatedAnswer[3].score < 1}
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
      })
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

  let selectOptions = []
  for (let i = 0; i < props.maxLevel; i++) {
    let levelOptions = []
    for (var feature of gameData[i].labels.slice(0, -1)) {
      levelOptions.push({
        value: feature, label: feature
      });
    }

    let decisions = new Set();
    for (const row of gameData[i].dataset) {
      decisions.add(row[gameData[i].labels.length - 1]);
    }

    for (const decision of decisions) {
      levelOptions.push({
        value: decision, label: decision
      });
    }

    selectOptions.push(levelOptions);
  }

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px', width: '100%' }}>
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="Find Missing Node"
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
        {tables.map((table, index) => (
          <div
            key={table.ID}
            style={{ display: index === currentLevel ? 'block' : 'none' }}>
            <Table
              style={{ padding: '0px 0px 40px 0px' }}
              dataSource={table.dataSource}
              columns={table.columns}
              pagination={false}
            />
            <DecisionTree
              adjList={gameData[index].adjList}
              nodeLabels={gameData[index].nodeLabels}
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
          Find Missing Node:{' '}
        </Title>

        <div style={{ padding: '40px' }}>
          <h2>Select the missing node's {'(?)'} value of the tree.</h2>

          {tables.map((table, index) => (
            <Form
              key={table.ID}
              autoComplete="off"
              style={{ display: currentLevel === index ? 'block' : 'none' }}
            >
              <Form.Item
                name='output'
              >
                <Select
                  placeholder='select'
                  style={{ width: '110px' }}
                  options={selectOptions[index]}
                  disabled={evaluatedAnswer}
                  onChange={(node) => {
                    const nextV = { ...value[index], 'output': node };
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
        </div>

        {evaluatedAnswer && (
          <div style={{ padding: '40px' }}>
            {evaluatedAnswer[currentLevel].evaluation === 'CORRECT' ? (
              <h3>Correct Answer!</h3>
            ) : (
              <h3>Incorrect! The missing node is <strong>{evaluatedAnswer[currentLevel].answer}</strong>.</h3>
            )}
          </div>
        )}

        {FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

GradedFindMissingNodeComponent.propTypes = {};

export default memo(GradedFindMissingNodeComponent);
