/**
 *
 * ConceptListPage
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
import makeSelectConceptListPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getTopicStart, getConceptsStart, getConceptsPrereqStart } from './actions';
import ConceptListComponent from '../../components/ConceptListComponent';

export function ConceptListPage(props) {
  useInjectReducer({ key: 'conceptListPage', reducer });
  useInjectSaga({ key: 'conceptListPage', saga });

  const { topicId } = props;
  console.log(props);

  useEffect(() => {
    // window.scrollTo(0, 0);
    props.getTopicData({ topicId: parseInt(topicId) });
    props.getConcepts({ topicId: parseInt(topicId) });

  }, []);

  const { concepts } = props.conceptListPage;
  const { topicData } = props.conceptListPage;
  const { prereq } = props.conceptListPage;

  return (
    <div>
      <Helmet>
        <title>ConceptListPage</title>
        <meta name="description" content="Description of ConceptListPage" />
      </Helmet>
      {topicData && concepts && (
        <ConceptListComponent
          concepts={concepts}
          topicName={topicData.name}
          parentTopic={topicId}
          type="Concept"
        />
      )}
    </div>
  );
}

ConceptListPage.propTypes = {
  conceptListPage: PropTypes.object,
  getTopicData: PropTypes.func,
  getConcepts: PropTypes.func,
  getConceptsPrereq: PropTypes.func,
  topicNo: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  conceptListPage: makeSelectConceptListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTopicData: payload => dispatch(getTopicStart(payload)),
    getConcepts: payload => dispatch(getConceptsStart(payload)),
    getConceptsPrereq: payload => dispatch(getConceptsPrereqStart(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConceptListPage);
