/**
 *
 * NewDashboardPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import NewDashboardComponent from 'components/NewDashboardComponent';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNewDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function NewDashboardPage(props) {
  useInjectReducer({ key: 'newDashboardPage', reducer });
  useInjectSaga({ key: 'newDashboardPage', saga });

  return (
    <div>
      <Helmet>
        <title>NewDashboardPage</title>
        <meta name="description" content="Description of NewDashboardPage" />
      </Helmet>
      <NewDashboardComponent />
    </div>
  );
}

NewDashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newDashboardPage: makeSelectNewDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewDashboardPage);
