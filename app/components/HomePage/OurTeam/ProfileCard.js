/**
 *
 * OurTeam
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';
import FacebookFilled from '@ant-design/icons/FacebookFilled';
import useMediaQuery from '../../../utils/useMediaQuery';
function ProfileCard(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        hoverable
        style={{
          width: isDesktop ? '60%' : '100%',
          boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
        cover={
          <img
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            alt="example"
            src={props.profileUrl}
          />
        }
      >
        <H1 fontSize="20" textAlign="center">
          {props.heading}
        </H1>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <P fontsize="14" textalign="center">
            {props.subHeading}
          </P>
        </div>
      </Card>
    </div>
  );
}

ProfileCard.propTypes = {};

export default memo(ProfileCard);
