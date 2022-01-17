/**
 *
 * ConceptMaterialPage
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
import makeSelectConceptMaterialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ConceptMaterialComponent from 'components/ConceptMaterialComponent';

import { getGamesStart, getReadingMaterialStart } from './actions';

export function ConceptMaterialPage(props) {
  useInjectReducer({ key: 'conceptMaterialPage', reducer });
  useInjectSaga({ key: 'conceptMaterialPage', saga });

  const { conceptId } = props;
  const { topicId } = props;
  console.log(topicId);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getGames({ conceptId });
    props.getReadingMaterials({ conceptId });
  }, []);

  const { games } = props.conceptMaterialPage;
  const { readingMaterials } = props.conceptMaterialPage;

  return (
    <div>
      <Helmet>
        <title>ConceptMaterialPage</title>
        <meta name="description" content="Description of ConceptMaterialPage" />
      </Helmet>
      <ConceptMaterialComponent readingMaterials={readingMaterials} games={games} parentConcept={conceptId} parentTopic={topicId} />
    </div>
  );
}

ConceptMaterialPage.propTypes = {
  conceptDescriptionPage: PropTypes.object,
  getGames: PropTypes.func,
  getReadingMaterials: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  conceptMaterialPage: makeSelectConceptMaterialPage(),
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
)(ConceptMaterialPage);
