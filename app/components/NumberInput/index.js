/**
 *
 * NumberInput
 *
 */

import React, { memo } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function NumberInput(props) {
  return <Input type="number" id={props.id} />;
}

NumberInput.propTypes = {
  id: PropTypes.number,
};

export default memo(NumberInput);
