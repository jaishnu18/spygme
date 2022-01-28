/**
 *
 * NavigationBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link, useHistory } from 'react-router-dom';
import CustomButton from 'components/atoms/CustomButton';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import Affix from 'antd/lib/affix';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Tooltip from 'antd/lib/tooltip';

function NavigationBar(props) {

  return (
    <Affix offsetTop={60}>
      <Row style={{ padding: '20px', backgroundColor: 'white' }}>
        {props.readingMaterial ? (
          <Col
            xs={{ span: 24 }}
            xl={{ span: 10 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <CustomButton onClick={props.backToMaterials}>
              <ArrowLeftOutlined />
              {props.prevPageText}
            </CustomButton>
            {
              props.read ?
                <Tooltip title="Marked as read">
                  <CheckCircleFilled style={{ fontSize: '30px', color: 'green' }} />
                </Tooltip>
                :
                <CustomButton onClick={props.markAsRead}>Mark as Read</CustomButton>
            }
          </Col>

        ) : (
          props.prevPageLink && (
            <Col
              xs={{ span: 24 }}
              xl={{ span: 10 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Link to={props.prevPageLink}>
                <CustomButton><ArrowLeftOutlined />{props.prevPageText}</CustomButton>
              </Link>
            </Col>
          )
        )}

        {props.game ? (
          <Col xs={{ span: 24 }} xl={{ span: 4, offset: 6 }}>
            <CustomButton
              disabled={props.level === '1'}
              onClick={() => {
                window.location.href = props.prevLevelLink;
              }}
            >
              {'< Prev Level'}
            </CustomButton>
          </Col>
        ) : null}

        {props.game ? (
          <Col xs={{ span: 24 }} xl={{ span: 4 }}>
            <CustomButton
              disabled={props.level === props.maxLevel}
              onClick={() => {
                window.location.href = props.nextLevelLink;
              }}
            >
              {'Next level >'}
            </CustomButton>
          </Col>
        ) : null}

        {props.gradedGame && (
          <Row style={{ width: '100%' }}>
            <Col xl={{ span: 12 }}>
              <CustomButton
                onClick={() =>
                  props.setCurrentLevel(
                    Math.max(0, parseInt(props.currentLevel) - 1),
                  )
                }
              >
                Previous
              </CustomButton>
              <CustomButton
                marginLeft="20px"
                onClick={() =>
                  props.setCurrentLevel(
                    Math.min(
                      props.maxLevel - 1,
                      parseInt(props.currentLevel) + 1,
                    ),
                  )
                }
              >
                Next
              </CustomButton>
            </Col>
            <Col
              xs={{ span: 24 }}
              xl={{ span: 12 }}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <CustomButton danger
                onClick={() => {
                  history.back();
                }}
              >Exit Test</CustomButton>
              <CustomButton disableOnClick
                onClick={() => {
                  props.submit();
                }}
              >
                Submit
              </CustomButton>
            </Col>
          </Row>
        )}
      </Row>
    </Affix>
  );
}

NavigationBar.propTypes = {};

export default memo(NavigationBar);
