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
    height: 'calc(100vh - 64px)',
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

const topicDescription = [
  '',
  'Concepts of Propositional Logic',
  'Concepts of Constraints Satisfaction Problem',
  'Concepts of Automated Problem Solving',
];
export function ConceptsContainer(props) {
  useInjectReducer({ key: 'conceptsContainer', reducer });
  useInjectSaga({ key: 'conceptsContainer', saga });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>ConceptsContainer</title>
        <meta name="description" content="Description of ConceptsContainer" />
      </Helmet>
      <Typography className={classes.paper} variant="h2" gutterBottom>
        <b>{topicDescription[props.topicNo]}</b>
      </Typography>
      <ConceptCardSection topicNo={props.topicNo} />
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
