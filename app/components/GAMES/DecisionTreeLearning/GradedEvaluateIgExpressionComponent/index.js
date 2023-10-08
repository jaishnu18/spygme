/**
 *
 * GradedEvaluateIgExpressionComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import { Table, Row, Col, InputNumber, Form } from 'antd';
import H1 from 'components/atoms/H1';

import useMediaQuery from 'utils/useMediaQuery';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import ExamNavigator from 'components/ExamNavigator';
import SummaryReport from 'components/SummaryReport';

function GradedEvaluateIgExpressionComponent(props) {
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

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px', width: '100%' }}>
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="Evaluate Information Gain Expression"
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
          Evaluate Information Gain Expression:{' '}
        </Title>

        <h3>
          Find the information gain {'(correct upto 4 decimal places)'} for the following expression:
        </h3>

        {tables.map((table, index) => (
          <Form
            key={table.ID}
            autoComplete="off"
            style={{ padding: '40px', display: currentLevel === index ? 'block' : 'none' }}
          >
            <Form.Item
              key='ig'
              name='ig'
              label={'IG(' + gameData[index].feature1 + ' | ' + gameData[index].feature2 + ' = ' + gameData[index].feature2Value + ')'}
            >
              <InputNumber
                disabled={evaluatedAnswer}
                onChange={(ig) => {
                  const nextV = { ...value[index], 'ig': ig };
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
              <h3>Incorrect! Information Gain = <strong>{evaluatedAnswer[currentLevel].answer}</strong>.</h3>
            )}
          </div>
        )}

        {FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

GradedEvaluateIgExpressionComponent.propTypes = {};

export default memo(GradedEvaluateIgExpressionComponent);
