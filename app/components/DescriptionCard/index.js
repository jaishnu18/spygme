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
import Paragraph from 'antd/lib/typography/Paragraph';

const { Title } = Typography;

function DescriptionCard(props) {
  return (
    <CustomCard title={props.title}>
      <Row style={{display:'flex', flexDirection:'column'}}>
        {
          props.description.map((key,idx)=>(
            <Paragraph>{key}</Paragraph>
          ))
        }
        {props.progress !== undefined &&
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
