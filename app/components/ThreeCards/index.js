/**
 *
 * ThreeCards
 *
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RecipeReviewCard from 'components/Card';

import PropLogic from 'images/propLogic.png';
import APS from 'images/aps.png';
import CSP from 'images/csp.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#272c48',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

function ThreeCards(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Link to="/topic1/concepts">
            <div>
              <RecipeReviewCard
                heading="Propositional Logic"
                photo={PropLogic}
              />
            </div>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <RecipeReviewCard
            heading="Constraint satisfaction problems"
            photo={APS}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RecipeReviewCard heading="Automated problem solving" photo={CSP} />
        </Grid>
      </Grid>
    </div>
  );
}

ThreeCards.propTypes = {};

export default memo(ThreeCards);
