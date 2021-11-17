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
import { Row, InputNumber, Button, Space, message, Col } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SideBar from 'components/SideBar';
import history from 'utils/history';
import AppWrapper from 'components/AppWrapper';

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

  console.log(localStorage._UFT_);

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
        onClick={() => {
          setValue(0);
        }}
      >
        Reset
      </Button>
      <Button onClick={submitAnswer}>Submit</Button>
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

      myCyRef.getElementById(node).style('background-color', '#879ddf');
      gameData.ptr += 1;

      const popper = myCyRef.getElementById(node).popper({
        content: () => {
          const div = document.createElement('h1');
          div.style.textAlign = 'left';
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

  var animation = function() {
    if (gameData && gameData.ptr2 < gameData.orderOfEvaluation.length) {
      const node = gameData.orderOfEvaluation[gameData.ptr2];
      gameData.ptr2 += 1;
      myCyRef.getElementById(node).addClass('highlighted');

      const popper = myCyRef.getElementById(node).popper({
        content: () => {
          const div = document.createElement('h1');
          div.style.textAlign = 'left';
          div.style.width = '50px';
          div.style.height = '50px';
          div.style.padding = '5px';
          div.style.borderRadius = '4px';
          div.style.border = '2px solid black';
          div.style.color = 'darkgreen';
          div.innerHTML = gameData.values[node];
          document.body.appendChild(div);
          return div;
        },
      });

      setTimeout(animation, 2000);
    }
  };

  var indents = [];
  if (gameData) {
    for (var i = 0; i < gameData.num_nodes; i += 1) {
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

      <AppWrapper>
        <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
          {level == 1 ? (
            <Button
              style={{ marginLeft: 'auto', marginRight: '30px' }}
              onClick={nextLevel}
            >
              Next Level
            </Button>
          ) : (
            <div style={{ display: 'flex', width: '100%' }}>
              <Button style={{ marginLeft: '10px' }} onClick={prevLevel}>
                Previous Level
              </Button>
              <Button
                style={{ marginLeft: 'auto', marginRight: '30px' }}
                onClick={nextLevel}
              >
                Next Level
              </Button>
            </div>
          )}
        </div>
        {gameData ? (
          <Row
            style={{
              backgroundColor: '#F8FAA7',
              margin: '10px 50px 50px 50px',
              borderRadius: '10px',
              padding: '20px',
              paddingBlock: '40px',
            }}
          >
            <Col offset="4">
              <h1>Evaluate:</h1>
              <h2>{gameData.expression}</h2>
              <div style={{ display: 'flex' }}>
                <h3>where</h3>
                {indents}
              </div>

              <Demo />

              {gameData && (
                <div style={{ marginTop: '10px' }}>
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
                    onClick={animation}
                    disabled={
                      answer === undefined ||
                      gameData.ptr === gameData.num_nodes
                    }
                  >
                    Visualize Animation
                  </Button>
                </div>
              )}
            </Col>

            <Col offset="1">
              <h1>Graph</h1>

              {graphData && (
                <CytoscapeComponent
                  elements={CytoscapeComponent.normalizeElements(graphData)}
                  // pan={{ x: 200, y: 200 }}
                  style={{
                    width: '600px',
                    height: '600px',
                    border: '1px solid black',
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
                        'transition-property':
                          'background-color, line-color, target-arrow-color',
                        'transition-duration': '0.5s',
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

                    cy.on('tap', 'node', evt => {
                      var node = evt.target;
                    });
                  }}
                />
              )}
              <div>
                <div className="time">{seconds}s</div>
              </div>
            </Col>
          </Row>
        ) : null}
      </AppWrapper>
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
