/**
 *
 * OurTeam
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Icons from 'components/IconBox';
import FacebookFilled from '@ant-design/icons/FacebookFilled';
import BgImage from 'images/welcome-bg.png';
import ProfileCard from './ProfileCard';

function OurTeam() {
  return (
    <StyledRow id="team" justify="center">
      <Col style={{ padding: '40px' }} span={24}>
        <H1
          margin="20"
          fontSize="50"
          textAlign="center"
          style={{ textShadow: '0.1em 0.1em 0 #c4ccc6' }}
        >
          Our Team
        </H1>
        <H1 fontSize="20" margintop="20" textAlign="center">
          "If everyone is moving forward together, then success takes care of
          itself." --Henry Ford
        </H1>
      </Col>

      <Row gutter={[0, 60]} style={{ margin: '20px', marginBottom: '40px' }}>
        <Col xs={{ span: 24 }} xl={{ span: 6 }}>
          <ProfileCard
            profileUrl="https://drive.google.com/uc?export=view&id=1puMfUqpYPp-IWkVNesnwG9_51WkOE86b"
            heading="Prof. Partha P. Chakrabarti"
            subHeading="Department of Computer Science and Engineering, IIT Kharagpur"
          />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 6 }}>
          <ProfileCard
            profileUrl="https://drive.google.com/uc?export=view&id=1qmgpib1opai8BNPV_rSHe8NqexZd20k9"
            heading="Rajiv Agarwal"
            subHeading="Co-Founder and CEO at Edudigm"
          />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 6 }}>
          <ProfileCard
            profileUrl="https://drive.google.com/uc?export=view&id=1qFWbnFB2Cmn00-tQnJcxXDLNBPwD62Ue"
            heading="Bbiswabasu Roy"
            subHeading="Electronics & Electrical Communication Engineering, IIT Kharagpur"
          />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 6 }}>
          <ProfileCard
            profileUrl="https://drive.google.com/uc?export=view&id=1bGRYoZkGz2b68CYwv9fzStbIDZY61Dgw"
            heading="Prashant Jangid"
            subHeading="Department of Industrial and Systems Engineering, IIT Kharagpur"
          />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 6 }}>
          <ProfileCard
            heading="Yash Agrawal"
            profileUrl="https://drive.google.com/uc?export=view&id=1tCT-gpcm31EvDWUKvWWmHIntLk6VyYT4"
            subHeading="Electronics & Electrical Communication Engineering, IIT Kharagpur"
          />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 6 }}>
          <ProfileCard
            heading="Adithya Saikumar"
            profileUrl="https://drive.google.com/uc?export=view&id=10cs4fF9HEoEkG4Qa0uZGRqmVOf8n2dve"
            subHeading="Computer Science & Engineering, IIT Kharagpur"
          />
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 6 }}>
          <ProfileCard
            heading="Sagar Singh"
            profileUrl="https://drive.google.com/uc?export=view&id=1Wrh3DeqhqbeLDYfNQYU2JkJbCjpVndbZ"
            subHeading="Computer Science & Engineering, Manipal Institute of Technology"
          />
        </Col>
      </Row>
    </StyledRow>
  );
}

OurTeam.propTypes = {};

export default memo(OurTeam);

const StyledRow = styled(Row)`
  // @keyframes fadeInUp {
  //   from {
  //     transform: translate3d(0, 40px, 0);
  //   }

  //   to {
  //     transform: translate3d(0, 0, 0);
  //     opacity: 1;
  //   }
  // }

  // @-webkit-keyframes fadeInUp {
  //   from {
  //     transform: translate3d(0, 40px, 0);
  //   }

  //   to {
  //     transform: translate3d(0, 0, 0);
  //     opacity: 1;
  //   }
  // }

  // .animated {
  //   animation-duration: 1s;
  //   animation-fill-mode: both;
  //   -webkit-animation-duration: 1s;
  //   -webkit-animation-fill-mode: both;
  // }

  // .animatedFadeInUp {
  //   opacity: 0;
  // }

  // .fadeInUp {
  //   opacity: 0;
  //   animation-name: fadeInUp;
  //   -webkit-animation-name: fadeInUp;
  // }
`;
