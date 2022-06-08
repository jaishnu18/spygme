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
import Typography from 'antd/lib/typography';
import Space from 'antd/lib/space';
import { Link } from 'react-router-dom';
import Progress from 'antd/lib/progress';
import AI from 'images/AI.jpg';
import WhatsNew from 'images/whats-new.png';
import Streak from 'images/streak.jpg';
import CSP from 'images/csp.png';
import Read from 'images/read.png';
import ContinuePlaying from 'images/continue.png';
import Card from 'antd/lib/card';
import ListDisplay from '../ListDisplay';
import ListComponent from './ListComponent';

const { Title } = Typography;

export const StyledDiv = styled.div`
  padding: 24px;
  display: flex;
  background-color: #eaeaea;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 16px;
  flex-direction: column;
  justify-content: ${props => props.justifyContent || 'left'} .ant-progress-text {
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
      <Row justify="center" style={{ backgroundColor: '#A0C2F5' }}>
        <Col
          xs={{ span: 23 }}
          xl={{ span: 10 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            borderRight: '2px solid #eaeaea',
            minHeight: 'calc(100vh - 70px)',
          }}
        >
          <Space
            direction="vertical"
            size="large"
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

            <StyledCol span={24}>
              <StyledDiv>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <img
                    alt="example"
                    src={WhatsNew}
                    style={{ width: '50px', height: '50px' }}
                  />
                  <Title
                    level={3}
                    style={{
                      color: 'darkblue',
                      margin: '0px 0px 0px 8px',
                    }}
                  >
                    Latest
                  </Title>
                </div>
                <div
                  style={{ borderLeft: '3px solid purple', marginTop: '8px' }}
                >
                  <Title
                    level={4}
                    style={{
                      margin: '0 0 0 8px',
                      fontWeight: 500,
                      fontSize: '18px',
                    }}
                  >
                    We have updated our Dashboard.
                  </Title>
                </div>

                <div
                  style={{ borderLeft: '3px solid purple', marginTop: '8px' }}
                >
                  <Title
                    level={4}
                    style={{
                      margin: '0 0 0 8px',
                      fontWeight: 500,
                      fontSize: '18px',
                    }}
                  >
                    New concepts and games coming soon!
                  </Title>
                </div>
              </StyledDiv>
            </StyledCol>
          </Space>
        </Col>
        <Col
          xs={{ span: 24 }}
          xl={{ span: 7 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '12px',
          }}
        >
          <Space
            direction="vertical"
            size={30}
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
                <Title level={4} style={{ marginTop: '0', color: 'darkblue' }}>
                  Learn AI
                </Title>
              </Link>
            </StyledDiv>
            <StyledDiv>
              <Title level={3} style={{ textAlign: 'center', color: 'red' }}>
                STREAK BUILDER
              </Title>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <img
                  src={Streak}
                  alt="ai"
                  style={{ height: '20%', width: '20%' }}
                />
              </div>
              <Row>
                <Col
                  span={12}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Title level={4} style={{ textAlign: 'center', margin: 0 }}>
                    Current Streak
                  </Title>
                  <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
                    {dashboard.currentStreak}
                  </Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Title level={4} style={{ textAlign: 'center', margin: 0 }}>
                    Highest Streak
                  </Title>
                  <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
                    {dashboard.highestStreak}
                  </Title>
                </Col>
              </Row>
            </StyledDiv>
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
            size={30}
            style={{ display: 'flex', width: '100%', padding: '20px' }}
          >
            <StyledDiv>
              <Link
                to={`/concept/${props.recommendedConcept.parentTopic}/${
                  props.recommendedConcept.id
                }`}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    alt="example"
                    src={Read}
                    style={{ width: '50px', height: '50px' }}
                  />
                  <Title
                    level={3}
                    style={{
                      color: 'darkblue',
                      textAlign: 'center',
                      margin: '0px 0px 0px 8px',
                    }}
                  >
                    Recommended Concept for you!
                  </Title>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '12px',
                  }}
                >
                  <Card
                    hoverable
                    style={{ width: '90%' }}
                    cover={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          padding: '20px',
                        }}
                      >
                        <img
                          alt="example"
                          src={CSP}
                          style={{ width: '200px', height: '200px' }}
                        />
                      </div>
                    }
                  >
                    <Title
                      level={4}
                      style={{ color: 'brown', textAlign: 'center' }}
                    >
                      {props.recommendedConcept.name}
                    </Title>
                  </Card>
                </div>
              </Link>
            </StyledDiv>
            {props.nextItem && (
              <StyledDiv>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <img
                      alt="example"
                      src={ContinuePlaying}
                      style={{ width: '50px', height: '50px' }}
                    />
                    <Title
                      level={3}
                      style={{
                        color: 'darkblue',
                        margin: '0px 0px 0px 8px',
                      }}
                    >
                      Pick up from where you left!
                    </Title>
                  </div>
                  <ListComponent url={props.nextItem.url} name={props.nextItem.name} />
                </div>
              </StyledDiv>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
}

DashboardComponent.propTypes = {};

export default memo(DashboardComponent);
