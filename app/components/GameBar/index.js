/**
 *
 * GameBar
 *
 */

import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Descriptions from 'antd/lib/descriptions';
import H1 from 'components/atoms/H1';
import TimeClock from 'components/TimeClock';
import H4 from 'components/atoms/H4';
import NavigationBar from '../NavigationBar';
import { v4 as uuidv4 } from 'uuid';

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
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef) {
      let cssData = '';
      const cssProperties = getComputedStyle(divRef.current);
      for (let i = 0; i < cssProperties.length; i += 1) {
        cssData += `${cssProperties[i]}:${cssProperties.getPropertyValue(
          cssProperties[i],
        )}, `;
      }
      const boundingRect = divRef.current.getBoundingClientRect();
      const positionData = JSON.stringify({
        bottom: boundingRect.bottom,
        height: boundingRect.height,
        left: boundingRect.left,
        right: boundingRect.right,
        top: boundingRect.top,
        width: boundingRect.width,
        x: boundingRect.x,
        y: boundingRect.y,
      });

      const components = [...props.components];
      components.push({
        componentId: uuidv4(),
        cssData,
        positionData,
      });
      props.setComponents(components);
    }
  }, [divRef]);

  return (
    <div ref={divRef}>
      <NavigationBar
        prevPageText="Back to materials"
        prevPageLink={`/concept/${topicId}/${conceptId}`}
        game
        heading={props.name}
        nextLevelLink={nextLevelLink}
        prevLevelLink={prevLevelLink}
        level={props.level}
        maxLevel={props.maxLevel}
        reportError={props.reportError}
        evaluatedAnswer={props.evaluatedAnswer}
        saveFeedback={props.saveFeedback}
        onMouseEnter={e =>
          props.setMovement([
            ...props.movement,
            {
              location: 'Navigation Bar',
              timestamp: new Date(),
              x: e.screenX,
              y: e.screenY,
            },
          ])
        }
      />
      {/* <Row
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
            <Descriptions.Item
              label="Timer"
              onMouseEnter={e =>
                props.setMovement([
                  ...props.movement,
                  {
                    location: 'Timer',
                    timestamp: new Date(),
                    x: e.screenX,
                    y: e.screenY,
                  },
                ])
              }
            >
              <TimeClock active={!props.evaluatedAnswer} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row> */}
    </div>
  );
}

GameBar.propTypes = {};

export default memo(GameBar);
