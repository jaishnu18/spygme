/* eslint-disable indent */
/**
 *
 * ConceptListComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router-dom';
import Typography from 'antd/lib/typography';
import DescriptionCard from 'components/DescriptionCard';

const { Title } = Typography;

function ConceptListComponent(props) {
  const { concepts } = props;
  const { parentTopic } = props;
  return (
    <Row
      style={{ padding: '40px 40px 20px 40px', margin: 0 }}
      gutter={[16, 16]}
    >
      <Col
        span={24}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title style={{ textAlign: 'center' }}>{props.topicName}</Title>
      </Col>
      {concepts
        ? concepts.map((key, idx) => (
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Link to={`/concept/${parentTopic}/${key.id}`}>
              <DescriptionCard
                title={`Concept : ${idx + 1}`}
                description={key.name}
                progress={Math.round(key.progress * 100)}
              />
            </Link>
          </Col>
        ))
        : null}
    </Row>
  );
}

ConceptListComponent.propTypes = {};

export default memo(ConceptListComponent);
