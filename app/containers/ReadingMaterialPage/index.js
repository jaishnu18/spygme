/**
 *
 * ReadingMaterialPage
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
import makeSelectReadingMaterialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ReadingMaterialComponent from '../../components/ReadingMaterialComponent';

import { getReadingMaterialStart, recordTimeStart, markAsReadStart } from './actions';

export function ReadingMaterialPage(props) {
  useInjectReducer({ key: 'readingMaterialPage', reducer });
  useInjectSaga({ key: 'readingMaterialPage', saga });

  const { rmId } = props;
  const { conceptId } = props;
  const { readingMaterialContent } = props.readingMaterialPage;

  useEffect(() => {
    props.getReadingMaterialContent({ rmId });
  }, []);

  return (
    <div>
      <Helmet>
        <title>ReadingMaterialPage</title>
        <meta name="description" content="Description of ReadingMaterialPage" />
      </Helmet>
      {readingMaterialContent &&
        (
          <ReadingMaterialComponent content={readingMaterialContent} />
        )
      }
    </div>
  );
}

ReadingMaterialPage.propTypes = {
  readingMaterialPage: PropTypes.object,
  getReadingMaterialContent: PropTypes.func,
  markAsRead: PropTypes.func,
  recordTime: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  readingMaterialPage: makeSelectReadingMaterialPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReadingMaterialContent: payload => dispatch(getReadingMaterialStart(payload)),
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
