/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/**
 *
 * TreeGamePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import CytoscapeComponent from 'react-cytoscapejs';
import {
  Row,
  InputNumber,
  Button,
  Space,
  message,
  Col,
  Divider,
  Collapse,
} from 'antd';
import AppStructure from 'components/AppStructure';

import AppWrapper from 'components/AppWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';

import moment from 'moment';
import makeSelectTreeGamePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getExpressionStart, evaluateExpressionStart } from './actions';

cytoscape.use(popper);

export function TreeGamePage(props) {
  useInjectReducer({ key: 'treeGamePage', reducer });
  useInjectSaga({ key: 'treeGamePage', saga });
  const [value, setValue] = useState(0);
  const [graphData, setGraphData] = useState(undefined);
  const [visualizeStarted, setvisualizeStarted] = useState(false);

  const [startTime, setStartTime] = useState(0);
  function start() {
    const date = new Date();
    setStartTime(date);
  }
  function end() {
    const endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    const seconds = timeDiff;
    return seconds;
  }

  useEffect(() => {
    props.getGameData(props.level);
    start();
  }, [props.level]);

  const { gameData } = props.treeGamePage;
  const { evaluatedAnswer } = props.treeGamePage;
  const { level } = props;

  const { Panel } = Collapse;

  useEffect(() => {
    if (gameData) {
      const elements = [];
      const { x_coor } = gameData;
      const { y_coor } = gameData;

      const { edge_carvature } = gameData;
      const { content } = gameData;

      for (var i = 0; i < gameData.num_nodes; i += 1) {
        const obj = {
          data: { id: i, label: gameData.content[i] },
          position: {
            x: 100 * (x_coor[i] + 1),
            y: 100 * (y_coor[i] + 1),
          },
        };
        elements.push(obj);
      }
      const { adjList } = gameData;
      for (i = 0; i < gameData.num_nodes; i += 1) {
        var j = 0;

        while (adjList[i][j] != null) {
          var tar = adjList[i][j];

          const obj = {
            data: {
              source: i,
              target: tar,
              label: '',
              key: `${i}t${tar}`,
            },
            style: {
              'control-point-weight': 0.5,
              'control-point-distance': -20 * edge_carvature[i][j],
              'line-color':
                content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
              'target-arrow-color':
                content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
            },
          };
          elements.push(obj);

          j += 1;
        }
      }
      setGraphData(elements);

      gameData.ptr = 0;
      gameData.ptr2 = 0;
      gameData.ptr3 = 0;
    }
  }, [gameData]);

  const submitAnswer = async () => {
    const secs = end();
    const response = {};
    gameData.response = value;
    const formatted = moment.utc(secs * 1000).format('mm:ss');
    gameData.timeTaken = formatted;
    gameData.level = parseInt(level);
    gameData.gameId = parseInt(props.gameId);
    response.studentResponse = gameData;

    console.log(response);
    props.checkStudentResponse(response);
  };

  if (evaluatedAnswer) {
    console.log(evaluatedAnswer);
  }

  const Demo = () => (
    <Space style={{ marginTop: '40px' }}>
      <InputNumber
        placeholder="Enter your answer"
        onChange={setValue}
        value={value}
        min="0"
        max="1"
      />

      <Button
        type="primary"
        style={{ background: 'green' }}
        onClick={submitAnswer}
        disabled={evaluatedAnswer !== undefined}
      >
        Submit
      </Button>
      <div>
        {evaluatedAnswer && (
          <h2>{evaluatedAnswer.result ? 'Correct' : 'Incorrect'}</h2>
        )}
      </div>
    </Space>
  );

  const prevLevel = () => {
    const lvl = parseInt(props.level);
    window.location.href = `/evaluate-expression/1/${lvl - 1}`;
  };
  const nextLevel = () => {
    const lvl = parseInt(props.level);
    window.location.href = `/evaluate-expression/1/${lvl + 1}`;
  };

  const backToConcepts = () => {
    window.location.href = `/concept/5`;
  };

  let myCyRef;
  function getVisualization() {
    if (gameData) {
      setvisualizeStarted(true);
      console.log(gameData.values);
      const node = gameData.orderOfEvaluation[gameData.ptr];
      console.log(node);

      myCyRef.getElementById(node).addClass('highlighted');

      gameData.ptr += 1;

      const popper = myCyRef.getElementById(node).popper({
        content: () => {
          const div = document.createElement('h1');
          div.style.textAlign = 'left';
          div.style.paddingLeft = '5px';
          div.style.color = 'purple';
          div.style.border = '2px solid black';
          div.style.borderRadius = '2px';
          div.style.width = '40px';
          div.innerHTML = gameData.values[node];
          document.body.appendChild(div);
          return div;
        },
      });

      const update = () => {
        popper.update();
      };

      myCyRef.getElementById(node).on('position', update);

      myCyRef.on('pan zoom resize', update);
    }
  }

  const animate = function() {
    if (gameData) {
      if (gameData.ptr2 < gameData.orderOfEvaluation.length) {
        const node = gameData.orderOfEvaluation[gameData.ptr2];
        myCyRef.getElementById(node).addClass('highlighted');
        const popper = myCyRef.getElementById(node).popper({
          content: () => {
            const div = document.createElement('h1');
            div.style.textAlign = 'left';
            div.style.paddingLeft = '5px';
            div.style.color = 'purple';
            div.style.border = '2px solid black';
            div.style.borderRadius = '2px';
            div.style.width = '40px';
            div.className = `Popper`;

            div.innerHTML = gameData.values[node];
            document.body.appendChild(div);
            return div;
          },
        });
        const update = () => {
          popper.update();
        };

        myCyRef.getElementById(node).on('position', update);

        myCyRef.on('pan zoom resize', update);
        gameData.ptr2 += 1;
        setTimeout(animate, 2000);
      } else return;
    }
  };

  const resetGraph = function() {
    if (gameData) {
      reset();
      myCyRef.reset();
    }
  };

  const reset = function() {
    if (gameData) {
      for (let i = 0; i < gameData.orderOfEvaluation.length; i += 1) {
        const node = gameData.orderOfEvaluation[i];
        myCyRef.getElementById(node).removeClass('highlighted');
      }
      gameData.ptr = 0;
      gameData.ptr2 = 0;

      setvisualizeStarted(false);

      // var list = document.getElementsByTagName('h1');
      // console.log(list.length);
      // for (let i = 0; i < list.length; i += 1) {
      //   if (list[i].id === 'Tag0') {
      //     list[i].remove();
      //   }
      // }
    }
  };

  var indents = [];
  if (gameData) {
    for (var i = 0; i < gameData.num_nodes; i += 1) {
      if (gameData.content[i][0] >= 'a' && gameData.content[i][0] <= 'z') {
        indents.push(
          <h2 style={{ marginLeft: '10px' }} key={i}>
            {gameData.content[i]} = {gameData.values[i]},
          </h2>,
        );
      }
    }
  }

  return (
    <div>
      <Helmet>
        <title>TreeGamePage</title>
        <meta name="description" content="Description of TreeGamePage" />
      </Helmet>
      {/* <SideBar
         steps={['Tree Games', 'CrossWords', 'New Games']}
         heading="TreeGame"
       > */}
      <AppStructure
        heading="Evaluate Expression"
        level={`Level: ${level}/4`}
        attempt={gameData ? ` ${gameData.attempt}` : ' 1'}
        evaluatedAnswer={evaluatedAnswer !== undefined}
        divContent={
          <div
            style={{
              background: '#F8FAA7',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                marginBottom: '20px',
              }}
            >
              <Button style={{ marginLeft: '10px' }} onClick={backToConcepts}>
                Back to Materials
              </Button>
              <div style={{ display: 'flex', width: '100%' }}>
                <Button
                  style={{ marginLeft: 'auto', marginRight: '30px' }}
                  onClick={prevLevel}
                  disabled={level == 1}
                >
                  Previous Level
                </Button>
                <Button
                  style={{ marginLeft: 'auto', marginRight: '30px' }}
                  onClick={nextLevel}
                  disabled={level == 4}
                >
                  Next Level
                </Button>
              </div>
            </div>
            {gameData ? (
              <Row>
                <Collapse
                  accordion
                  style={{ width: '100%' }}
                  defaultActiveKey={['1']}
                >
                  <Panel key="1" header="How to play?">
                    <p>{gameData ? gameData.gameDescription : ''}</p>
                  </Panel>
                </Collapse>
                <Col offset="1">
                  <h1
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Evaluate the given logical expression :
                  </h1>
                  <h2>{gameData.expression}</h2>
                  <div style={{ display: 'flex' }}>
                    <h2>where</h2>
                    {indents}
                  </div>
                  <Demo />
                </Col>
                <Col offset="3">
                  <div
                    style={{
                      background: '#6EA5C3',
                      padding: '10px',
                      marginBottom: '50px',
                      textAlign: 'center',
                    }}
                  >
                    <h1
                      style={{
                        textAlign: 'Center',
                        color: 'white',
                        fontWeight: 'bold',
                        gameData,
                      }}
                    >
                      Graph
                    </h1>
                    {gameData && (
                      <div>
                        <Button onClick={resetGraph}>Reset Graph Layout</Button>
                        <Button
                          onClick={getVisualization}
                          disabled={
                            evaluatedAnswer === undefined ||
                            gameData.ptr === gameData.num_nodes ||
                            gameData.ptr2 !== 0
                          }
                        >
                          {visualizeStarted ? 'Next' : 'Visualize in steps'}
                        </Button>
                        <Button
                          onClick={function(event) {
                            resetGraph();
                            animate();
                          }}
                          disabled={evaluatedAnswer === undefined}
                        >
                          Animate
                        </Button>

                        {/* <Button onClick={reset}>Reset</Button> */}
                      </div>
                    )}

                    {graphData && (
                      <CytoscapeComponent
                        elements={CytoscapeComponent.normalizeElements(
                          graphData,
                        )}
                        // pan={{ x: 200, y: 200 }}
                        style={{
                          width: '500px',
                          height: props.level * 100 + 400,
                          border: '1px solid black',
                          background: 'white',
                        }}
                        zoomingEnabled
                        maxZoom={3}
                        minZoom={0.1}
                        autounselectify={false}
                        boxSelectionEnabled
                        stylesheet={[
                          {
                            selector: 'node',
                            style: {
                              'background-color': '#666',
                              color: 'white',
                              label: 'data(label)',
                              width: '42px',
                              height: '42px',
                              'text-valign': 'center',
                              'text-halign': 'center',
                              'font-size': '17px',
                            },
                          },
                          {
                            selector: 'edge',
                            style: {
                              width: 3,
                              'line-color': 'blue',
                              'target-arrow-color': 'blue',
                              'target-arrow-shape': 'triangle',
                              'curve-style': 'unbundled-bezier',
                              'control-point-weight': '0.5',
                              'control-point-distance': '0',
                            },
                          },
                          {
                            selector: '.highlighted',
                            style: {
                              'background-color': '#61bffc',
                              'line-color': '#61bffc',
                              'target-arrow-color': '#61bffc',
                              'transition-property':
                                'background-color, line-color, target-arrow-color',
                              'transition-duration': '0.5s',
                            },
                          },
                        ]}
                        cy={cy => {
                          myCyRef = cy;
                          console.log('EVT', cy);

                          cy.on('tap', 'node', evt => {
                            var node = evt.target;
                          });
                        }}
                        abc={console.log('myCyRef', myCyRef)}
                      />
                    )}
                  </div>

                  {/* <div> */}

                  {/* </div> */}
                </Col>
              </Row>
            ) : null}
          </div>
        }
      />
      {/* </SideBar> */}
    </div>
  );
}

TreeGamePage.propTypes = {
  treeGamePage: PropTypes.object,
  getGameData: PropTypes.func.isRequired,
  checkStudentResponse: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  treeGamePage: makeSelectTreeGamePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: level => dispatch(getExpressionStart(level)),
    checkStudentResponse: level => dispatch(evaluateExpressionStart(level)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TreeGamePage);
