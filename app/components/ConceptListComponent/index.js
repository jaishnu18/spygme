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
import Divider from 'antd/lib/divider';
import NavigationBar from '../NavigationBar';

const { Title } = Typography;

function ConceptListComponent(props) {
  const { concepts } = props;
  const { parentTopic } = props;
  return (
    <div>
      <NavigationBar prevPageText="Back to Topics" prevPageLink="/topics" />
      <Row style={{ padding: '20px', margin: 0 }} gutter={[16, 16]}>
        <Col
          span={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Title style={{ textAlign: 'center', marginBottom: '0px' }}>
            {props.topicName}
          </Title>
        </Col>
        <Divider />

        {concepts
          ? concepts.map((key, idx) => (
              <Col xs={{ span: 24 }} xl={{ span: 8 }}>
                <Link to={`/concept/${parentTopic}/${key.id}`}>
                  <DescriptionCard
                    title={`Concept : ${idx + 1}`}
                    description={key.name}
                    progress={Math.round(key.progress * 100)}
                    suggestionText={
                      props.concepts[idx].status === 0
                        ? 'Prerequisites not fulfilled'
                        : 'Prerequisites fulfilled'
                    }
                    suggestionTextColor={
                      props.concepts[idx].status === 0 ? 'red' : 'darkgreen'
                    }
                  />
                </Link>
              </Col>
            ))
          : null}
      </Row>
    </div>
  );
}

ConceptListComponent.propTypes = {};

export default memo(ConceptListComponent);
