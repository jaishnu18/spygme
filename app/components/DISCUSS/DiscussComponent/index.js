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
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import LikeOutlined from '@ant-design/icons/LikeOutlined';
import Paragraph from 'antd/lib/typography/Paragraph';
import Search from 'antd/lib/input/Search';
import Tag from 'antd/lib/tag';
import Select from 'antd/lib/select';
import parse from 'html-react-parser';
import BgProfile from 'images/bgProfile.jpg';
import CustomCard from '../../CustomCard';
import H1 from '../../atoms/H1';
import CustomButton from '../../atoms/CustomButton';
import useMediaQuery from '../../../utils/useMediaQuery';
const { Option } = Select;

function DiscussComponent(props) {
  const { threads } = props;
  const { concepts } = props;

  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <div
      style={{
        backgroundImage: `url(${BgProfile})`,
        backgroundSize: `cover`,
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      <Row
        style={{
          padding: isDesktop ? '40px' : '20px',
          justifyContent: isDesktop ? 'space-between' : 'initial',
        }}
        gutter={[0, 20]}
      >
        <Col
          style={{ paddingLeft: isDesktop && '20px' }}
          xl={{ span: 6 }}
          xs={{ span: 24 }}
        >
          <H1 fontWeight="700" color="var(--primaryColor)">
            Disussion Forum
          </H1>
        </Col>
        <Col xl={{ span: 6 }} xs={{ span: 24 }}>
          <Search
            placeholder="Enter search text"
            allowClear
            onChange={props.onSearch}
          />
        </Col>
        <Col xl={{ span: 4 }} xs={{ span: 24 }}>
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
        <Col
          span={isDesktop ? 2 : 24}
          style={{
            display: !isDesktop && 'flex',
            justifyContent: !isDesktop && 'flex-end',
          }}
        >
          <Link to="/discuss/new-thread">
            <CustomButton shape="round" type="primary">
              New Thread
            </CustomButton>
          </Link>
        </Col>
      </Row>
      <Row style={{ padding: '20px' }} justify={isDesktop && 'center'}>
        <Col xl={{ span: 12 }} xs={{ span: 24 }}>
          {threads &&
            threads.map(
              (key, idx) =>
                (props.searchText === '' ||
                  key.title
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase()) ||
                  key.content
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase(0))) &&
                (props.filter == '' || key.tags.includes(props.filter)) && (
                  <Row style={{ padding: isDesktop && '20px' }}>
                    <Col span={24}>
                      <Link
                        to={`/discuss/view-thread/${key.id}`}
                        onClick={() => {
                          this.forceUpdate();
                        }}
                      >
                        <CustomCard
                          title={
                            <H1
                              fontSize="24"
                              fontWeight="500"
                              style={{ padding: '4px' }}
                            >
                              {key.title}
                            </H1>
                          }
                        >
                          <Row style={{ marginBottom: '10px' }}>
                            <Tag
                              // color="var(--primaryColor)"
                              style={{
                                height: '30px',
                                // width: '40px',
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              {key.tags}
                            </Tag>
                          </Row>
                          <div
                            style={{
                              // height: '20px',
                              overflow: 'hidden',
                              fontSize: '20px',
                            }}
                            // style={{ fontSize: '18px' }}
                          >
                            {parse(key.content)}
                          </div>
                          <Row
                            style={{ fontSize: '16px', marginBottom: '4px' }}
                          >
                            Author: {key.author}
                          </Row>
                          <Row
                            style={{ fontSize: '16px', marginBottom: '10px' }}
                          >
                            Created at:{' '}
                            {new Date(key.created_at).toLocaleString()}
                          </Row>
                          <Row>
                            <Col style={{ fontSize: '18px' }}>
                              <LikeOutlined />: {key.upvote}
                            </Col>
                          </Row>
                        </CustomCard>
                      </Link>
                    </Col>
                  </Row>
                ),
            )}
        </Col>
      </Row>
    </div>
  );
}

DiscussComponent.propTypes = {};

export default memo(DiscussComponent);
