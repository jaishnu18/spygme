/**
 *
 * Crossword
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
import makeSelectCrossword from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Crossword() {
  useInjectReducer({ key: 'crossword', reducer });
  useInjectSaga({ key: 'crossword', saga });

  return (
    <div>
      <Helmet>
        <title>Crossword</title>
        <meta name="description" content="Description of Crossword" />
      </Helmet>
      <p>hi i am sagar</p>
    </div>
  );
}

Crossword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  crossword: makeSelectCrossword(),
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
)(Crossword);
