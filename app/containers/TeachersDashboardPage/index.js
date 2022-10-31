/**
 *
 * TeachersDashboardPage
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
import makeSelectTeachersDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import api from 'api';
import axios from 'axios';


import TeachersDashboardComponent from '../../components/TEACHERS_DASHBOARD/TeachersDashboardComponent';

export function TeachersDashboardPage() {
  useInjectReducer({ key: 'teachersDashboardPage', reducer });
  useInjectSaga({ key: 'teachersDashboardPage', saga });

  const [conceptList, setConceptList] = useState(undefined);
  // useEffect(async () => {
  //   const response = await axios.get(
  //     'http://localhost:5000/teachers-dashboard/get-concept-list',
  //     {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: localStorage.getItem('_UFT_'),
  //       },
  //       withCredentials: true,
  //     });
  //   setConceptList(response.data.data);
  // }, []);

  return (
    <div>
      <Helmet>
        <title>TeachersDashboardPage</title>
        <meta
          name="description"
          content="Description of TeachersDashboardPage"
        />
      </Helmet>
      <TeachersDashboardComponent conceptList={conceptList}/>
    </div>
  );
}

TeachersDashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teachersDashboardPage: makeSelectTeachersDashboardPage(),
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
)(TeachersDashboardPage);
