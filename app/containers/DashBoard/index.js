/**
 *
 * DashBoard
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useAuth } from 'containers/App/AuthContext';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashBoard from './selectors';
import reducer from './reducer';
import saga from './saga';

export function DashBoard(props) {
  useInjectReducer({ key: 'dashBoard', reducer });
  useInjectSaga({ key: 'dashBoard', saga });

  const AuthData = useAuth();

  useEffect(() => {
    if (!AuthData.isLoggedIn) history.push('/auth/login');
  }, [AuthData]);

  return (
    <div>
      <Helmet>
        <title>DashBoard</title>
        <meta name="description" content="Description of DashBoard" />
        {AuthData.isLoggedIn && (
          <div>
            <h1>Hi {AuthData.email}</h1>
          </div>
        )}
      </Helmet>
    </div>
  );
}

DashBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashBoard: makeSelectDashBoard(),
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
)(DashBoard);
