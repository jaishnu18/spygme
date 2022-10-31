/**
 *
 * NewTopicListComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import H1 from 'components/atoms/H1';
import TopicIcon from 'images/topic.png';
import { Link } from 'react-router-dom';
import DescriptionCard from 'components/DescriptionCard';
import BgImage from 'images/welcome-bg.png';
import Section from '../Section';
import useMediaQuery from '../../utils/useMediaQuery';

function NewTopicListComponent(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');
  console.log(props);

  return (
    <Section
      style={{ backgroundImage: `url(${BgImage})`, backgroundSize: 'cover' }}
      minHeight="calc(100vh - 80px)"
      padding={isDesktop ? '40px' : '28px'}
    >
      <StyledRow padding={isDesktop && '0 0 30px 0'}>
        <img
          style={{ width: '50px', height: '50px', marginRight: '12px' }}
          src={TopicIcon}
          alt="topics"
        />
        <H1 fontSize="40px" marginleft="20">
          {props.topics.length} Topics
        </H1>
      </StyledRow>
      {props.topics.map((item, index) => (
        <StyledRow margin="0 0 30px 0" padding="0 0 12px 0">
          <Col span={24}>
            <H1 fontWeight="700">{item.name}</H1>
          </Col>
          <Col span={24}>
            <H1 fontSize="18">{item.description}</H1>
          </Col>
          <Row
            style={{
              width: '100%',
              overflowX: 'auto',
              marginTop: '20px',
              display: 'flex',
              paddingBottom: '20px',
            }}
            gutter={isDesktop && [64, 50]}
          >
            {item.concepts
              ? item.concepts.map((key, idx) => (
                  <Col
                    span={!isDesktop && 22}
                    style={{ marginTop: !isDesktop && '20px' }}
                  >
                    <Link to={`/concept/${item.id}/${key.id}`}>
                      <DescriptionCard
                        isDesktop={isDesktop}
                        description={key.name}
                        progress={Math.round(key.progress * 100)}
                        suggestionText={
                          item.concepts[idx].status === 0
                            ? 'Prerequisites not fulfilled'
                            : 'Prerequisites fulfilled'
                        }
                        suggestionTextColor={
                          item.concepts[idx].status === 0 ? 'red' : 'darkgreen'
                        }
                        relativeStats={
                          item.concepts[idx].numStarted
                            ? `More than ${
                                item.concepts[idx].numStarted
                              } user(s) already learning!`
                            : null
                        }
                      />
                    </Link>
                  </Col>
                ))
              : null}
          </Row>
        </StyledRow>
      ))}
    </Section>
  );
}

NewTopicListComponent.propTypes = {
  topics: PropTypes.array,
};

export default NewTopicListComponent;

const StyledRow = styled(Row)`
  width: 100% !important;
  display: flex;
  justify-content: flex-start;
  padding: ${props => props.padding || 'auto'};
  margin: ${props => props.margin || 'auto'};
  border-bottom: ${props => props.borderbottom || 'none'};
  align-items: center;
`;

const Scroller = styled.div`
  ::-webkit-scrollbar {
    width: 4px !important;
    height: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background: var(--bgColor);
    border-radius: 10x !important;
  }

  ::-webkit-scrollbar-thumb {
    background: #d8e0ed;
    border-radius: 10x !important;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #d8e0ed;
  }
`;
