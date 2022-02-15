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
import Tooltip from 'antd/lib/tooltip';

const { Title } = Typography;

function DescriptionCard(props) {
  return (
    <CustomCard title={props.title} hoverable={props.hoverable}>
      <Row>
        {props.isReadingMaterial ? (
          props.description.map((key, idx) => (
            <pre style={{ fontFamily: 'cursive' }}>{`${key}\n<b>sdfd</b>`}</pre>
          ))
        ) : (
          <Tooltip title={props.description}>
            <Title level={3} ellipsis>
              {props.description}
            </Title>
          </Tooltip>
        )}
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
            <Paragraph>
              {props.customProgressText
                ? props.customProgressText
                : 'Your progress'}
            </Paragraph>
          </Row>
          <Row>
            <Progress type="circle" percent={props.progress} />
          </Row>
        </div>
      )}
      <Row>
        {props.practiceGame ? (
          <div>
            <Paragraph>{'Your highest scores:'}</Paragraph>
            <Paragraph>
              {props.suggestionText.map((key, idx) => 'Level ' + (idx+1) + ': ' + key + '%, ')}
            </Paragraph>
          </div>
        ) : (
          <Paragraph>{props.suggestionText}</Paragraph>
        )}
      </Row>
    </CustomCard>
  );
}

DescriptionCard.propTypes = {};

export default memo(DescriptionCard);
