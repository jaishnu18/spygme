/**
 *
 * StatisticsPage
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
import StatisticsPageComponent from 'components/StatisticPageComponent';
import api from 'api';
import makeSelectStatisticsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Leaderboard from '../../components/Leaderboard';

export function StatisticsPage() {
  useInjectReducer({ key: 'statisticsPage', reducer });
  useInjectSaga({ key: 'statisticsPage', saga });

  const [leaderboard, setLeaderboard] = useState(undefined);

  useEffect(() => {
    const res1 = async () => {
      const R = await api.get('/get-dashboard/leaderboard', {
        headers: { Authorization: localStorage._UFT_ },
      });
      setLeaderboard(R.data.data);
      console.log(R.data.data);
    };

    res1();
  }, []);

  return (
    <div>
      <Helmet>
        <title>StatisticsPage</title>
        <meta name="description" content="Description of StatisticsPage" />
      </Helmet>
      {leaderboard && (
        // <StatisticsPageComponent leaderboard={leaderboard.allStudents} />
        <Leaderboard
          leaderboard={leaderboard.allStudents}
          stats={leaderboard}
        />
      )}
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
