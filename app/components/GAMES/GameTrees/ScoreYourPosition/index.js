/**
 *
 * ScoreYourPosition
 *
 */

import React, { memo } from 'react';
import BinaryTree from '../components/BinaryTree';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const data = {
  inorder: [4, 2, 5, 1, 3],
};

function ScoreYourPosition() {
  return (
    <div className="main-div">
      <div className="game-section">
        <BinaryTree inorder={data.inorder} />
      </div>
    </div>
  );
}

ScoreYourPosition.propTypes = {};

export default memo(ScoreYourPosition);
