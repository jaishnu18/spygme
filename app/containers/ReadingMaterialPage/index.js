/**
 *
 * ReadingMaterialPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Button, Image } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectReadingMaterialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getReadingMaterialStart, markAsReadStart } from './actions'


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
  useEffect(() => {
    props.getReadingMaterialContent({ rmId });
    start();
  }, []);
  const backToConcepts = () => {
    if (readingMaterialContent) {
      console.log(readingMaterialContent);
    }
  };
  const { readingMaterialContent } = props.readingMaterialPage;
  // console.log(readingMaterialContent.content);

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
                  <div style={{ marginLeft: '10px', color: 'white' }}>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div
            style={{
              background: '#F8FAA7',
            }}
          />
          <div style={{ display: 'flex', width: '100%', marginBottom: '0px' }} />
          <div
            style={{
              padding: '20px',
              background: '#295474',
              paddingBottom: '20px',
            }}
          >
            {props.divContent}
          </div>
        </div>
        <div style={{ padding: '20px', background: '#F8FAA7' }}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{readingMaterialContent ? readingMaterialContent.content.replace(/<new_line>/g, '\n') : ""}</pre>
          <Button onClick={markAsReadfunc}>Mark as read</Button>
          <Button onClick={backToConcepts}>Back to Materials</Button>
        </div>

      </div>

    </div>
  );
}

ReadingMaterialPage.propTypes = {
  readingMaterialPage: PropTypes.object,
  getReadingMaterialContent: PropTypes.func,
  markAsRead: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  readingMaterialPage: makeSelectReadingMaterialPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReadingMaterialContent: payload => dispatch(getReadingMaterialStart(payload)),
    markAsRead: response => dispatch(markAsReadStart(response)),
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
