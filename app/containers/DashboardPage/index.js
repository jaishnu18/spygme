/**
 *
 * DashboardPage
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
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';

// antd imports
import Section from '../../components/Section';
import DashboardComponent from '../../components/DashboardComponent';
import { getDashboardStart } from './actions';

export function DashboardPage(props) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  useEffect(() => {
    props.getDashboard();
  }, []);

  const { dashboard } = props.dashboardPage;

  return (
    <div>
      <Helmet>
        <title>DashboardPage</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      {dashboard && (
        <DashboardComponent dashboard={dashboard} />
      )
      }
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
