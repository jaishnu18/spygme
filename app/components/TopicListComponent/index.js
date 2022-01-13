/**
 *
 * TopicListComponent
 *
 */

import React, { memo } from 'react';
import DescriptionCard from '../DescriptionCard';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Typography from 'antd/lib/typography';

const { Title } = Typography;
import RobotReading from 'images/robot-reading-ai.jpg'
function TopicListComponent(props) {
  const { topics } = props;
  console.log(topics)
  return (
    <Row>
      <Col xs={{ span: 24 }} xl={{ span: 5, offset: 1}}>
      <img src={RobotReading} height={200}/>
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 17, offset: 1}}>
        <Title>
          <Typewriter
            onInit={typewriter => {
              typewriter
                .typeString('SELECT YOUR PREFERRED TOPIC!')
                .start();
            }}
          />
        </Title>
      </Col>
      {
        topics ? (
          topics.map((key, idx) => (
            <Col xs={{ span: 24 }} xl={{ span: 6, offset: 1 }}>
              <Link to={`topics/${idx + 1}`}>
                <DescriptionCard title={"Topic : " + (idx + 1)} description={key.name} />
              </Link>
            </Col>
          ))
        ) : null
      }
    </Row>
  );
}

TopicListComponent.propTypes = {};

export default memo(TopicListComponent);
