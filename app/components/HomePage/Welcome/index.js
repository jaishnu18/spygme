/**
 *
 * Welcome
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import H1 from 'components/atoms/H1';
import CustomButton from 'components/atoms/CustomButton';
import Rocket from 'images/Hp1.png';
import BgImage from 'images/welcome-bg.png';
import { Link } from 'react-router-dom';
import Icons from 'components/IconBox';
import useMediaQuery from '../../../utils/useMediaQuery';

const Wrapper = styled(Row)`
  height: ${props =>
    props.isDesktop ? 'calc(100vh - 82px)' : 'calc(100vh - 82px)'};
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-20px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  .rocket {
    transform: translatey(0px);
    animation: float 2.5s ease-in-out infinite;
    height: auto;
  }

  h1 {
    text-shadow: 0.1em 0.1em 0 #c4ccc6;
  }
  .heading {
    font-weight: 900;
    line-height: 1.1;
    max-inline-size: 15ch;
  }
`;
function Welcome(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <Wrapper isDesktop={isDesktop}>
      <Col span={24}>
        <div
          style={{
            width: '100%',
            height: isDesktop ? '100%' : '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundImage: `url(${BgImage})`,
            backgroundSize: 'cover',
          }}
        >
          <img
            style={{
              margin: '50px 0',
              width: !isDesktop ? '80%' : 'auto',
              // height: !isDesktop ? '80%' : '100%',
            }}
            className="rocket"
            src={Rocket}
            alt="Rocket"
          />
          <H1 className="heading" fontSize={isDesktop ? '60' : '45'}>
            AI for Schools
          </H1>
          <H1 fontSize={isDesktop ? '38' : '22'} marginTop="20">
            Powering AI to Teach AI
          </H1>
          <Button
            size="large"
            style={{
              borderRadius: '4px',
              backgroundColor: 'var(--primaryColor)',
              marginTop: '40px',
            }}
          >
            <Link
              style={{
                color: 'var(--bgColor)',
              }}
              to="/auth"
            >
              Start Learning
            </Link>
          </Button>
        </div>
      </Col>
    </Wrapper>
  );
}

Welcome.propTypes = {};

export default memo(Welcome);
