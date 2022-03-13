/**
 *
 * QuestionDataDownload
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function QuestionDataDownload(props) {
  return (
    <a
      href={`data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(props.gameData),
      )}`}
      download={`${props.gameData.name}-${props.gameData.level}.json`}
    >
      {`Download Question Data`}
    </a>
  );
}

QuestionDataDownload.propTypes = {
  gameData: PropTypes.object,
};

export default memo(QuestionDataDownload);
