/* eslint-disable no-undef */
/**
 *
 * DashboardComponent
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomButton from 'components/atoms/CustomButton';
import DescriptionCard from 'components/DescriptionCard';
import Image from 'antd/lib/image';
import RobotHello from 'images/Robot-hello.png';
import Typewriter from 'typewriter-effect';
import Typography from 'antd/lib/typography';
import CustomCard from 'components/CustomCard';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import Table from 'antd/lib/table';
import Progress from 'antd/lib/progress';

const { Title } = Typography;

const StyledDiv = styled.div`
  margin: 20px;
  padding: 24px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  flex-direction: column;

  .ant-progress-text {
    font-size: 14px !important;
    font-weight: 700 !important;
  }
`;

const columns = [
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
    title: 'Proficiency (%)',
    dataIndex: 'overall_proficiency',
    key: 'overall_proficiency',
  },
];

const getDayName = day => {
  switch (day) {
    case 0:
      return 'Sunday';

    case 1:
      return 'Monday';

    case 2:
      return 'Tuesday';

    case 3:
      return 'Wednesday';

    case 4:
      return 'Thursday';

    case 5:
      return 'Friday';

    case 6:
      return 'Saturday';
  }
};

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function DashboardComponent(props) {
  const { dashboard } = props;
  console.log(dashboard);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div>
      <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        {!dashboard.isProfileComplete && (
          <Col xs={{ span: 24 }} xl={{ span: 12, offset: 1 }}>
            <StyledDiv>
              <Progress
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068',
                }}
                percent={parseFloat(dashboard.percentageProfileCompleted) * 100}
                status="active"
              />
              <Title level={3} style={{ marginTop: '10px', marginBottom: '0' }}>
                {' '}
                You have completed{' '}
                {parseFloat(dashboard.percentageProfileCompleted) * 100}% of the
                profile. <Link to="/my/profile">Complete Your Profile</Link>
              </Title>
            </StyledDiv>
            <StyledDiv>
              <Title level={2} style={{ marginTop: '10px', marginBottom: '0' }}>
                {getDayName(date.getDay())}, {month[date.getMonth()]}{' '}
                {date.getDate()}
              </Title>
              <Title level={1} style={{ marginTop: '10px', marginBottom: '0' }}>
                Hello! {props.username}
              </Title>
            </StyledDiv>
          </Col>
        )}
        <Col xs={{ span: 24 }} xl={{ span: 5, offset: 3 }}>
          <Image
            src={RobotHello}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              border: '1px solid black',
            }}
            preview={false}
          />
        </Col>
      </Row>
      <Row style={{ paddingBottom: '20px' }}>
        <Col span={23} offset={1}>
          <Link to="/topics">
            <Button shape="round" type="primary">
              Start Learning
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 22 }} xl={{ span: 4 }} offset={1}>
          <DescriptionCard
            title="Overall Progress"
            progress={Math.round(dashboard.overallProgress * 100)}
            suggestionText="Attempt new items to increase progress"
          />
        </Col>
        <Col xs={{ span: 22 }} xl={{ span: 4 }} offset={1}>
          <DescriptionCard
            title="Overall Proficiency"
            progress={Math.round(dashboard.overallProficiency * 100)}
            customProgressText="Your Proficiency"
            suggestionText="Perform better at graded games to improve"
          />
        </Col>
        <Col xs={{ span: 22 }} xl={{ span: 12 }} offset={1}>
          <CustomCard title="Leaderboard">
            <Table
              dataSource={dashboard.allStudents}
              columns={columns}
              pagination={{ pageSize: 3 }}
            />
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
}

DashboardComponent.propTypes = {};

export default memo(DashboardComponent);
