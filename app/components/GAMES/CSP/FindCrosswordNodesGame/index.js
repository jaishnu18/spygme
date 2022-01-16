/**
 *
 * FindCrosswordNodesGame
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import FormFindCrosswordNodes from '../FormFindCrosswordNodes';

function FindCrosswordNodesGame(props) {
  return (
    <Row>
      <Col xl={{ span: 12 }} style={{ padding: '40px' }}>
        <FormFindCrosswordNodes {...props} />
      </Col>
      <Col xl={{ span: 12 }}>Crossword</Col>
    </Row>
  );
}

FindCrosswordNodesGame.propTypes = {};

export default memo(FindCrosswordNodesGame);
