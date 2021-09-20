/**
 *
 * ReadPracticeGradeContainer
 *
 */

import React, { memo } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  Box,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Typewriter from 'typewriter-effect';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SolidButton from '../../components/atoms/SolidButton';
import makeSelectReadPracticeGradeContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#272c48',
    // margin: '40px',
    // paddingTop: '40px',
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
export function ReadPracticeGradeContainer() {
  useInjectReducer({ key: 'readPracticeGradeContainer', reducer });
  useInjectSaga({ key: 'readPracticeGradeContainer', saga });

  const classes = useStyles();
  return (
    <div>
      <Helmet>
        <title>ReadPracticeGradeContainer</title>
        <meta
          name="description"
          content="Description of ReadPracticeGradeContainer"
        />
      </Helmet>

      <Box
        sx={{
          width: ' 100%',
          height: 50,
          bgcolor: '#272c48',
        }}
      />
      <div className={classes.root}>
        {' '}
        <Typography className={classes.paper} variant="h2" gutterBottom>
          <div>
            <b>Evaluating Expression</b>
          </div>
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Reading
                </Typography>
                <Typography variant="h5" component="div">
                  {bull}Material 1
                </Typography>
                <Typography variant="h5" component="div">
                  {bull}Material 2
                </Typography>
                <Typography variant="h5" component="div">
                  {bull}Material 3
                </Typography>
                <Typography variant="h5" component="div">
                  {bull}Material 4
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Practice games
                </Typography>
                <Typography variant="h5" component="div">
                  <SolidButton
                    colorbg="#00008b"
                    width="60%"
                    height="60%"
                    margintop="5px"
                    marginbottom="5px"
                  >
                    Expression evaluation
                  </SolidButton>
                  <SolidButton
                    colorbg="#4169e1"
                    width="60%"
                    height="60%"
                    margintop="5px"
                    marginbottom="5px"
                  >
                    Match expression with nodes
                  </SolidButton>
                  <SolidButton
                    colorbg="#ff0000"
                    width="60%"
                    height="60%"
                    margintop="5px"
                    marginbottom="5px"
                  >
                    Game X
                  </SolidButton>
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Graded games
                </Typography>
                <Typography variant="h5" component="div">
                  <SolidButton
                    colorbg="#00008b"
                    width="60%"
                    height="60%"
                    margintop="5px"
                    marginbottom="5px"
                  >
                    Expression evaluation
                  </SolidButton>
                  <SolidButton
                    colorbg="#4169e1"
                    width="60%"
                    height="60%"
                    margintop="5px"
                    marginbottom="5px"
                  >
                    Match expression with nodes
                  </SolidButton>
                  <SolidButton
                    colorbg="#ff0000"
                    width="60%"
                    height="60%"
                    margintop="5px"
                    marginbottom="5px"
                  >
                    Game X
                  </SolidButton>
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Grid>
        </Grid>{' '}
      </div>

      <Box
        sx={{
          width: ' 100%',
          height: 300,
          bgcolor: '#272c48',
        }}
      />
    </div>
  );
}

ReadPracticeGradeContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  readPracticeGradeContainer: makeSelectReadPracticeGradeContainer(),
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
)(ReadPracticeGradeContainer);
