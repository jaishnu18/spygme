/**
 *
 * TeachersDashboardComponent
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Tabs from 'antd/lib/tabs';
import StudentActivityAnalysisComponent from '../StudentActivityAnalysisComponent';
import ProficiencyvsTimeComponent from '../ProficiencyvsTimeComponent';
const { TabPane } = Tabs;

function TeachersDashboardComponent(props) {

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Student Activity Analysis" key="1">
        <StudentActivityAnalysisComponent conceptList={props.conceptList} />
      </TabPane>
       <TabPane tab="Progess vs Proficiency" key="3">
        <ProficiencyvsTimeComponent conceptList={props.conceptList} />
      </TabPane>
      {/*<TabPane tab="Classwise" key="2">
        <ClasswiseAnalysisComponent conceptList={props.conceptList} />
      </TabPane> */}

    </Tabs>
  )
}

TeachersDashboardComponent.propTypes = {};

export default memo(TeachersDashboardComponent);
