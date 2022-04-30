/**
 *
 * DiscussViewThreadPage
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
import makeSelectDiscussViewThreadPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  viewThreadStart,
  postCommentStart,
} from './actions';
import DiscussViewThreadComponent from '../../../components/DISCUSS/DiscussViewThreadComponent';

export function DiscussViewThreadPage(props) {
  useInjectReducer({ key: 'discussViewThreadPage', reducer });
  useInjectSaga({ key: 'discussViewThreadPage', saga });

  const { threadId } = props;
  const { threadDetails } = props.state;
  useEffect(() => {
    props.viewThread(threadId);
  }, [])

  const submit = values => {
    const response = values;
    response.threadId = threadId;
    props.postComment(values);
  };

  return (
    <div>
      <Helmet>
        <title>DiscussViewThreadPage</title>
        <meta
          name="description"
          content="Description of DiscussViewThreadPage"
        />
      </Helmet>
      {threadDetails &&
        <DiscussViewThreadComponent threadDetails={threadDetails} submit={submit} />
      }
    </div>
  );
}

DiscussViewThreadPage.propTypes = {
  state: PropTypes.object,
  viewThread: PropTypes.func,
  postComment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectDiscussViewThreadPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    viewThread: response => dispatch(viewThreadStart(response)),
    postComment: response => dispatch(postCommentStart(response)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DiscussViewThreadPage);
