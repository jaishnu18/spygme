/**
 *
 * ConceptMaterialPage
 *
 */

import React, { memo } from 'react';
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

export function ConceptMaterialPage() {
  useInjectReducer({ key: 'conceptMaterialPage', reducer });
  useInjectSaga({ key: 'conceptMaterialPage', saga });

  return (
    <div>
      <Helmet>
        <title>ConceptMaterialPage</title>
        <meta name="description" content="Description of ConceptMaterialPage" />
      </Helmet>
    </div>
  );
}

ConceptMaterialPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  conceptMaterialPage: makeSelectConceptMaterialPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
