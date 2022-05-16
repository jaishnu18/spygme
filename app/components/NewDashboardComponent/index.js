/**
 *
 * NewDashboardComponent
 *
 */

import React, { memo } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin: 20px;
  padding: 24px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  flex-direction: column;

  .ant-progress-text {
    font-size: 14px !important;
    font-weight: 700 !important;
  }
`;

function NewDashboardComponent() {
  return (
    <div>
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 10 }}>
          <div style={{ width: '90%' }}>
            <h2 />
          </div>
        </Col>
      </Row>
    </div>
  );
}

NewDashboardComponent.propTypes = {};

export default memo(NewDashboardComponent);
