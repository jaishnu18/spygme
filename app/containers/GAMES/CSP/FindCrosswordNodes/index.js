/**
 *
 * FindCrosswordNodes
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFindCrosswordNodes from './selectors';
import reducer from './reducer';
import saga from './saga';
import Crossword from 'components/Crossword';
import {
  getGamesDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';
export function FindCrosswordNodes() {
  useInjectReducer({ key: 'findCrosswordNodes', reducer });
  useInjectSaga({ key: 'findCrosswordNodes', saga });

  const { level } = props;
  const { gameId } = props;

  return (
    <div>
      <Helmet>
        <title>FindCrosswordNodes</title>
        <meta name="description" content="Description of FindCrosswordNodes" />
      </Helmet>

      {/* <Crossword gridSize/> */}
    </div>
  );
}

FindCrosswordNodes.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  findCrosswordNodes: makeSelectFindCrosswordNodes(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FindCrosswordNodes);
