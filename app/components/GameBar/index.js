/**
 *
 * GameBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Descriptions from 'antd/lib/descriptions';
import H1 from 'components/atoms/H1';
import TimeClock from 'components/TimeClock';
import H4 from 'components/atoms/H4';
import NavigationBar from '../NavigationBar';

function getNextLevelLink(level) {
  const cur = window.location.href;
  const lastInd = cur.lastIndexOf('/');
  let nxt = cur.substring(cur.indexOf('/'), lastInd);
  nxt = `${nxt}/${level + 1}`;
  return nxt;
}

function getPrevLevelLink(level) {
  const cur = window.location.href;
  const lastInd = cur.lastIndexOf('/');
  let prv = cur.substring(cur.indexOf('/'), lastInd);
  prv = `${prv}/${level - 1}`;
  return prv;
}
function GameBar(props) {
  const { conceptId } = props;
  const { topicId } = props;
  const nextLevelLink = getNextLevelLink(parseInt(props.level));
  const prevLevelLink = getPrevLevelLink(parseInt(props.level));

  return (
    <div>
      <NavigationBar
        prevPageText="Back to materials"
        prevPageLink={`/concept/${topicId}/${conceptId}`}
        game
        nextLevelLink={nextLevelLink}
        prevLevelLink={prevLevelLink}
        level={props.level}
        maxLevel={props.maxLevel}
      />
      <Row
        style={{
          minHeight: '8vh',
          alignItems: 'center',
          margin: ' 0px 40px 10px',
          padding: '20px',
        }}
      >
        <Col xl={{ span: 8, offset: 2 }} xs={{ span: 24 }}>
          <H1 fontSize={40}>{props.name}</H1>
        </Col>

        <Col xl={{ span: 11, offset: 2 }} xs={{ span: 24 }}>
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Level">
              {props.level} / {props.maxLevel}
            </Descriptions.Item>
            <Descriptions.Item label="Attempt">
              {props.attempts}
            </Descriptions.Item>
            <Descriptions.Item label="Timer">
              <TimeClock active={!props.evaluatedAnswer} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  );
}

GameBar.propTypes = {};

export default memo(GameBar);
