/**
 *
 * DashboardPage
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
import { Button } from 'antd';
import Grid from '@material-ui/core/Grid';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Link } from 'react-router-dom';
import { getDashboardStart } from './actions';
import SimpleCard from '../../components/SimpleCard';

export function DashboardPage(props) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  const AuthData = useAuth();

  useEffect(() => {
    if (!AuthData.isLoggedIn) history.push('/auth/login');
  }, [AuthData]);

  useEffect(() => {
    props.getDashboard();
  }, []);

  const { dashboard } = props.dashboardPage;

  console.log(props.dashboardPage);
  return (
    <div style={{padding:'30px'}}>
      <Helmet>
        <title>DashboardPage</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      <div
        style={{
          padding: '20px',
          background: '#F8FAA7',
          paddingBottom: '150px',
        }}
      >
        {dashboard ?
          (
            <div>
              <h1>{"Hello,"} <b>{dashboard.username}</b></h1>
              <Link to='/topics'>
                <Button type="primary" style={{ height: '50px' }}>Learn AI</Button>
              </Link>
              <div style={{paddingTop:'10px', display: 'flex' }}>
                <div style={{ width: '300px' }}>
                  <SimpleCard type="Progress" title="Overall Progress" progress={dashboard.overallProgress} />
                </div>
                <div style={{width: '300px' }}>
                  <SimpleCard type="Proficiency" title="Overall Proficiency" progress={dashboard.overallProficiency} />
                </div>
              </div>
            </div>
          ) : null}
      </div>
    </div>
  );
}

DashboardPage.propTypes = {
  dashboardPage: PropTypes.object.isRequired,
  getDashboard: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDashboard: () => dispatch(getDashboardStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashboardPage);
