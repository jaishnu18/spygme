/* eslint-disable indent */
/**
 *
 * TopicListComponent
 *
 */

import React, { memo } from 'react';
import DescriptionCard from 'components/DescriptionCard';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Typography from 'antd/lib/typography';
import RobotReading from 'images/robot-reading-ai.jpg';
import Topic1Icon from 'images/topic_1_icon.png';
import Topic2Icon from 'images/topic_2_icon.png';
import Image from 'antd/lib/image';

const { Title } = Typography;

const StyledRow = styled(Row)`
  display: flex;
  margin-top: 20px !important;
  justify-content: left !important;

  @media only screen and (max-width: 768px) {
    justify-content: center !important;
  }
`;

function TopicListComponent(props) {
  const { topics } = props;

  return (
    <div style={{ padding: '20px' }}>
      <StyledRow gutter={[32, 20]}>
        <Col
          style={{ display: 'flex', alignItems: 'center' }}
          xs={{ span: 23, offset: 1 }}
          xl={{ span: 14, offset: 1 }}
        >
          <Title>
            <Typewriter
              onInit={typewriter => {
                typewriter.typeString('SELECT YOUR PREFERRED TOPIC!').start();
              }}
            />
          </Title>
        </Col>
      </StyledRow>
      <StyledRow
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        gutter={[32, 20]}
      >
        {topics
          ? topics.map((key, idx) => (
              <Col
                xs={{ span: 23 }}
                xl={{ span: 8, offset: 1 }}
                xxl={{ span: 6, offset: 1 }}
              >
                <Link to={`topics/${idx + 1}`}>
                  <DescriptionCard
                    hoverable
                    title={`Topic : ${idx + 1}`}
                    description={key.name}
                    imageLocation={idx === 0 ? Topic1Icon : Topic2Icon}
                    suggestionText={key.description}
                   
                  />
                </Link>
              </Col>
            ))
          : null}
      </StyledRow>
    </div>
  );
}

TopicListComponent.propTypes = {};

export default memo(TopicListComponent);
