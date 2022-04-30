/**
 *
 * DiscussComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import CustomButton from '../../atoms/CustomButton';
import { Link } from 'react-router-dom';
import CustomCard from '../../CustomCard';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

function DiscussComponent(props) {
  const { threads } = props;
  return (
    <div>
      <Row style={{ padding: '20px' }}>
        <Col>
          <Link to='/discuss/new-thread'>
            <CustomButton>New Thread</CustomButton>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={24} >
          {threads && (
            threads.map((key, idx) => (
              <Row style={{ padding: '10px' }}>
                <Col span={24}>
                  <Link to={`/discuss/view-thread/${key.id}`}>
                    <CustomCard
                      title={key.title}
                    >
                      <Row>
                        <Paragraph ellipsis>
                          {key.content}
                        </Paragraph>
                      </Row>
                      <Row style={{fontSize:'10px'}}>
                        Author: {key.author}
                      </Row>
                      <Row style={{fontSize:'10px'}}>
                        Upvote: {key.upvote} Downvote:{key.downvote}
                      </Row>
                    </CustomCard>
                  </Link>
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>
    </div>
  )
}

DiscussComponent.propTypes = {};

export default memo(DiscussComponent);
