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
  return (
    <Row style={{padding:'10px'}}>
      <Col xs={{ span: 24 }} xl={{ span:14 , offset: 6 }}>
        <Title>{props.topicName}</Title>
      </Col>
      {
        concepts ? (
          concepts.map((key, idx) => (
            <Col xs={{ span: 24 }} xl={{ span: 5, offset: 1 }}>
              <Link to={`concept/${idx + 1}`}>
                <DescriptionCard title={"Topic : " + (idx + 1)} description={key.name} progress={Math.round(key.progress*100)}/>
              </Link>
            </Col>
          ))
        ) : null
      }
    </Row>
  );
}

ConceptListComponent.propTypes = {};

export default memo(ConceptListComponent);
