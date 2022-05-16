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
import Space from 'antd/lib/space';
import { Link } from 'react-router-dom';
import Table from 'antd/lib/table';
import Progress from 'antd/lib/progress';
import ListDisplay from '../ListDisplay';
import AI from 'images/AI.jpg';

const { Title } = Typography;

export const StyledDiv = styled.div`
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

const columnsTeacher = [
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
    title: 'Proficiency (%)',
    dataIndex: 'overall_proficiency',
    key: 'overall_proficiency',
  },
];

const columnsOthers = [
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
    title: 'Organisation',
    dataIndex: 'organisation',
    key: 'organisation',
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

    default:
      break;
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

const StyledCol = styled(Col)`
  height: max-content !important;
`;

function DashboardComponent(props) {
  const { dashboard } = props;
  const { recommendedConcept } = props;
  console.log(props);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div>
      <Row justify="center">
        <Col
          xs={{ span: 23 }}
          xl={{ span: 10 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            borderRight: '2px solid black',
            minHeight: 'calc(100vh - 70px)',
          }}
        >
          <Space
            direction="vertical"
            size="middle"
            style={{ display: 'flex', width: '100%', padding: '20px' }}
          >
            {!dashboard.isProfileCompleted && (
              <div>
                <StyledDiv>
                  <Title
                    level={3}
                    style={{ marginTop: '10px', marginBottom: '0' }}
                  >
                    {getDayName(date.getDay())}, {month[date.getMonth()]}{' '}
                    {date.getDate()}
                  </Title>
                  <Title
                    level={2}
                    style={{ marginTop: '10px', marginBottom: '12px' }}
                  >
                    Hello! {props.username}
                  </Title>
                  <Progress
                    strokeColor={{
                      from: '#108ee9',
                      to: '#87d068',
                    }}
                    percent={
                      parseFloat(dashboard.percentageProfileCompleted) * 100
                    }
                    status="active"
                  />
                  <Title
                    level={3}
                    style={{ marginTop: '10px', marginBottom: '0' }}
                  >
                    <Link to="/my/profile">Complete Your Profile</Link>
                  </Title>
                </StyledDiv>
              </div>
            )}

            {dashboard.gameplaySuggestions && (
              <StyledCol span={24}>
                <ListDisplay
                  title="Continue Playing"
                  gameplaySuggestion={dashboard.gameplaySuggestions}
                />
              </StyledCol>
            )}

          </Space>
        </Col>
        <Col
          xs={{ span: 24 }}
          xl={{ span: 7 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Space
            direction="vertical"
            size="middle"
            style={{ display: 'flex', width: '100%', padding: '20px' }}
          >
            <StyledDiv>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={AI}
                  alt="ai"
                  style={{ height: '50%', width: '50%' }}
                />
              </div>
              <Title
                style={{ marginTop: '30px', fontSize: '14px', fontWeight: 500 }}
              >
                “Artificial intelligence will reach human levels by around 2029.
                Follow that out further to, say, 2045, and we will have
                multiplied the intelligence – the human biological machine
                intelligence of our civilization – a billion-fold.” -{' '}
                <strong>Ray Kurzweil</strong>
              </Title>
              <Link to="/topics" style={{ textAlign: 'right' }}>
                <Title level={4} style={{ marginTop: '0' }}>
                  Learn AI
                </Title>
              </Link>
            </StyledDiv>
            {recommendedConcept && (
              <StyledCol span={24}>
                <Link to={`concept/${recommendedConcept.parentTopic}/${recommendedConcept.id}`}>
                  <DescriptionCard
                    title="Recommended concept for you"
                    description={recommendedConcept.name}
                    progress={Math.round(recommendedConcept.progress * 100)}
                  />
                </Link>
              </StyledCol>
            )}
          </Space>
        </Col>
        <Col
          xs={{ span: 24 }}
          xl={{ span: 7 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </Row>

      {/* <Col
          xs={{ span: 24 }}
          xl={{ span: 5, offset: 3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image
            src={RobotHello}
            style={{
              height: '90%',
              width: '100%',
              objectFit: 'cover',
              boxShadow:
                'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
              padding: '40px',
            }}
            preview={false}
          />
        </Col> */}
      {/* <Row style={{ paddingBottom: '20px' }}>
        <Col span={23} offset={1}>
          <Link to="/topics">
            <Button shape="round" type="primary">
              Start Learning
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 4 }} offset={1}>
          <DescriptionCard
            title="Overall Progress"
            progress={Math.round(dashboard.overallProgress * 100)}
            suggestionText="Attempt new items to increase progress"
          />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 4 }}>
          <DescriptionCard
            title="Overall Proficiency"
            progress={Math.round(dashboard.overallProficiency * 100)}
            customProgressText="Your Proficiency"
            suggestionText="Perform better at graded games to improve"
          />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 13 }} offset={1}>
          <CustomCard title="Leaderboard">
            <Table
              dataSource={dashboard.allStudents}
              columns={
                dashboard.allStudents[0].role === 'Student'
                  ? columnsStudent
                  : dashboard.allStudents[0].role === 'Teacher'
                  ? columnsTeacher
                  : columnsOthers
              }
              pagination={{ pageSize: 3 }}
            />
          </CustomCard>
        </Col>
      </Row> */}
    </div>
  );
}

DashboardComponent.propTypes = {};

export default memo(DashboardComponent);
