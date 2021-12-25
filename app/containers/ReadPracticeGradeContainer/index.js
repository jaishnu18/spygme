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

import history from 'utils/history';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import T1_C1_1 from '../../images/ReadingMaterial/Topic1/CONCEPT1_MATERIAL1.png';
import T1_C1_2 from '../../images/ReadingMaterial/Topic1/CONCEPT1_MATERIAL2.png';
import T1_C1_3 from '../../images/ReadingMaterial/Topic1/CONCEPT1_MATERIAL3.png';
import T1_C2_1 from '../../images/ReadingMaterial/Topic1/CONCEPT2_MATERIAL1.png';
import T1_C2_2 from '../../images/ReadingMaterial/Topic1/CONCEPT2_MATERIAL2.png';
import T1_C3_1 from '../../images/ReadingMaterial/Topic1/CONCEPT3_MATERIAL1.png';
import T1_C3_2 from '../../images/ReadingMaterial/Topic1/CONCEPT3_MATERIAL2.png';
import T1_C4_1 from '../../images/ReadingMaterial/Topic1/CONCEPT4_MATERIAL1.png';
import T1_C4_2 from '../../images/ReadingMaterial/Topic1/CONCEPT4_MATERIAL2.png';
import T1_C4_3 from '../../images/ReadingMaterial/Topic1/CONCEPT4_MATERIAL3.png';
import T1_C4_4 from '../../images/ReadingMaterial/Topic1/CONCEPT4_MATERIAL4.png';
import T1_C5_1 from '../../images/ReadingMaterial/Topic1/CONCEPT5_MATERIAL1.png';
import T1_C5_2 from '../../images/ReadingMaterial/Topic1/CONCEPT5_MATERIAL2.png';
import T2_C1_1 from '../../images/ReadingMaterial/Topic2/CONCEPT1_MATERIAL1.png';
import T2_C1_2 from '../../images/ReadingMaterial/Topic2/CONCEPT1_MATERIAL2.png';
import T2_C2_1 from '../../images/ReadingMaterial/Topic2/CONCEPT2_MATERIAL1.png';
import T2_C2_2 from '../../images/ReadingMaterial/Topic2/CONCEPT2_MATERIAL2.png';
import T2_C2_3 from '../../images/ReadingMaterial/Topic2/CONCEPT2_MATERIAL3.png';
import T2_C3_1 from '../../images/ReadingMaterial/Topic2/CONCEPT3_MATERIAL1.png';
import T2_C3_2 from '../../images/ReadingMaterial/Topic2/CONCEPT3_MATERIAL2.png';
import T2_C3_3 from '../../images/ReadingMaterial/Topic2/CONCEPT3_MATERIAL3.png';
import T2_C3_4 from '../../images/ReadingMaterial/Topic2/CONCEPT3_MATERIAL4.png';
import T2_C4_1 from '../../images/ReadingMaterial/Topic2/CONCEPT4_MATERIAL1.png';

import { concepts } from '../../components/ConceptCardSection/index';
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
    minHeight: 'calc(100vh - 70px)',
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

export function ReadPracticeGradeContainer(props) {
  useInjectReducer({ key: 'readPracticeGradeContainer', reducer });
  useInjectSaga({ key: 'readPracticeGradeContainer', saga });

  const T = props.topicNo;
  const C = props.conceptNo;

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
          <div>{/* <b>{array[T][C].name}</b> */}</div>
        </Typography>
      </div>
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
