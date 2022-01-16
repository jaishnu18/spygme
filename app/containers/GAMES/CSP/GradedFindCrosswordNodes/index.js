/**
 *
 * GradedFindCrosswordNodes
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GameComponent from 'components/GAMES/CSP/GradedFindCrosswordNodes';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGradedFindCrosswordNodes from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function GradedFindCrosswordNodes(props) {
  useInjectReducer({ key: 'gradedFindCrosswordNodes', reducer });
  useInjectSaga({ key: 'gradedFindCrosswordNodes', saga });

  const [currentLevel, setCurrentLevel] = useState(0);
  const [value, setValue] = useState();

  useEffect(() => {
    props.getGameData();
  }, []);

  useEffect(() => {
    if (props.state.gameData) {
      setValue(new Array(props.state.gameData.length));
    }
  }, [props.state.gameData]);

  const submit = values => {};

  return (
    <div>
      <Helmet>
        <title>GradedFindCrosswordNodes</title>
        <meta
          name="description"
          content="Description of GradedFindCrosswordNodes"
        />
      </Helmet>
      {props.state.gameData && (
        <GameComponent
          gameData={props.state.gameData}
          evaluatedAnswer={props.state.evaluatedAnswer}
          animate
          visualize
          currentLevel={currentLevel}
          submit={submit}
          setValue={setValue}
          value={value}
        />
      )}
    </div>
  );
}

GradedFindCrosswordNodes.propTypes = {
  getGameData: PropTypes.func,
  checkStudentResponse: PropTypes.func,
  state: PropTypes.object,
  saveFeedback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectGradedFindCrosswordNodes(),
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
)(GradedFindCrosswordNodes);
