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
import { Button } from 'antd';
import { CloseOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import { Cross } from 'react-icons/fa';
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
  bordertext: {
    borderStyle: 'groove',
    width: '40%',
    padding: '10px',
    margin: '10px',
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
        <Grid item xs={6}>
          <h1>Write node id corresponding to each expression</h1>
          <p className={classes.bordertext}>
            <h3>Space for equation this is sample</h3>
          </p>{' '}
          <Grid container>
            <Grid item xs={2}>
              this is node id
            </Grid>{' '}
            <Grid item xs={2}>
              {/* cross */}
              <CloseOutlined />
            </Grid>{' '}
            <Grid item xs={2}>
              this is correct id
            </Grid>
          </Grid>{' '}
          <p className={classes.bordertext}>
            <h3>Space for node id</h3>
          </p>
          <div>
            <Grid container>
              <Grid item xs={3}>
                this is node id
              </Grid>{' '}
              <Grid item xs={3}>
                {/* cross */}
                <CheckSquareOutlined />
              </Grid>{' '}
            </Grid>{' '}
            <Button type="primary">Check</Button>
            {/* <h3>
              {' '}
              Lets go for a <Cross />?{' '}
            </h3> */}
          </div>
          {/* <div className={classes.bordertext}>
            <TextField
              type="text"
              defaultValue="((~(a=>(b<=>c)))&((b<=>c)|c))"
              inputProps={{ readOnly: true }}
            />{' '}
          </div> */}
        </Grid>
        <Grid item xs={6}>
          <h1>this is a sample column space for graph</h1>
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
