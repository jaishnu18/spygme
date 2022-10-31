/**
 *
 * PracticeGameStats
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/atoms/H1';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Steps from 'antd/lib/steps';
import useMediaQuery from '../../utils/useMediaQuery';

const { Step } = Steps;

const Wrapper = styled.div`
  padding: 0 30px 0 30px;
  display: flex;
  flex-direction: column;

  span {
    color: var(--primaryColor) !important;
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background: red !important;
  }
`;

function PracticeGameStats(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <div style={{ width: '100%' }}>
      {isDesktop && (
        <Steps
          style={{ backgroundColor: 'var(--prmaryColor)' }}
          // direction={isDesktop ? 'horizontal' : 'vertical'}
          progressDot
          current={props.level - 1}
        >
          {[...Array(props.maxLevel)].map((item, index) => (
            <Step title={`Level ${index + 1}`} />
          ))}
        </Steps>
      )}
      <Wrapper>
        <Row>
          <Col xl={{ span: 24 }}>
            <H1
              fontSize="20"
              style={{ marginTop: '20px', padding: '0' }}
              fontWeight="700"
            >
              {!isDesktop && (
                <div>{`Level: ${props.level} / ${props.maxLevel}`}</div>
              )}{' '}
              You played this level {props.attempts} times!
            </H1>
          </Col>
        </Row>
      </Wrapper>
    </div>
  );
}

PracticeGameStats.propTypes = {};

export default memo(PracticeGameStats);
