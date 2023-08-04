/**
 *
 * PruneSearch
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
import GameBar from '../../../../components/GAMES/GameTrees/components/GameBar';
import PruneSearchGame from '../../../../components/GAMES/GameTrees/PruneSearch';
import makeSelectPruneSearch from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getGameDataStart,
  evaluateResponseStart,
  putFeedbackStart,
} from './actions';

export function PruneSearch() {
  useInjectReducer({ key: 'pruneSearch', reducer });
  useInjectSaga({ key: 'pruneSearch', saga });

  useEffect(() => {}, []);

  return (
    <div>
      <Helmet>
        <title>PruneSearch</title>
        <meta name="description" content="Description of PruneSearch" />
      </Helmet>

      {1 && 1 && (
        <>
          <GameBar
            name="Prune Search"
            level={1}
            // attempts={props.state.gameData.attempt}
            maxLevel="3"
            // evaluatedAnswer={}
            // conceptId={1}
            // topicId={1}
            // saveFeedback={props.saveFeedback}
            // movement={0}
            // setMovement={}
          />
          <PruneSearchGame/>
        </>
      )}
    </div>
  );
}

PruneSearch.propTypes = {
  getGameData: PropTypes.func.isRequired,
  evaluateResponse: PropTypes.func.isRequired,
  putFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectPruneSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGameData: payload => dispatch(getGameDataStart(payload)),
    evaluateResponse: payload => dispatch(evaluateResponseStart(payload)),
    putFeedback: payload => dispatch(putFeedbackStart(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PruneSearch);
