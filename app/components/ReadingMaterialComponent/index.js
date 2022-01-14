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
import CustomButton from 'components/atoms/CustomButton'; 

function ReadingMaterialComponent(props) {
  const contentArr = props.content.content.split("<new_line>");

  return (
    <div>
      <Row style={{ padding: '10px' }}>
        <Col span={24}>
          {props.content &&
            (
              <DescriptionCard isReadingMaterial title={"Reading Material : " + props.content.id} description={contentArr} />
            )
          }
        </Col>
      </Row>
      <Row style={{ padding: '10px' }}>
        <CustomButton onClick={props.markAsRead}>Mark as Read</CustomButton>
      </Row>
    </div>
  );
}

ReadingMaterialComponent.propTypes = {};

export default memo(ReadingMaterialComponent);
