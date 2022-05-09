/**
 *
 * DiscussNewThreadPage
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
import makeSelectDiscussNewThreadPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import DiscussNewThreadComponent from '../../../components/DISCUSS/DiscussNewThreadComponent';
import {
  getConceptsStart,
  postNewThreadStart,
} from './actions';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export function DiscussNewThreadPage(props) {
  useInjectReducer({ key: 'discussNewThreadPage', reducer });
  useInjectSaga({ key: 'discussNewThreadPage', saga });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  useEffect(() => {
    props.getConcepts();
  }, [])

  useEffect(() => {
    if (props.state.threadDetails) {
      window.location.href = `/discuss/view-thread/${props.state.threadDetails.newThread}`;
    }
  }, [props.state.threadDetails])

  const submit = values => {
    values.tags = new Array(1).fill(values.tags);
    values.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(values);
    props.postNewThread(values);
  };

  return (
    <div>
      <Helmet>
        <title>DiscussNewThreadPage</title>
        <meta
          name="description"
          content="Description of DiscussNewThreadPage"
        />
      </Helmet>
      {props.state.concepts &&
        <DiscussNewThreadComponent
          submit={submit}
          concepts={props.state.concepts}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange} />
      }
    </div>
  );
}

DiscussNewThreadPage.propTypes = {
  state: PropTypes.object,
  getConcepts: PropTypes.func,
  postNewThread: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectDiscussNewThreadPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getConcepts: response => dispatch(getConceptsStart(response)),
    postNewThread: response => dispatch(postNewThreadStart(response)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DiscussNewThreadPage);
