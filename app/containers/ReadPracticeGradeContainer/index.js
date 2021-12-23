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

const array = [
  [],
  [
    {},
    {
      name: 'Proposition & Boolean Variables',
      links: [T1_C1_1, T1_C1_2, T1_C1_3],
      game: false,
      gameLinks: [],
    },
    {
      name: 'Boolean Operators',
      links: [T1_C2_1, T1_C2_2],
      game: false,
      gameLinks: [],
    },
    {
      name: 'Logical Expressions & Syntax',
      links: [T1_C3_1, T1_C3_2],
      game: false,
      gameLinks: [],
    },
    {
      name: 'Semantics',
      links: [T1_C4_1, T1_C4_2, T1_C4_3, T1_C4_4],
      game: false,
      gameLinks: [],
    },
    {
      name: 'Evaluating Expression',
      links: [T1_C5_1, T1_C5_2],
      game: true,
      gameLinks: [
        ['/treegame/1', 'Tree Game'],
        ['/match-expression/1', 'Match Expression'],
        ['/write-expression/1', 'Write Expression'],
      ],
    },
  ],
  [
    {},
    {
      name: 'Constraints and Formulation',
      links: [T2_C1_1, T2_C1_2],
      game: true,
      gameLinks: [
        ['/find-nodes/1', 'Find Crossword Nodes'],
        ['/draw-crossword-graph/1', 'Draw Crossword Graph'],
      ],
    },
    {
      name: 'Constraints Propogation',
      links: [T2_C2_1, T2_C2_2, T2_C2_3],
      game: true,
      gameLinks: [
        ['/node-consistency/1', 'Node Consistency'],
        ['/arc-consistency/1', 'Arc Consistency'],
      ],
    },
    {
      name: 'Heuristics',
      links: [T2_C3_1, T2_C3_2, T2_C3_3, T2_C3_4],
      game: false,
      gameLinks: [],
    },
    {
      name: 'Backtracking',
      links: [T2_C4_1],
      game: false,
      gameLinks: [],
    },
  ],
];

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
          <div>
            <b>{array[T][C].name}</b>
          </div>
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  Reading
                </Typography>
                {array[T][C].links.map((key, index) => (
                  <div>
                    <Typography variant="h5" component="div">
                      {<Image src={key} />}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  Practice games
                </Typography>
                {array[T][C].game ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {array[T][C].gameLinks.map(key => (
                      <div style={{ display: 'flex' }}>
                        {bull}
                        <Link to={key[0]}>
                          <h3
                            style={{
                              color: 'blue',
                              fontWeight: '700',
                            }}
                          >
                            {key[1]}
                          </h3>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography
                    variant="h5"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    COMING SOON
                  </Typography>
                )}
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
                  variant="h4"
                  component="div"
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  Graded games
                </Typography>
                {array[T][C].game ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {array[T][C].gameLinks.map(key => (
                      <div style={{ display: 'flex' }}>
                        {bull}
                        <Link to={key[0]}>
                          <h3
                            style={{
                              color: 'blue',
                              fontWeight: '700',
                            }}
                          >
                            {key[1]}
                          </h3>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography
                    variant="h5"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    COMING SOON
                  </Typography>
                )}
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Grid>
        </Grid>{' '}
      </div>

      {/* <Box
        sx={{
          width: ' 100%',
          height: 300,
          bgcolor: '#272c48',
        }}
      /> */}
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
