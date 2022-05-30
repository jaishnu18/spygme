/**
 *
 * StatisticPageComponent
 *
 */

import React, { memo } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Table from 'antd/lib/table';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }

// const items = [getItem('Leaderboard', '1')];

const columnsStudent = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'School',
    dataIndex: 'organisation',
    key: 'organisation',
  },
  {
    title: 'Class',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Proficiency (%)',
    dataIndex: 'overall_proficiency',
    key: 'overall_proficiency',
  },
];

function StatisticPageComponent(props) {
  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col
        xs={{ span: 24 }}
        xl={{ span: 16 }}
        style={{
          boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px',
          height: '1000px',
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {/* <Menu
          style={{
            width: 256,
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode="inline"
          items={items}
        /> */}

        <Table
          style={{ width: '95%', fontWeight: 500 }}
          dataSource={props.leaderboard}
          columns={columnsStudent}
        />
      </Col>
    </Row>
  );
}

StatisticPageComponent.propTypes = {};

export default memo(StatisticPageComponent);
