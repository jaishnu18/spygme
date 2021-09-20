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

import makeSelectTreeGamePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getExpressionStart } from './actions';

export function TreeGamePage(props) {
  useInjectReducer({ key: 'treeGamePage', reducer });
  useInjectSaga({ key: 'treeGamePage', saga });
  const [value, setValue] = React.useState(0);
  const [answer, setAnswer] = React.useState(undefined);

  const { level } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
  }, [level]);

  useEffect(() => {
    // if (answer === false) {
    //   message.error('Wrong Answer.', 5);
    // } else if (answer === true) {
    //   message.success('Correct Answer', 5);
    // }

    console.log(value);
  }, [value]);

  const { gameData } = props.treeGamePage;

  const submitAnswer = () => {
    console.log(value === gameData.answer);
    if (value === gameData.answer) {
      message.error('Wrong Answer.', 5);
      setAnswer(true);
    } else {
      message.success('Correct Answer', 5);
      setAnswer(false);
    }
  };

  // const onCLickVisualisation = () => {
  //   if (gameData) {
  //   }
  // };

  const elements = [];

  if (gameData) {
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
            'line-color': content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
            'target-arrow-color':
              content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
          },
        };
        elements.push(obj);

        j += 1;
      }
    }
  }

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

  if (gameData) {
    const Vals = gameData.values;
    var tifOptions = Object.keys(Vals).map(function(key) {
      return (
        <h3 key={key} style={{ marginLeft: '20px' }}>
          {key} = {Vals[key]}
        </h3>
      );
    });
  }

  return (
    <div>
      <Helmet>
        <title>TreeGamePage</title>
        <meta name="description" content="Description of TreeGamePage" />
      </Helmet>
      <SideBar
        steps={['Tree Games', 'CrossWords', 'New Games']}
        heading="TreeGame"
      >
        <div>
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
            <Row>
              <Col offset="4">
                <h1>Evaluate:</h1>
                <h2>{gameData.expression}</h2>
                <div style={{ display: 'flex' }}>
                  <h3>where</h3>
                  {tifOptions}
                </div>

                <Demo />
              </Col>

              <Col offset="1">
                <h1>Graph</h1>
                <CytoscapeComponent
                  elements={elements}
                  style={{ width: '600px', height: '800px' }}
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
                  ]}
                />
              </Col>
            </Row>
          ) : null}
        </div>
      </SideBar>
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
