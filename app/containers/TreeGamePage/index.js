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
import { Row, InputNumber, Button, Space, message, Col, Divider } from 'antd';

import AppWrapper from 'components/AppWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';

import makeSelectTreeGamePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getExpressionStart } from './actions';

cytoscape.use(popper);

export function TreeGamePage(props) {
  useInjectReducer({ key: 'treeGamePage', reducer });
  useInjectSaga({ key: 'treeGamePage', saga });
  const [value, setValue] = useState(0);
  const [answer, setAnswer] = useState(undefined);
  const [graphData, setGraphData] = useState(undefined);

  const { level } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
  }, [level]);

  const { gameData } = props.treeGamePage;

  console.log(localStorage.UFT);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        // if(seconds > 59){
        //   const  minutes = Math.floor(time / 60);
        //   const seconds =
        // }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

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
    console.log(value === gameData.answer);
    if (value === gameData.answer) {
      message.success('Correct Answer.', 5);
      setAnswer(true);
    } else {
      message.error('Wrong Answer.', 5);
      setAnswer(false);
    }
  };

  const Demo = () => (
    <Space style={{ marginTop: '40px' }}>
      <InputNumber
        placeholder="Enter your answer"
        onChange={setValue}
        value={value}
      />

      <Button
        type="primary"
        style={{ background: 'green' }}
        onClick={submitAnswer}
      >
        Submit
      </Button>
    </Space>
  );

  const prevLevel = () => {
    const lvl = parseInt(level);
    history.push(`/treegame/${lvl - 1}`);
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    history.push(`/treegame/${lvl + 1}`);
  };

  let myCyRef;
  function getVisualization() {
    if (gameData) {
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

      node.on('position', update);

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
            // div.id = `Tag0`;

            div.innerHTML = gameData.values[node];
            document.body.appendChild(div);
            return div;
          },
        });
        gameData.ptr2 += 1;
        setTimeout(animate, 2000);
      }
    }
  };

  const reset = function() {
    if (gameData) {
      for (let i = 0; i < gameData.orderOfEvaluation.length; i += 1) {
        const node = gameData.orderOfEvaluation[i];
        myCyRef.getElementById(node).removeClass('highlighted');
      }

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
    for (var i = 0; i < gameData.num_nodes; i++) {
      if (gameData.content[i][0] >= 'a' && gameData.content[i][0] <= 'z') {
        indents.push(
          <div style={{ marginLeft: '10px', marginTop: '2px' }} key={i}>
            {gameData.content[i]} : {gameData.values[i]}
          </div>,
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
      <AppWrapper>
        {/* <Divider orientation="left">sub-element align left</Divider> */}
        <Row justify="space-around">
          <Col span={4}>
            <h1 style={{ color: 'white' }}>Tree Game</h1>
          </Col>
          <Col span={4}>
            <h1 style={{ color: 'white' }}>Level: 1/5</h1>
          </Col>
          <Col span={4}>
            {' '}
            <h1 style={{ color: 'white' }}>Attempts : 1</h1>
          </Col>
          <Col span={4}>
            <h1 className="time" style={{ color: 'white' }}>
              <h4 style={{ color: 'white' }}>Time: {seconds}s </h4>
            </h1>
          </Col>
        </Row>

        <div
          style={{
            margin: 20,
            background: '#F8FAA7',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              marginBottom: '20px',
              padding: '10px',
            }}
          >
            {level == 1 ? (
              <Button
                style={{ marginLeft: 'auto', marginRight: '30px' }}
                onClick={nextLevel}
              >
                Next Level
              </Button>
            ) : (
              <div
                style={{ display: 'flex', width: '100%', marginTop: '20px' }}
              >
                <Button
                  style={{
                    marginLeft: '10px',
                    background: 'brown',
                    color: 'white',
                  }}
                  onClick={prevLevel}
                >
                  Previous Level
                </Button>
                <Button
                  style={{
                    marginLeft: 'auto',
                    marginRight: '30px',
                    background: 'brown',
                    color: 'white',
                  }}
                  onClick={nextLevel}
                >
                  Next Level
                </Button>
              </div>
            )}
          </div>
          {gameData ? (
            <Row>
              <Col offset="1">
                <h1
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Enter the node value for each Expression :
                </h1>
                <h2>{gameData.expression}</h2>
                <div style={{ display: 'flex' }}>
                  <h3>where</h3>
                  {indents}
                </div>

                <Demo />

                {gameData && (
                  <div>
                    <Button
                      onClick={getVisualization}
                      disabled={
                        answer === undefined ||
                        gameData.ptr === gameData.num_nodes
                      }
                    >
                      Visualize
                    </Button>
                    <Button
                      onClick={animate}
                      disabled={
                        answer === undefined ||
                        gameData.ptr === gameData.num_nodes
                      }
                    >
                      Animate
                    </Button>

                    <Button onClick={reset}>Reset</Button>
                  </div>
                )}
              </Col>

              <Col offset="3">
                <div
                  style={{
                    background: '#6EA5C3',
                    padding: '10px',
                    marginBottom: '50px',
                  }}
                >
                  <h1
                    style={{
                      textAlign: 'Center',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Graph
                  </h1>

                  {graphData && (
                    <CytoscapeComponent
                      elements={CytoscapeComponent.normalizeElements(graphData)}
                      // pan={{ x: 200, y: 200 }}
                      style={{
                        width: '600px',
                        height: level * 100 + 400,
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
        {/* <div /> */}
      </AppWrapper>
      {/* </SideBar> */}
    </div>
  );
}

TreeGamePage.propTypes = {
  treeGamePage: PropTypes.object,
  getGameData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  treeGamePage: makeSelectTreeGamePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: level => dispatch(getExpressionStart(level)),
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
