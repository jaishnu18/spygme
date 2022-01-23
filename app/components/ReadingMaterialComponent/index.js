/**
 *
 * ReadingMaterialComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import CustomCard from 'components/CustomCard';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomButton from 'components/atoms/CustomButton';
import Image from 'antd/lib/image';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled'

function ReadingMaterialComponent(props) {
  const contentArr = props.content.content.split("<image>");
  return (
    <div>
      <Row style={{ paddingLeft: '40px', paddingBottom: '10px', paddingRight: '40px' }}>
        <Col span={24}>
          {props.content && (
            <CustomCard
              title={`Reading Material : ${props.content.id}`}>
              {
                contentArr &&
                contentArr.map((key, idx) => (
                  idx === contentArr.length - 1 ?
                    (
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                        {key.replace(/<new_line>/g, '\n')}
                      </pre>
                    ) : (
                      <Image preview={false} src={require('images/' + key)} />
                    )
                ))
              }

            </CustomCard>
          )}
        </Col>
      </Row>
      <Row style={{ paddingLeft: '40px' }}>
        {
          props.content.read ?
            <CheckCircleFilled style={{ fontSize: '40px', color: 'green' }} />
            :
            <CustomButton onClick={props.markAsRead}>Mark as Read</CustomButton>
        }
      </Row>
    </div>
  );
}

ReadingMaterialComponent.propTypes = {};

export default memo(ReadingMaterialComponent);
