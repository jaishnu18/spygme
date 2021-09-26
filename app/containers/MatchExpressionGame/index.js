/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/**
 *
 * MatchExpressionGame
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CytoscapeComponent from 'react-cytoscapejs';
import {
  Row,
  InputNumber,
  Button,
  Space,
  message,
  Col,
  Form,
  Input,
} from 'antd';
import history from 'utils/history';
import SideBar from 'components/SideBar';
import makeSelectMatchExpressionGame from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getGamesDataStart, evaluateResponseStart } from './actions';

export function MatchExpressionGame(props) {
  useInjectReducer({ key: 'matchExpressionGame', reducer });
  useInjectSaga({ key: 'matchExpressionGame', saga });

  const { level } = props.match.params;
  useEffect(() => {
    props.getGameData(level);
  }, [level]);

  const { gameData } = props.matchExpressionGame;
  const { evaluatedAnswer } = props.matchExpressionGame;

  const elements = [];

  if (gameData) {
    console.log('Here');

    const { x_coor } = gameData;
    const { y_coor } = gameData;

    const { edge_carvature } = gameData;
    const { content } = gameData;

    for (let i = 0; i < gameData.num_nodes; i += 1) {
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
    for (let i = 0; i < gameData.num_nodes; i += 1) {
      let j = 0;

      while (adjList[i][j] != null) {
        const tar = adjList[i][j];

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

  const prevLevel = () => {
    const lvl = parseInt(level);
    history.push(`/match-expression/${lvl - 1}`);
  };
  const nextLevel = () => {
    const lvl = parseInt(level);
    history.push(`/match-expression/${lvl + 1}`);
  };

  const onFinish = values => {
    const resp = [];
    for (const [key, value] of Object.entries(values)) {
      resp.push(value);
    }
    const response = {};
    gameData.responses = resp;
    response.studentResponse = gameData;
    console.log(response);
    props.checkStudentResponse(response);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  let items = null;

  if (gameData) {
    const { exp_to_display } = gameData;
    items = exp_to_display.map(item => (
      <Form.Item
        label={`${item}`}
        name={item}
        rules={[
          {
            required: true,
            message: 'Please input your Response!',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    ));
  }

  if (evaluatedAnswer) {
    console.log(evaluatedAnswer);
  }

  return (
    <div>
      <Helmet>
        <title>MatchExpressionGame</title>
        <meta name="description" content="Description of MatchExpressionGame" />
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
            ) : level > 1 && level < 4 ? (
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
            ) : (
              <div style={{ display: 'flex', width: '100%' }}>
                <Button style={{ marginLeft: '10px' }} onClick={prevLevel}>
                  Previous Level
                </Button>
              </div>
            )}
          </div>
          {gameData ? (
            <Row>
              <Col offset="2">
                <h1>Enter the Node Value for each Expression</h1>
                <div>
                  {items && (
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      {items}
                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </div>
              </Col>

              <Col offset="1">
                <h1>Graph</h1>
                <div style={{ border: '2px solid black' }}>
                  <CytoscapeComponent
                    elements={elements}
                    style={{ minWidth: '600px', minHeight: '650px' }}
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
                </div>
              </Col>
            </Row>
          ) : null}
        </div>
      </SideBar>
    </div>
  );
}

MatchExpressionGame.propTypes = {
  matchExpressionGame: PropTypes.object,
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  matchExpressionGame: makeSelectMatchExpressionGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: token => dispatch(getGamesDataStart(token)),
    checkStudentResponse: response => dispatch(evaluateResponseStart(response)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MatchExpressionGame);
