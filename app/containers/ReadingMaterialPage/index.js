/**
 *
 * ReadingMaterialPage
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
import makeSelectReadingMaterialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ReadingMaterialComponent from '../../components/ReadingMaterialComponent';
import { start, end } from 'utils/timerFunctions';
import {
  getReadingMaterialStart,
  recordTimeStart,
  markAsReadStart,
  nextItemStart,
} from './actions';
import NavigationBar from '../../components/NavigationBar';

export function ReadingMaterialPage(props) {
  useInjectReducer({ key: 'readingMaterialPage', reducer });
  useInjectSaga({ key: 'readingMaterialPage', saga });

  const [startTime, setStartTime] = useState(0);
  const [goBack, setGoBack] = useState(false);

  const { rmId } = props;
  const { conceptId } = props;
  const { topicId } = props;
  const { readingMaterialContent } = props.readingMaterialPage;

  useEffect(() => {
    props.getReadingMaterialContent({ rmId });
    start(setStartTime);
  }, []);

  useEffect(() => {
    if (timeRecorded) {
      if (goBack) window.location.href = `/concept/${topicId}/${conceptId}`;
    }
  }, [props.readingMaterialPage]);
  useEffect(() => {
    if (nextItem) {
      window.location.href = nextItem.url;
    }
  }, [props.readingMaterialPage]);

  const backToMaterials = () => {
    const secs = end(startTime);
    const response = {};
    const date = new Date();
    const timestamp = new Date().toISOString();
    response.timestamp = timestamp;
    response.rmId = rmId;
    response.timeSpent = secs;
    setGoBack(true);
    props.recordTime(response);
  };
  const { timeRecorded } = props.readingMaterialPage;
  const { nextItem } = props.readingMaterialPage;

  const markAsRead = () => {
    const response = {};
    response.rmId = rmId;
    props.markAsRead(response);
    readingMaterialContent.read = true;

    response.conceptId = conceptId;
    response.topicId = topicId;
    response.itemId = rmId;
    response.type = 'R';
    props.getnextItem(response);
  };

  console.log(readingMaterialContent);

  return (
    <div>
      <Helmet>
        <title>ReadingMaterialPage</title>
        <meta name="description" content="Description of ReadingMaterialPage" />
      </Helmet>
      {readingMaterialContent && (
        <NavigationBar
          prevPageText="Back to materials"
          prevPageLink={`/concept/${topicId}/${conceptId}`}
          readingMaterial
          backToMaterials={backToMaterials}
          markAsRead={markAsRead}
          read={readingMaterialContent.read}
          heading={readingMaterialContent.parentConcept}
        />
      )}

      {readingMaterialContent && (
        <ReadingMaterialComponent content={readingMaterialContent} />
      )}
    </div>
  );
}

ReadingMaterialPage.propTypes = {
  readingMaterialPage: PropTypes.object,
  getReadingMaterialContent: PropTypes.func,
  markAsRead: PropTypes.func,
  getnextItem: PropTypes.func,
  recordTime: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  readingMaterialPage: makeSelectReadingMaterialPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReadingMaterialContent: payload =>
      dispatch(getReadingMaterialStart(payload)),
    getnextItem: response => dispatch(nextItemStart(response)),
    markAsRead: response => dispatch(markAsReadStart(response)),
    recordTime: response => dispatch(recordTimeStart(response)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ReadingMaterialPage);
