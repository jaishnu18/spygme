/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/**
 *
 * ConceptDescriptionPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SimpleCard from 'components/SimpleCard';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Row, Typography, Card, Button } from 'antd';
import styled from 'styled-components';
import ConceptCardSection from 'components/ConceptCardSection';
import NotFoundPage from 'containers/NotFoundPage';
import { Link } from 'react-router-dom';
import makeSelectConceptDescriptionPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getGamesStart, getReadingMaterialStart } from './actions';

const StyledRow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, #fff2b3 0px 6px 6px;
  margin: 40px 20px 20px 20px;
  min-height: 200px;
  background-color: #fff2b3;
  padding-bottom: 20px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '20px')};
`;

export function ConceptDescriptionPage(props) {
  useInjectReducer({ key: 'conceptDescriptionPage', reducer });
  useInjectSaga({ key: 'conceptDescriptionPage', saga });

  const { conceptId } = props;
  console.log(props);

  useEffect(() => {
    props.getGames({ conceptId });
    props.getReadingMaterials({ conceptId });
  }, []);

  const { games } = props.conceptDescriptionPage;
  const response = props.conceptDescriptionPage.readingMaterials;
  const readingMaterials = response ? response.rmArray : null;

  return (
    <div>
      <Helmet>
        <title>ConceptDescriptionPage</title>
        <meta
          name="description"
          content="Description of ConceptDescriptionPage"
        />
      </Helmet>
      {response ?
        (
          <Link to={`/topics/${response.parent_topic}`}>
            <Button>Back to Concepts</Button>
          </Link>
        ) : null}

      <StyledRow>

        <div style={{ padding: '10px' }}>
          <Typography.Title style={{ padding: '20px' }}>
            Reading Material
          </Typography.Title>
          {readingMaterials && (
            <Row>
              {readingMaterials.map((key, idx) => (
                <Link to={`/reading/${key.id}`}>
                  <SimpleCard
                    style={{ width: '200px', marginRight: '20px' }}
                    type="Reading Material"
                    title={`Material ${idx + 1}`}
                    progress={key.read === false ? 0 : 1}
                  />
                </Link>
              ))}
            </Row>
          )}
        </div>
      </StyledRow>
      <StyledRow>
        <Typography.Title style={{ padding: '20px', marginBottom: '0px' }}>
          Practice Games
        </Typography.Title>
        {games ? (
          games.length > 0 ? (
            <div>
              <ConceptCardSection
                type="Game"
                topicNo={props.topicNo}
                concepts={games}
              />
            </div>
          ) : (
            <Typography.Title style={{ padding: '20px', marginBottom: '0px' }}>
              WILL BE ADDED SOON!!
            </Typography.Title>
          )
        ) : (
          <NotFoundPage />
        )}
      </StyledRow>
      <StyledRow marginBottom="40px">
        <Typography.Title style={{ padding: '20px', marginBottom: '0px' }}>
          Graded Games
        </Typography.Title>
        {games ? (
          games.length > 0 ? (
            <Row>
              {games.map((key, idx) => (
                <Link to={`/graded-${key.link.substring(1)}${key.id}/1`}>
                  <SimpleCard
                    style={{ width: '200px', marginRight: '20px' }}
                    type="Graded Game"
                    title={key.name}
                    // graded_done={graded_done}
                    progress={key.graded_done ? key.graded_score : 0}
                  />
                </Link>
              ))}
            </Row>
          ) : (
            <Typography.Title style={{ padding: '20px', marginBottom: '0px' }}>
              WILL BE ADDED SOON!!
            </Typography.Title>
          )
        ) : (
          <NotFoundPage />
        )}
      </StyledRow>
    </div >
  );
}

ConceptDescriptionPage.propTypes = {
  getGames: PropTypes.func,
  conceptDescriptionPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  conceptDescriptionPage: makeSelectConceptDescriptionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGames: payload => dispatch(getGamesStart(payload)),
    getReadingMaterials: payload => dispatch(getReadingMaterialStart(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConceptDescriptionPage);
