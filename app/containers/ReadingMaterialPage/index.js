/* eslint-disable no-underscore-dangle */
/**
 *
 * ReadingMaterialPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { useHistory, ReactRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Button, Image } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectReadingMaterialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getReadingMaterialStart, markAsReadStart, recordTimeStart } from './actions';
import history from 'utils/history';

export function ReadingMaterialPage(props) {
  useInjectReducer({ key: 'readingMaterialPage', reducer });
  useInjectSaga({ key: 'readingMaterialPage', saga });
  const { rmId } = props.match.params;
  const [startTime, setStartTime] = useState(0);
  function start() {
    const date = new Date();
    setStartTime(date);
  }
  function end() {
    const endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    const seconds = timeDiff;
    return seconds;
  }
  // console.log(rmId);
  let timeRecorded;
  useEffect(() => {
    props.getReadingMaterialContent({ rmId });
    timeRecorded = false;
    start();
  }, []);
  const backToMaterials = () => {
    const secs = end();
    const response = {};
    response.rmId = rmId;
    response.timeSpent = secs;
    props.recordTime(response);
    // history.goBack();
  };
  const { readingMaterialContent } = props.readingMaterialPage;
  timeRecorded = props.readingMaterialPage.timeRecorded;
  console.log(timeRecorded);
  useEffect(() => {
    if (timeRecorded) {
      history.goBack();
    }
  }, [timeRecorded]);

  const markAsReadfunc = () => {
    const response = {};
    response.rmId = rmId;
    props.markAsRead(response);
  };

  return (
    <div>
      <Helmet>
        <title>ReadingMaterialPage</title>
        <meta name="description" content="Description of ReadingMaterialPage" />
      </Helmet>
      <div>
        <div>
          <div style={{ width: '100%', background: '#295474', padding: 10 }}>
            <Row justify="space-around">
              <Col span={3}>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginLeft: '10px', color: 'white' }} />
                </div>
              </Col>
            </Row>
          </div>
          <div
            style={{
              background: '#F8FAA7',
            }}
          />
          <div
            style={{ display: 'flex', width: '100%', marginBottom: '0px' }}
          />
          <div
            style={{
              padding: '20px',
              background: '#295474',
              paddingBottom: '20px',
            }}
          >
            {props.divContent}
          </div>
          <Button onClick={backToMaterials}>Back to Materials</Button>
          <p>Do not use browser back button to go back</p>
        </div>
        <div style={{ padding: '20px', background: '#F8FAA7' }}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {readingMaterialContent
              ? readingMaterialContent.content.replace(/<new_line>/g, '\n')
              : ''}
          </pre>
          <Button onClick={markAsReadfunc}>Mark as read</Button>
        </div>
      </div>
    </div>
  );
}

ReadingMaterialPage.propTypes = {
  readingMaterialPage: PropTypes.object,
  getReadingMaterialContent: PropTypes.func,
  markAsRead: PropTypes.func,
  recordTime: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  readingMaterialPage: makeSelectReadingMaterialPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReadingMaterialContent: payload =>
      dispatch(getReadingMaterialStart(payload)),
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
