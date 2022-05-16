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
import { getDashboardStart, getRecommendedConceptStart } from './actions';
import { useAuth } from '../App/AuthContext';

export function DashboardPage(props) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  useEffect(() => {
    props.getDashboard();
    props.getRecommendedConcept();
  }, []);

  const { dashboard } = props.dashboardPage;
  const { recommendedConcept } = props.dashboardPage;
  const authData = useAuth();
  return (
    <div>
      <Helmet>
        <title>DashboardPage</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      {dashboard && (
        <DashboardComponent dashboard={dashboard} recommendedConcept={recommendedConcept} username={authData.name} />
      )
      }
    </div>
  );
}

DashboardPage.propTypes = {
  dashboardPage: PropTypes.object.isRequired,
  getDashboard: PropTypes.func,
  getRecommendedConcept: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDashboard: () => dispatch(getDashboardStart()),
    getRecommendedConcept: () => dispatch(getRecommendedConceptStart()),
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
