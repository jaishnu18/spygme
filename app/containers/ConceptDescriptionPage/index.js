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

  useEffect(() => {
    props.getGames({ conceptId });
    props.getReadingMaterials({ conceptId });
  }, []);

  const { games } = props.conceptDescriptionPage;
  const { readingMaterials } = props.conceptDescriptionPage;
  console.log(props);

  return (
    <div>
      <Helmet>
        <title>ConceptDescriptionPage</title>
        <meta
          name="description"
          content="Description of ConceptDescriptionPage"
        />
      </Helmet>
      <Link to={`/topics/1`}>
        <Button>Back to Concepts</Button>
      </Link>

      <StyledRow>

        <div style={{ padding: '10px' }}>
          <Typography.Title style={{ padding: '20px' }}>
            Reading Material
          </Typography.Title>
          {readingMaterials && (
            <Row>
              {readingMaterials.map((key, idx) => (
                <Link to={`/reading/${key.id}`}>
                  <Card
                    style={{ width: '200px', marginRight: '20px' }}
                    title={`Material ${idx + 1}`}
                  >
                    READ
                  </Card>
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
