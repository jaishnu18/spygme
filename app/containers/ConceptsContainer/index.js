/**
 *
 * ConceptsContainer
 *
 */

import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ConceptCardSection from 'components/ConceptCardSection';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core/styles';
import makeSelectConceptsContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#272c48',
    paddingTop: '40px',
    paddingLeft: '18px',
    paddingRight: '18px',
  },
  paper: {
    background: '#272c48',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#FFFFFF',
  },
}));
export function ConceptsContainer(props) {
  useInjectReducer({ key: 'conceptsContainer', reducer });
  useInjectSaga({ key: 'conceptsContainer', saga });

  const { conceptNo } = props.match.params;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>ConceptsContainer</title>
        <meta name="description" content="Description of ConceptsContainer" />
      </Helmet>
      <Typography className={classes.paper} variant="h2" gutterBottom>
        <b>Concepts of Propositional Logic</b>
      </Typography>
      <ConceptCardSection conceptNo={conceptNo} />
      <div className={classes.root} />
    </div>
  );
}

ConceptsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  conceptsContainer: makeSelectConceptsContainer(),
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
)(ConceptsContainer);
