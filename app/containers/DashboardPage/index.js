/**
 *
 * DashboardPage
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
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import api from 'api';
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

  const [recommendedConcept, setRecommendedConcept] = useState(undefined);
  const [nextItem, setNextItem] = useState(undefined);

  useEffect(() => {
    props.getDashboard();

    const res1 = async () => {
      const R = await api.get('/get-dashboard/reco-concept', {
        headers: { Authorization: localStorage._UFT_ },
      });
      setRecommendedConcept(R.data.data);
    };
    res1();

    const res2 = async () => {
      const R = await api.post(
        '/get-dashboard/next-item',
        {},
        {
          headers: { Authorization: localStorage._UFT_ },
        },
      );
      setNextItem(R.data.data);
      console.log(R.data.data);
    };
    res2();
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
      {dashboard && recommendedConcept && (
        <DashboardComponent
          recommendedConcept={recommendedConcept}
          dashboard={dashboard}
          username={authData.name}
          nextItem={nextItem}
        />
      )}
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
