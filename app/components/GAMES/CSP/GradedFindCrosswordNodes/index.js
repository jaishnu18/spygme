/**
 *
 * GradedFindCrosswordNodes
 *
 */

import React, { memo } from 'react';
import FormFindCrosswordNodes from '../FormFindCrosswordNodes';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function GradedFindCrosswordNodes(props) {
  const { gameData } = props;
  console.log(gameData);
  return (
    <div>
      {gameData.map((obj, index) => (
        <FormFindCrosswordNodes
          key={`Number-${index + 1}`}
          ID={`Number-${index + 1}`}
          value={props.value}
          setValue={props.setValue}
          currentLevel={props.currentLevel}
        />
      ))}
    </div>
  );
}

GradedFindCrosswordNodes.propTypes = {};

export default memo(GradedFindCrosswordNodes);
