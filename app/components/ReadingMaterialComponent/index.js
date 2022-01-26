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
import Collapse from 'antd/lib/collapse';
import topicIcon from 'images/topic_1_icon.png';

const { Panel } = Collapse;
function ReadingMaterialComponent(props) {
  const contentArr = props.content.content.split("<image>");
  const parse = require('html-react-parser');
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
                  key.endsWith('.png') ?
                    (
                      <Image preview={false} src={require('images/' + key)} />
                    ) : (

                      key.startsWith('Answer:') ?
                        <Collapse>
                          <Panel key={1} header="Check Answer" >
                            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                              {key.replace(/<new_line>/g, '\n')}
                            </pre>
                          </Panel>
                        </Collapse>
                        :
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                          {parse(key.replace(/<new_line>/g, '\n'))}
                        </pre>

                    )
                ))
              }

            </CustomCard>
          )}
        </Col>
      </Row>
    </div>
  );
}

ReadingMaterialComponent.propTypes = {};

export default memo(ReadingMaterialComponent);
