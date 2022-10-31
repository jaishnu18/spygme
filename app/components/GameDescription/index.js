/**
 *
 * GameDescription
 *
 */

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import React, { memo } from 'react';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Typography from 'antd/lib/typography';

import PropTypes from 'prop-types';

import QuestionDataDownload from '../QuestionDataDownload';
import useMediaQuery from '../../utils/useMediaQuery';
// import styled from 'styled-components';
const { Title } = Typography;
const { Paragraph } = Typography;

function GameDescription(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <Row
      style={{ minHeight: '4vh', alignItems: 'center', margin: '40px 10px' }}
    >
      <Col span={24} style={{ padding: isDesktop ? '0 20px' : '20px' }}>
        <H1 fontWeight="700" level={2}>
          How to play?
        </H1>
        <P
          style={{ marginTop: '12px' }}
          onMouseEnter={e =>
            props.setMovement([
              ...props.movement,
              {
                location: 'Game Description',
                timestamp: new Date(),
                x: e.screenX,
                y: e.screenY,
              },
            ])
          }
        >
          {props.gameData.gameDescription}
        </P>
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
