/**
 *
 * ThreeCards
 *
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RecipeReviewCard from 'components/Card';

import LearnImage from 'images/learn.png';
import PracticeImage from 'images/practice.png';
import ResultImage from 'images/result.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function ThreeCards(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Link to="/treegame">
            <div>
              <RecipeReviewCard heading="Learn" photo={LearnImage} />
            </div>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <RecipeReviewCard heading="Practice" photo={PracticeImage} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RecipeReviewCard heading="Result" photo={ResultImage} />
        </Grid>
      </Grid>
    </div>
  );
}

ThreeCards.propTypes = {};

export default memo(ThreeCards);
