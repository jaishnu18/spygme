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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SideBar from 'components/SideBar';
import { InputNumber, Button, Space, message } from 'antd';
import makeSelectTreeGamePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getExpressionStart } from './actions';

export function TreeGamePage(props) {
  useInjectReducer({ key: 'treeGamePage', reducer });
  useInjectSaga({ key: 'treeGamePage', saga });
  const [value, setValue] = React.useState(0);
  const [answer, setAnswer] = React.useState(undefined);

  useEffect(() => {
    const { level } = props.match.params;
    props.getGameData(level);
  }, []);

  useEffect(() => {
    console.log(answer);
    if (answer === false) {
      message.error('Wrong Answer.', 5);
    } else if (answer === true) {
      message.success('Correct Answer', 5);
    }
  }, [answer]);

  const { gameData } = props.treeGamePage;
  const submitAnswer = () => {
    if (value === gameData.answer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const elements = [];

  if (gameData) {
    console.log(gameData);
    const { x_coor } = gameData;
    const { y_coor } = gameData;

    // const { edge_carvature } = dag_gen;

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

    // for (var i = 0; i < num_nodes; i++) {
    //   var j = 0;
    //   while (adj.get(i).get(j) != null) {
    //     var tar = adj.get(i).get(j);
    //     cy.add([
    //       {
    //         group: 'edges',
    //         data: { id: i + 't' + tar, source: i, target: tar },
    //       },
    //     ]);
    //     if (content.get(i) == '~') {
    //       cy.getElementById(i + 't' + tar).style('line-color', '#000');
    //       cy.getElementById(i + 't' + tar).style('target-arrow-color', '#000');
    //     } else if (j == 0) {
    //       cy.getElementById(i + 't' + tar).style('line-color', 'red');
    //       cy.getElementById(i + 't' + tar).style('target-arrow-color', 'red');
    //     }

    //     //bend edges if they pass through nodes
    //     cy.getElementById(i + 't' + tar).style('control-point-weight', '0.5');
    //     cy.getElementById(i + 't' + tar).style(
    //       'control-point-distance',
    //       -20 * edge_carvature.get(i).get(j),
    //     );

    //     j++;
    //   }
    // }
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
      <Button type="primary" onClick={submitAnswer}>
        Submit
      </Button>
    </Space>
  );

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
          <h1>Evaluate:</h1>
          {gameData ? (
            <div className="harry">
              <h2>{gameData.expression}</h2>
              <div style={{ display: 'flex' }}>
                <h3>where</h3>
                {tifOptions}
              </div>

              <Demo />

              <CytoscapeComponent
                elements={elements}
                style={{ width: '600px', height: '600px' }}
              />
            </div>
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
