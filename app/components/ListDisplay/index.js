/* eslint-disable no-nested-ternary */
/**
 *
 * ListDisplay
 *
 */

import React, { memo } from 'react';
import List from 'antd/lib/list';
import Button from 'antd/lib/button';
import Title from 'antd/lib/typography/Title';
import { StyledDiv } from '../DashboardComponent';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ListDisplay(props) {
  return (
    <StyledDiv>
      <Title level={3}>{props.title}</Title>
      <List
        size="small"
        style={{ margin: '15px 10px' }}
        bordered
        dataSource={props.gameplaySuggestion}
        renderItem={document => (
          <List.Item
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <p style={{ margin: 0 }}>Game Name - Practice/Graded</p>
            <Button onClick={() => {}}>Play</Button>
          </List.Item>
        )}
      />
    </StyledDiv>
  );
}

ListDisplay.propTypes = {};

export default memo(ListDisplay);
