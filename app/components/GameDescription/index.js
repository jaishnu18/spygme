/**
 *
 * GameDescription
 *
 */

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import H4 from 'components/atoms/H4';
import Typography from 'antd/lib/typography';

import PropTypes from 'prop-types';

import QuestionDataDownload from '../QuestionDataDownload';
// import styled from 'styled-components';
const { Title } = Typography;
const { Paragraph } = Typography;
function GameDescription(props) {
  return (
    <Row
      style={{ minHeight: '4vh', alignItems: 'center', margin: '20px 10px' }}
    >
      <Col span={24} style={{ padding: '40px' }}>
        <Title level={3}>How to play?</Title>
        <Paragraph>{props.gameData.gameDescription}</Paragraph>
      </Col>
      {props.evaluatedAnswer && (
        <Col span={24}>
          <QuestionDataDownload gameData={props.gameData} />
        </Col>
      )}
    </Row>
  );
}

GameDescription.propTypes = {};

export default memo(GameDescription);
