/**
 *
 * ConceptCardSection
 *
 */

import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SimpleCard from 'components/SimpleCard';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
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
  },
}));

function ConceptCardSection() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <Link to="/topic1/concepts/1">
            <div>
              <SimpleCard number="1" />
            </div>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3}>
          <SimpleCard number="2" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SimpleCard number="3" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SimpleCard number="4" />
        </Grid>{' '}
        <Grid item xs={12} sm={3}>
          <SimpleCard number="5" />
        </Grid>
      </Grid>
    </div>
  );
}

ConceptCardSection.propTypes = {};

export default memo(ConceptCardSection);
