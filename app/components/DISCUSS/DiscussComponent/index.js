/**
 *
 * DiscussComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomButton from '../../atoms/CustomButton';
import { Link } from 'react-router-dom';

function DiscussComponent() {
  return (
    <Row>
      <Link to='/discuss/new-thread'>
        <CustomButton>New Thread</CustomButton>
      </Link>
    </Row>
  )
}

DiscussComponent.propTypes = {};

export default memo(DiscussComponent);
