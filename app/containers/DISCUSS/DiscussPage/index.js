/**
 *
 * DiscussPage
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
import makeSelectDiscussPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import DiscussComponent from '../../../components/DISCUSS/DiscussComponent';
import {
  getAllThreadsStart,
} from './actions';
export function DiscussPage(props) {
  useInjectReducer({ key: 'discussPage', reducer });
  useInjectSaga({ key: 'discussPage', saga });

  useEffect(()=>{
    props.getAllThreads();
  },[])
  return (
    <div>
      <Helmet>
        <title>DiscussPage</title>
        <meta name="description" content="Description of DiscussPage" />
      </Helmet>
      <DiscussComponent threads={props.state.threadDetails}/>
    </div>
  );
}

DiscussPage.propTypes = {
  state: PropTypes.object,
  getAllThreads: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectDiscussPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllThreads: response => dispatch(getAllThreadsStart(response)),
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
