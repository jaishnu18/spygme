/**
 *
 * DescriptionCard
 *
 */

import React, { memo } from 'react';
import CustomCard from 'components/CustomCard';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import Progress from 'antd/lib/progress';
import Button from 'antd/lib/button';
import Image from 'antd/lib/image';
import Tooltip from 'antd/lib/tooltip';
import history from 'utils/history';
import { Link } from 'react-router-dom';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import useMediaQuery from '../../utils/useMediaQuery';

const { Title } = Typography;

function DescriptionCard(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    <CustomCard
      isDesktop={props.isDesktop}
      title={props.title}
      hoverable={props.hoverable}
      color={props.color ? props.color : 'white'}
    >
      <Row>
        {props.isReadingMaterial ? (
          props.description.map((key, idx) => (
            <pre style={{ fontFamily: 'cursive' }}>{`${key}\n<b>sdfd</b>`}</pre>
          ))
        ) : (
          <Tooltip title={props.description}>
            <H1 fontSize={!isDesktop && '22'} fontWeight="500" level={3}>
              {props.description}
            </H1>
          </Tooltip>
        )}
      </Row>
      {props.imageLocation && (
        <Row style={{ justifyContent: 'center' }}>
          <Col>
            <Image src={props.imageLocation} preview={false} />
          </Col>
        </Row>
      )}

      {props.relativeStats && (
        <Row>
          <P margintop="4" fontsize="15">
            {props.relativeStats}
          </P>
        </Row>
      )}
      {props.progress !== undefined && (
        <div>
          <Row>
            <P margintop="12">
              {props.customProgressText
                ? props.customProgressText
                : 'Your progress'}
            </P>
          </Row>
          <Row>
            <Progress
              status="active"
              percent={props.progress}
              strokeColor={{
                '0%': 'var(--primaryColor)',
                '100%': '#87d068',
              }}
            />
          </Row>
        </div>
      )}

      {props.numberRead !== undefined && (
        <P fontweight="700" style={{ paddingTop: '10px' }}>
          {props.numberRead}
        </P>
      )}
      <Row>
        {props.practiceGame ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '16px',
              }}
            >
              <P
                style={{
                  margin: '0',
                  fontWeight: 600,
                }}
              >
                Play Level:
              </P>
              {[...Array(props.levels)].map((x, i) => (
                <Button
                  key={`${i + 1}`}
                  onClick={() => {
                    window.location.href = `${props.link}${props.parentTopic}/${
                      props.parentConcept
                    }/${props.id}/${i + 1}`;
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <div style={{ display: isDesktop && 'flex', marginTop: '16px' }}>
              <P fontweight="500" fontsize="16">
                Your highest scores:
              </P>
              <P
                fontweight="500"
                fontsize="16"
                style={{ marginLeft: isDesktop && '8px' }}
              >
                {props.suggestionText.map(
                  (key, idx) => `Level ${idx + 1}: ${key}%, `,
                )}
              </P>
            </div>
          </div>
        ) : (
          <P
            fontweight="500"
            fontsize="16"
            style={{ color: props.suggestionTextColor, marginTop: '8px' }}
          >
            {props.suggestionText}
          </P>
        )}
      </Row>
    </CustomCard>
  );
}

DescriptionCard.propTypes = {};

export default memo(DescriptionCard);
