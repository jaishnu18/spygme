/* eslint-disable react/no-array-index-key */
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
import PropTypes from 'prop-types';
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

const concepts = [
  {
    title: 'Proposition & Boolean Variables',
    link: '/topic1/concepts/1',
    id: 1,
  },
  {
    title: 'Boolean Operators',
    link: '/topic1/concepts/2',
    id: 2,
  },
  {
    title: 'Logical Expressions & Syntax',
    link: '/topic1/concepts/3',
    id: 3,
  },
  {
    title: 'Semantics',
    link: '/topic1/concepts/4',
    id: 4,
  },
  {
    title: 'Evaluating Expression',
    link: '/topic1/concepts/5',
    id: 5,
  },
];

function ConceptCardSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {concepts.map((obj, index) => (
          <Grid key={index + 1} item xs={12} sm={3}>
            <Link to={obj.link}>
              <div>
                <SimpleCard number={obj.id} title={obj.title} />
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

ConceptCardSection.propTypes = {};

export default memo(ConceptCardSection);
