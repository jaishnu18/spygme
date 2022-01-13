/**
 *
 * TopicListPage
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
import TopicListComponent from 'components/TopicListComponent';
import makeSelectTopicListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getTopicsStart } from './actions';

export function TopicListPage(props) {
  useInjectReducer({ key: 'topicListPage', reducer });
  useInjectSaga({ key: 'topicListPage', saga });

  useEffect(() => {
    props.getAllTopics();
  }, []);

  const { topics } = props.topicListPage;

  return (
    <div>
      <Helmet>
        <title>TopicListPage</title>
        <meta name="description" content="Description of TopicListPage" />
      </Helmet>
      <TopicListComponent topics={topics} type="Topic" />
    </div>
  );
}

TopicListPage.propTypes = {
  topicListPage: PropTypes.object,
  getAllTopics: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  topicListPage: makeSelectTopicListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllTopics: () => dispatch(getTopicsStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TopicListPage);
