/**
 *
 * DescriptionCard
 *
 */

import React, { memo } from 'react';
import CustomCard from 'components/CustomCard';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import Paragraph from 'antd/lib/typography/Paragraph';
import Progress from 'antd/lib/progress';
import Image from 'antd/lib/image';

const { Title } = Typography;

function DescriptionCard(props) {
  console.log(props.imageLocation);
  return (
    <CustomCard title={props.title} hoverable={props.hoverable}>
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
        {
          props.isReadingMaterial ? (
            props.description.map((key, idx) => (
              <Paragraph>{key}</Paragraph>
            ))) : (
            <Title level={3} ellipsis>{props.description}</Title>
          )
        }
      </Row>
      {props.imageLocation && (
        <Row style={{ justifyContent: 'center' }}>
          <Col>
            <Image src={props.imageLocation} preview={false} />
          </Col>
        </Row>
      )}
      {props.progress !== undefined && (
        <div>
          <Row>
            <Paragraph>{props.customProgressText ? props.customProgressText : "Your progress"}</Paragraph>
          </Row>
          <Row>
            <Progress type="circle" percent={props.progress} />
          </Row>
        </div>
      )}
      <Row>
        <Paragraph>{props.suggestionText}</Paragraph>
      </Row>
    </CustomCard>
  );
}

DescriptionCard.propTypes = {};

export default memo(DescriptionCard);
