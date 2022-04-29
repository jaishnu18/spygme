/**
 *
 * DiscussPage
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
import makeSelectDiscussPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import DiscussComponent from '../../../components/DISCUSS/DiscussComponent';

export function DiscussPage() {
  useInjectReducer({ key: 'discussPage', reducer });
  useInjectSaga({ key: 'discussPage', saga });

  return (
    <div>
      <Helmet>
        <title>DiscussPage</title>
        <meta name="description" content="Description of DiscussPage" />
      </Helmet>
      <DiscussComponent/>
    </div>
  );
}

DiscussPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  discussPage: makeSelectDiscussPage(),
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
)(DiscussPage);
