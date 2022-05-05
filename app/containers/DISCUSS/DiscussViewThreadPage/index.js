/**
 *
 * DiscussViewThreadPage
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
import makeSelectDiscussViewThreadPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  viewThreadStart,
  postCommentStart,
  voteThreadStart
} from './actions';
import DiscussViewThreadComponent from '../../../components/DISCUSS/DiscussViewThreadComponent';

export function DiscussViewThreadPage(props) {
  useInjectReducer({ key: 'discussViewThreadPage', reducer });
  useInjectSaga({ key: 'discussViewThreadPage', saga });

  const [thread_user_upvoted, set_thread_user_upvoted] = useState(false);
  const [thread_upvote, set_thread_upvote] = useState(0);
  const [comment_user_upvoted, set_comment_user_upvoted] = useState(undefined);
  const [comment_upvote, set_comment_upvote] = useState(undefined);
  const [initialized, set_initialized] = useState(false)

  const { threadId } = props;
  const { threadDetails } = props.state;

  useEffect(() => {
    props.viewThread(threadId);
  }, [])

  useEffect(() => {
    if (!initialized && props.state.threadDetails && !props.state.threadDetails.threadDetails.user_upvoted !== undefined) {
      let arr = new Array(props.state.threadDetails.comments.length).fill(0);
      for (let i = 0; i < arr.length; i++)
        arr[i] = props.state.threadDetails.comments[i].upvote;
      set_comment_upvote(arr);

      arr = new Array(arr.length).fill(false);
      for (let i = 0; i < arr.length; i++)
        arr[i] = props.state.threadDetails.comments[i].user_upvoted;
      set_comment_user_upvoted(arr);

      set_thread_upvote(props.state.threadDetails.threadDetails.upvote);
      set_thread_user_upvoted(props.state.threadDetails.threadDetails.user_upvoted);
      set_initialized(true);
    }
    console.log(props.state);
    if (props.state.commentDetails && props.state.commentDetails.ok) {
      window.location.reload(false);
    }
  }, [props.state])

  const updateVote = (type, id, vote) => {
    const response = {}
    response.type = type;
    response.id = id;
    response.vote = vote;
    props.voteThread(response);
  };

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
        <DiscussViewThreadComponent
          threadDetails={threadDetails}
          thread_user_upvoted={thread_user_upvoted}
          set_thread_user_upvoted={set_thread_user_upvoted}
          thread_upvote={thread_upvote}
          set_thread_upvote={set_thread_upvote}
          comment_user_upvoted={comment_user_upvoted}
          set_comment_user_upvoted={set_comment_user_upvoted}
          comment_upvote={comment_upvote}
          set_comment_upvote={set_comment_upvote}
          updateVote={updateVote}
          submit={submit} />
      }
    </div>
  );
}

DiscussViewThreadPage.propTypes = {
  state: PropTypes.object,
  viewThread: PropTypes.func,
  postComment: PropTypes.func,
  voteThread: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectDiscussViewThreadPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    viewThread: response => dispatch(viewThreadStart(response)),
    postComment: response => dispatch(postCommentStart(response)),
    voteThread: response => dispatch(voteThreadStart(response))
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
