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
  console.log(window.location.href);
  return (
    <Row style={{ padding: '10px' }}>
      <Col xs={{ span: 24 }} xl={{ span: 10 }}>
        {props.readingMaterial ? (
            <CustomButton onClick={props.backToMaterials}>
              {props.prevPageText}
            </CustomButton>
        ) : (
          <Link to={props.prevPageLink}>
            <CustomButton>
              {props.prevPageText}
            </CustomButton>
          </Link>
        )}
      </Col>
      {
        props.game ? (
          <Col xs={{ span: 24 }} xl={{ span: 4, offset: 6 }}>
            <CustomButton disabled={props.level === "1"} onClick={() => {
              window.location.href = props.prevLevelLink;
            }}>
              {"< Prev Level"}
            </CustomButton>
          </Col>
        ) : null
      }
      {
        props.game ? (
          < Col xs={{ span: 24 }} xl={{ span: 4 }}>
            <CustomButton disabled={props.level === props.maxLevel} onClick={() => {
              window.location.href = props.nextLevelLink;
            }}>
              {"Next level >"}
            </CustomButton>
          </Col>
        ) : null
      }
    </Row >
  );
}

NavigationBar.propTypes = {};

export default memo(NavigationBar);
