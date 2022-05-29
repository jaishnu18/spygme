/**
 *
 * QuestionDataDownload
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Button from 'antd/lib/button';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';

function QuestionDataDownload(props) {
  return (
    <Button type='primary' shape='round'>
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(props.gameData),
        )}`}
        download={`${props.gameData.name}-${props.gameData.level}.json`}
      >
        {`Download Question Data`}
      </a>
    </Button >
  );
}

QuestionDataDownload.propTypes = {
  gameData: PropTypes.object,
};

export default memo(QuestionDataDownload);
