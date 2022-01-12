/**
 *
 * DrawCrosswordGraphGame
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
import makeSelectDrawCrosswordGraphGame from './selectors';
import reducer from './reducer';
import saga from './saga';

export function DrawCrosswordGraphGame() {
  useInjectReducer({ key: 'drawCrosswordGraphGame', reducer });
  useInjectSaga({ key: 'drawCrosswordGraphGame', saga });

  return (
    <div>
      <Helmet>
        <title>DrawCrosswordGraphGame</title>
        <meta
          name="description"
          content="Description of DrawCrosswordGraphGame"
        />
      </Helmet>
    </div>
  );
}

DrawCrosswordGraphGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  drawCrosswordGraphGame: makeSelectDrawCrosswordGraphGame(),
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
)(DrawCrosswordGraphGame);
