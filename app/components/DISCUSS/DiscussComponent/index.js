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
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import CustomCard from '../../CustomCard';
import Title from 'antd/lib/typography/Title';
import LikeOutlined from '@ant-design/icons/LikeOutlined';
import Paragraph from 'antd/lib/typography/Paragraph';
import Search from 'antd/lib/input/Search';
import Tag from 'antd/lib/tag';
import Select from 'antd/lib/select';
const { Option } = Select;

function DiscussComponent(props) {
  const { threads } = props;
  const { concepts } = props;
  const parse = require('html-react-parser');

  return (
    <div>
      <Row style={{ padding: '20px', justifyContent: 'center' }}>
        <Col xl={{ span: 6 }} xs={{ span: 24 }}>
          <Search placeholder="Enter search text" allowClear onSearch={props.onSearch} />
        </Col>
        <Col xl={{ span: 4 }} xs={{ span: 12 }}>
          <Select
            showSearch
            placeholder="Filter by tag"
            optionFilterProp="children"
            onChange={props.onFilter}
            style={{ width: '100%' }}
            allowClear
          >
            {concepts.map((key, idx) => (
              <Option value={key.name}>{key.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={2} offset={1}>
          <Link to='/discuss/new-thread'>
            <Button shape='round' type='primary'>New Thread</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={24} >
          {threads && (
            threads.map((key, idx) => (
              (props.searchText === "" || key.title.toLowerCase().includes(props.searchText.toLowerCase()) || key.content.toLowerCase().includes(props.searchText.toLowerCase(0)))
              &&
              (props.filter == "" || key.tags.includes(props.filter))
              &&
              <Row style={{ padding: '10px' }}>
                <Col span={24}>
                  <Link to={`/discuss/view-thread/${key.id}`} onClick={() => {
                    this.forceUpdate();
                  }}>
                    <CustomCard
                      title={key.title}
                    >
                      <Row>
                        <Tag>
                          {key.tags}
                        </Tag>
                      </Row>
                      <Row>
                        <div style={{height:'20px', overflow:'hidden'}}>
                          {parse(key.content)}
                        </div>
                      </Row>
                      <Row style={{ fontSize: '10px' }}>
                        Author: {key.author}
                      </Row>
                      <Row style={{ fontSize: '10px' }}>
                        Created at: {(new Date(key.created_at)).toLocaleString()}
                      </Row>
                      <Row>
                        <Col>
                          <LikeOutlined />: {key.upvote}
                        </Col>
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
