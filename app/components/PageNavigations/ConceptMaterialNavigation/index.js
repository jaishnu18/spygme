/**
 *
 * ConceptMaterialNavigation
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import BackImage from 'images/back.png';
import Icons from 'components/IconBox';
import H1 from 'components/atoms/H1';

import { Link } from 'react-router-dom';

import useMediaQuery from 'utils/useMediaQuery';

export const Wrapper = styled(Row)`
  width: 100% !important;
  // display: flex;
  padding: ${props => (props.isDesktop ? '40px' : '20px')};
`;

function ConceptMaterialNavigation(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <Wrapper isDesktop={isDesktop}>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={props.prevPageLink}>
          <Button
            style={{
              padding: '6px',
              border: `1px solid var(--primaryColor)`,
              height: 'fit-content',
            }}
            shape="circle"
          >
            {/* {props.prevPageText} */}
            <Icons size="30px" src={BackImage} />
          </Button>
        </Link>
      </Col>
      <Col
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '20px',
        }}
        xs={{ span: 20 }}
        xl={{ span: 22 }}
      >
        <H1 fontWeight="700" style={{ textAlign: 'center' }}>
          {props.conceptName}
        </H1>
      </Col>
    </Wrapper>
  );
}

ConceptMaterialNavigation.propTypes = {};

export default memo(ConceptMaterialNavigation);
