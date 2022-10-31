/* eslint-disable no-param-reassign */
/**
 *
 * DiscussPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
import { getAllThreadsStart } from './actions';
export function DiscussPage(props) {
  useInjectReducer({ key: 'discussPage', reducer });
  useInjectSaga({ key: 'discussPage', saga });

  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('');

  const onSearch = value => {
    setSearchText(value);
  };

  const onFilter = value => {
    if (value === undefined) value = '';
    setFilter(value);
  };

  useEffect(() => {
    props.getAllThreads();
  }, []);
  return (
    <div>
      <Helmet>
        <title>DiscussPage</title>
        <meta name="description" content="Description of DiscussPage" />
      </Helmet>
      {props.state.threadDetails &&
        props.state.threadDetails.allThreads &&
        props.state.threadDetails.allConcepts && (
          <DiscussComponent
            threads={props.state.threadDetails.allThreads}
            concepts={props.state.threadDetails.allConcepts}
            onSearch={onSearch}
            onFilter={onFilter}
            searchText={searchText}
            filter={filter}
          />
        )}
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
