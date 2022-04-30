/**
 *
 * DiscussNewThreadPage
 *
 */

import React, { memo,useEffect } from 'react';
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
  postNewThreadStart,
} from './actions';

export function DiscussNewThreadPage(props) {
  useInjectReducer({ key: 'discussNewThreadPage', reducer });
  useInjectSaga({ key: 'discussNewThreadPage', saga });

  useEffect(()=>{
    if(props.state.threadDetails)
    {
      window.location.href = `/discuss/view-thread/${props.state.threadDetails.newThread}`;
    }
  },[props.state.threadDetails])

  const submit = values => {
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
      <DiscussNewThreadComponent submit={submit}/>
    </div>
  );
}

DiscussNewThreadPage.propTypes = {
  state: PropTypes.object,
  postNewThread: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectDiscussNewThreadPage(),
});

function mapDispatchToProps(dispatch) {
  return {
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
