/**
 *
 * DashboardComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomButton from 'components/atoms/CustomButton';
import DescriptionCard from 'components/DescriptionCard';
import Image from 'antd/lib/image';
import RobotHello from 'images/Robot-hello.png';
import Typewriter from 'typewriter-effect';
import Typography from 'antd/lib/typography';
import CustomCard from 'components/CustomCard';
import { Link } from 'react-router-dom';
import Table from 'antd/lib/table';

const { Title } = Typography;

function DashboardComponent(props) {
  const { dashboard } = props;
  console.log(dashboard);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Proficiency',
      dataIndex: 'overall_proficiency',
      key: 'overall_proficiency',
    },
  ]
  return (
    <div>
      <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Col xs={{ span: 24 }} xl={{ span: 4, offset: 1 }}>
          <Image
            src={RobotHello}
            style={{
              height: '200px',
              objectFit: 'cover',
              border: '1px solid black',
            }}
            preview={false}
          />
        </Col>
        <Col
          style={{ display: 'flex', alignItems: 'center' }}
          xs={{ span: 23, offset: 1 }}
          xl={{ span: 18, offset: 1 }}
        >
          <Title>
            <Typewriter
              onInit={typewriter => {
                typewriter.typeString('Hello ' + dashboard.username + ' !').start();
              }}
            />
          </Title>
        </Col>
      </Row>
      <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Col offset={1}>
          <Link to="/topics">
            <CustomButton>
              Learn AI
            </CustomButton>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 22 }} xl={{ span: 4 }} offset={1}>
          <DescriptionCard title="Overall Progress" progress={Math.round(dashboard.overallProgress * 100)} suggestionText="Attempt new items to increase progress" />
        </Col>
        <Col xs={{ span: 22 }} xl={{ span: 4 }} offset={1}>
          <DescriptionCard title="Overall Proficiency" progress={Math.round(dashboard.overallProficiency * 100)} customProgressText="Your Proficiency" suggestionText="Perform better at graded games to improve" />
        </Col>
        <Col xs={{ span: 22 }} xl={{ span: 12 }} offset={1}>
          <CustomCard title="Leaderboard">
            <Table dataSource={dashboard.allStudents} columns={columns} pagination={{ pageSize: 3 }} />
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
}

DashboardComponent.propTypes = {};

export default memo(DashboardComponent);
