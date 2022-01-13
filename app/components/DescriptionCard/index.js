/**
 *
 * DescriptionCard
 *
 */

import React, { memo } from 'react';
import CustomCard from '../CustomCard';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row'
import Typography from 'antd/lib/typography';
import Progress from 'antd/lib/progress'

const { Title } = Typography;

function DescriptionCard(props) {
  return (
    <CustomCard title={props.title}>
      <Row>
        <Title level={3} style={{ fontWeight: 400 }}>{props.description}</Title>
        {props.progress!==undefined &&
          (
            <Progress type='circle' percent={props.progress} />
          )
        }
      </Row>
    </CustomCard >
  );
}

DescriptionCard.propTypes = {};

export default memo(DescriptionCard);
