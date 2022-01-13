/**
 *
 * ReadingMaterialComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import DescriptionCard from 'components/DescriptionCard';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

function ReadingMaterialComponent(props) {
  const contentArr = props.content.content.split("<new_line>");
  console.log(contentArr);
  return (
    <Row style={{ padding: '10px' }}>
      <Col span={24}>
        {props.content &&
          (
            <DescriptionCard title={"Reading Material : " + props.content.id} description={contentArr} />
          )
        }
      </Col>
    </Row>
  );
}

ReadingMaterialComponent.propTypes = {};

export default memo(ReadingMaterialComponent);
