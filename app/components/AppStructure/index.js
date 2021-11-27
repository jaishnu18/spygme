/**
 *
 * AppStructure
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, InputNumber, Button, Space, Select, Col, Row } from 'antd';
import TimeClock from 'components/TimeClock';

function AppStructure(props) {
  return (
    <div>
      <div style={{ width: '100%', background: '#295474', padding: 10 }}>
        <Row justify="space-around">
          <Col span={7}>
            <h1 style={{ color: 'white' }}>{props.heading}</h1>
          </Col>
          <Col span={3}>
            <h1 style={{ color: 'white' }}> {props.level}</h1>
          </Col>
          <Col span={3}>
            <h1 style={{ color: 'white' }}>Attempt :{props.attempt}</h1>
          </Col>
          <Col span={3}>
            <div style={{ display: 'flex' }}>
              <h1 className="time" style={{ color: 'white' }}>
                Time :
              </h1>
              <div style={{ marginLeft: '10px', color: 'white' }}>
                <TimeClock active={!props.evaluatedAnswer} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          background: '#F8FAA7',
        }}
      />
      <div style={{ display: 'flex', width: '100%', marginBottom: '0px' }} />
      <div
        style={{
          padding: '20px',
          background: '#295474',
          paddingBottom: '20px',
        }}
      >
        {props.divContent}
      </div>
    </div>
  );
}

AppStructure.propTypes = {
  heading: PropTypes.string,
  level: PropTypes.string,
  attempt: PropTypes.string,
  evaluatedAnswer: PropTypes.object,
  divContent: PropTypes.node,
};

export default memo(AppStructure);
