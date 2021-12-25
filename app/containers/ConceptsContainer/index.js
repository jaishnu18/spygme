/* eslint-disable radix */
/**
 *
 * ConceptsContainer
 *
 */

import React, { memo, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ConceptCardSection from 'components/ConceptCardSection';

import NotFoundPage from 'containers/NotFoundPage';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core/styles';
import makeSelectConceptsContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getConceptsStart, getTopicStart } from './actions';

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

export function ConceptsContainer(props) {
  useInjectReducer({ key: 'conceptsContainer', reducer });
  useInjectSaga({ key: 'conceptsContainer', saga });

  const { topicNo } = props;

  useEffect(() => {
    props.getTopicData({ topicId: parseInt(topicNo) });
    props.getConcepts({ topicId: parseInt(topicNo) });
  }, []);

  const { concepts } = props.conceptsContainer;
  const { topicData } = props.conceptsContainer;

  console.log(topicData);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>ConceptsContainer</title>
        <meta name="description" content="Description of ConceptsContainer" />
      </Helmet>
      {topicData && concepts ? (
        <div>
          <Typography className={classes.paper} variant="h2" gutterBottom>
            <b>{topicData.name}</b>
          </Typography>
          <ConceptCardSection topicNo={props.topicNo} concepts={concepts} />
        </div>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
}

ConceptsContainer.propTypes = {
  getTopicData: PropTypes.func,
  getConcepts: PropTypes.func,
  topicNo: PropTypes.string,
  conceptsContainer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  conceptsContainer: makeSelectConceptsContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTopicData: payload => dispatch(getTopicStart(payload)),
    getConcepts: payload => dispatch(getConceptsStart(payload)),
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
