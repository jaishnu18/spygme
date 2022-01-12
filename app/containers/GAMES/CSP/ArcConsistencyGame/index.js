/**
 *
 * ArcConsistencyGame
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
import makeSelectArcConsistencyGame from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ArcConsistencyGame() {
  useInjectReducer({ key: 'arcConsistencyGame', reducer });
  useInjectSaga({ key: 'arcConsistencyGame', saga });

  return (
    <div>
      <Helmet>
        <title>ArcConsistencyGame</title>
        <meta name="description" content="Description of ArcConsistencyGame" />
      </Helmet>
    </div>
  );
}

ArcConsistencyGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  arcConsistencyGame: makeSelectArcConsistencyGame(),
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
)(ArcConsistencyGame);
