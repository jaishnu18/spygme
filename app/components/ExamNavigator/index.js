/**
 *
 * ExamNavigator
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomButton from '../atoms/CustomButton';

function ExamNavigator(props) {
  const arr = new Array(props.levels);
  for (let i = 0; i < props.levels; i++) {
    arr[i] = i + 1;
  }

  return (
    <>
      <Row
        justify="start"
        gutter={[48, 16]}
        style={{ width: '100%', margin: '0px', padding: '20px' }}
      >
        {arr.map((x, i) => (
          <Col
            key={x}
            span={2}
            // offset={1}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid grey',
            }}
          >
            <CustomButton
              onClick={() => {
                props.setCurrentLevel(i);
              }}
            >
              {x}
            </CustomButton>
          </Col>
        ))}
      </Row>
    </>
  );
}

ExamNavigator.propTypes = {};

export default memo(ExamNavigator);
