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

function NavigationBar(props) {
  console.log(props.currentLevel);

  return (
    <Row style={{ padding: '40px' }}>
      {props.readingMaterial ? (
        <Col
          xs={{ span: 24 }}
          xl={{ span: 10 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CustomButton onClick={props.backToMaterials}>
            {props.prevPageText}
          </CustomButton>
        </Col>
      ) : (
        props.prevPageLink && (
          <Col
            xs={{ span: 24 }}
            xl={{ span: 10 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Link to={props.prevPageLink}>
              <CustomButton>{props.prevPageText}</CustomButton>
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
        <Col span={24} style={{ display: 'flex', width: '100%' }}>
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
            marginLeft="auto"
            onClick={() =>
              props.setCurrentLevel(
                Math.min(props.maxLevel - 1, parseInt(props.currentLevel) + 1),
              )
            }
          >
            Next
          </CustomButton>
        </Col>
      )}
    </Row>
  );
}

NavigationBar.propTypes = {};

export default memo(NavigationBar);
