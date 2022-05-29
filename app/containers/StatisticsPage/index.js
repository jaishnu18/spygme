/**
 *
 * StatisticsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import StatisticsPageComponent from 'components/StatisticPageComponent';
import makeSelectStatisticsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function StatisticsPage() {
  useInjectReducer({ key: 'statisticsPage', reducer });
  useInjectSaga({ key: 'statisticsPage', saga });

  return (
    <div>
      <Helmet>
        <title>StatisticsPage</title>
        <meta name="description" content="Description of StatisticsPage" />
      </Helmet>
      <StatisticsPageComponent />
    </div>
  );
}

StatisticsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  statisticsPage: makeSelectStatisticsPage(),
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
)(StatisticsPage);
