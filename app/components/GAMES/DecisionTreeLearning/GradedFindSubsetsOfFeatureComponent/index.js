/**
 *
 * GradedFindSubsetsOfFeatureComponent
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import { Select, Table, Row, Col } from 'antd';
import H1 from 'components/atoms/H1';
import Icons from 'components/IconBox';
import WrongIcon from 'images/Wrong.jpg';
import RightIcon from 'images/Right.jpg';

import useMediaQuery from 'utils/useMediaQuery';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import ExamNavigator from 'components/ExamNavigator';
import SummaryReport from 'components/SummaryReport';

function GradedFindSubsetsOfFeatureComponent(props) {
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

  function getStyledTable(i, colors, rowKeyPrefix, enableSelection) {
    // Input Table
    let dataSource = [];
    let rowKey = 1
    for (const row of gameData[i].dataset) {
      let inputRow = {
        key: rowKeyPrefix + rowKey,
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
        render: (text, _, index) => ({
          props: {
            style: {
              background: colors[index],
            },
          },
          children: text,
        })
      })
    }

    if (enableSelection) {
      if (!evaluatedAnswer) {
        columns.push({
          title: 'Color',
          dataIndex: 'color',
          key: 'color',
          render: (_, record, index) => {
            return {
              props: {
                style: {
                  background: value[i].colors[index],
                },
              },
              children:
                <Select
                  placeholder='select'
                  style={{ width: '90px' }}
                  onChange={(color) => {
                    const nextValue = value.map((v, j) => {
                      if (i === j) {
                        return {
                          ...v, 'colors': v.colors.map((c, k) => {
                            if (k === index) {
                              return color;
                            }
                            else {
                              return c;
                            }
                          })
                        }
                      }
                      else {
                        return v;
                      }
                    });
                    props.setValue(nextValue);
                  }}
                  options={[
                    { value: 'green', label: 'green' },
                    { value: 'red', label: 'red' },
                    { value: 'blue', label: 'blue' },
                    { value: 'yellow', label: 'yellow' },
                  ]}
                />
            }
          }
        });
      }
      if (evaluatedAnswer && colors.filter((color) => (color === 'default')).length != colors.length) {
        columns.push({
          title: 'Remarks',
          dataIndex: 'color',
          key: 'color',
          render: (_, record, index) => (
            evaluatedAnswer[i].evaluation[index] === 'INCORRECT' ?
              <Icons src={WrongIcon} size="40px" />
              : <Icons src={RightIcon} size="40px" />
          )
        });
      }
    }

    return [dataSource, columns];
  }

  let tables = [];
  for (let i = 0; i < props.maxLevel; i++) {
    let [dataSource, columns] = getStyledTable(i, value[i].colors, 'row-', true);
    tables.push({
      ID: 'table-' + i,
      dataSource: dataSource,
      columns: columns,
    });
  }

  const [answerTables, setAnswerTables] = useState(undefined);
  useEffect(() => {
    if (evaluatedAnswer) {
      let nextAnswerTables = []
      for (let i = 0; i < props.maxLevel; i++) {
        const [dataSource, columns] = getStyledTable(i, evaluatedAnswer[i].answer, 'answer-row-', false);
        nextAnswerTables.push({
          dataSource: dataSource,
          columns: columns,
        });
      }
      setAnswerTables(nextAnswerTables);
    }
  }, [evaluatedAnswer]);

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px', width: '100%' }}>
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="Find Subsets Of Feature"
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
          examDuration={400}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9 }} style={{ padding: '20px' }}>
        {tables.map((table, index) => (
          <div
            key={table.ID}
            style={{ display: index === currentLevel ? 'block' : 'none' }}
          >
            <Table
              dataSource={table.dataSource}
              columns={table.columns}
              pagination={false}
              bordered={true}
            />

            {evaluatedAnswer && answerTables && (
              value[index].colors.filter((color) => (color === 'default')).length === value[index].colors.length
              || evaluatedAnswer[index].evaluation.includes('INCORRECT')) && (
                <div style={{ paddingTop: '30px' }}>
                  <h3>Possible Answer:</h3>
                  <Table
                    dataSource={answerTables[index].dataSource}
                    columns={answerTables[index].columns}
                    pagination={false}
                    bordered={true}
                  />
                </div>
              )}
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
          Find Subsets Of Feature:{' '}
        </Title>

        <div style={{ padding: '40px' }}>
          <h2>Assign colors to the rows of the given table for the feature "<strong>{gameData[currentLevel].feature}</strong>"</h2>
        </div>

        {evaluatedAnswer && (
          <div style={{ padding: '40px' }}>
            {!evaluatedAnswer[currentLevel].evaluation.includes('INCORRECT') ? (
              <h3>Correct Answer!</h3>
            ) : (
              <h3>
                Incorrect! Some rows are in the wrong subset.
              </h3>
            )}
          </div>
        )}

        {FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

GradedFindSubsetsOfFeatureComponent.propTypes = {};

export default memo(GradedFindSubsetsOfFeatureComponent);
