/**
 *
 * QuesType1
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core/styles';
import makeSelectQuesType1 from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '80px',
    paddingLeft: '18px',
    paddingRight: '18px',
    paddingBottom: '80px',
  },
  paper: {
    background: '#272c48',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#FFFFFF',
  },
}));
export function QuesType1() {
  useInjectReducer({ key: 'quesType1', reducer });
  useInjectSaga({ key: 'quesType1', saga });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>QuesType1</title>
        <meta name="description" content="Description of QuesType1" />
      </Helmet>
      <Grid container>
        <Grid item xs={4}>
          <h1>Write node id corresponding to each expression</h1>
          <TextField
            fullWidth="100"
            type="text"
            defaultValue="((~(a=>(b<=>c)))&((b<=>c)|c))"
            variant="outlined"
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={8}>
          ...
        </Grid>
      </Grid>
    </div>
  );
}

QuesType1.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  quesType1: makeSelectQuesType1(),
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
)(QuesType1);
