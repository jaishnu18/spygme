/**
 *
 * ConceptDescriptionPage
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
import makeSelectConceptDescriptionPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ConceptDescriptionPage() {
  useInjectReducer({ key: 'conceptDescriptionPage', reducer });
  useInjectSaga({ key: 'conceptDescriptionPage', saga });

  return (
    <div>
      <Helmet>
        <title>ConceptDescriptionPage</title>
        <meta
          name="description"
          content="Description of ConceptDescriptionPage"
        />
      </Helmet>
    </div>
  );
}

ConceptDescriptionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  conceptDescriptionPage: makeSelectConceptDescriptionPage(),
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
)(ConceptDescriptionPage);
