/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/**
 *
 * GradedDrawCrosswordGraph
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameComponent from 'components/GAMES/CSP/GradedDrawCrosswordGraph';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGradedDrawCrosswordGraph from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function GradedDrawCrosswordGraph(props) {
  useInjectReducer({ key: 'gradedDrawCrosswordGraph', reducer });
  useInjectSaga({ key: 'gradedDrawCrosswordGraph', saga });

  const [currentLevel, setCurrentLevel] = useState(0);
  const [value, setValue] = useState(undefined);
  const [AcrossNodes, setAcrossNodes] = useState([]);
  const [DownNodes, setDownNodes] = useState([]);

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      const { gameData } = props.state;

      const A = [];
      const D = [];
      for (let k = 0; k < gameData.length; k += 1) {
        const ac = [];
        const dn = [];
        gameData[k].ptr = -1;
        for (let i = 0; i < gameData[k].nodes.length; i += 1) {
          if (gameData[k].nodes[i][2] === 65) {
            // across
            ac.push(`${gameData[k].nodes[i][0]}-${gameData[k].nodes[i][1]}-A`);
          } else {
            // down
            dn.push(`${gameData[k].nodes[i][0]}-${gameData[k].nodes[i][1]}-D`);
            if (gameData[k].ptr === -1) {
              gameData[k].ptr = i;
            }
          }
        }

        A.push(ac);
        D.push(dn);
      }
      setAcrossNodes(A);
      setDownNodes(D);

      setValue(
        new Array(props.state.gameData.length).fill({
          nodes: [{ across: null, down: null }],
        }),
      );
    }
  }, [props.state.gameData]);

  useEffect(() => {}, [props.state.gameData]);

  const submit = values => {
    for (let i = 0; i < values.length; i += 1) {
      values[i].submit();
    }

    const res = [];
    for (let k = 0; k < values.length; k += 1) {
      const currLevArr = [];
      for (const item in value[k].nodes) {
        const arr1 = value[k].nodes[item].across.split('-');
        const arr2 = value[k].nodes[item].down.split('-');
        const newArr = [];
        for (let i = 0; i < arr1.length; i += 1) {
          if (i === 2) {
            if (arr1[i] === 'A') {
              newArr.push(65);
            } else {
              newArr.push(68);
            }
          } else {
            newArr.push(parseInt(arr1[i]));
          }
        }
        for (let i = 0; i < arr2.length; i += 1) {
          if (i === 2) {
            if (arr2[i] === 'A') {
              newArr.push(65);
            } else {
              newArr.push(68);
            }
          } else {
            newArr.push(parseInt(arr2[i]));
          }
        }

        currLevArr.push(newArr);
      }
      res.push(currLevArr);
    }
    console.log(res);

    const { gameData } = props.state;
    const response = {};

    for (let i = 0; i < gameData.length; i += 1) {
      gameData[i].response = res[i];
    }

    response.studentResponse = gameData;
    response.gameId = props.gameId;
    console.log(response);

    props.checkStudentResponse(response);
  };

  return (
    <div>
      <Helmet>
        <title>GradedDrawCrosswordGraph</title>
        <meta
          name="description"
          content="Description of GradedDrawCrosswordGraph"
        />
      </Helmet>
      {props.state.gameData && value && (
        <>
          <GameComponent
            gameData={props.state.gameData}
            evaluatedAnswer={props.state.evaluatedAnswer}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            submit={submit}
            setValue={setValue}
            value={value}
            maxLevel="3"
            AcrossNodes={AcrossNodes}
            DownNodes={DownNodes}
          />
        </>
      )}
    </div>
  );
}

GradedDrawCrosswordGraph.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedDrawCrosswordGraph(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: () => dispatch(getGamesDataStart()),
    checkStudentResponse: response => dispatch(evaluateResponseStart(response)),
    saveFeedback: feedback => dispatch(putFeedbackStart(feedback)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GradedDrawCrosswordGraph);
