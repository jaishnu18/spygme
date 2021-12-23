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

export const concepts = [
  [],
  [
    {
      title: 'Proposition & Boolean Variables',
      link: '/topics/1/1',
      id: 1,
    },
    {
      title: 'Boolean Operators',
      link: '/topics/1/2',
      id: 2,
    },
    {
      title: 'Logical Expressions & Syntax',
      link: '/topics/1/3',
      id: 3,
    },
    {
      title: 'Semantics',
      link: '/topics/1/4',
      id: 4,
    },
    {
      title: 'Evaluating Expression',
      link: '/topics/1/5',
      id: 5,
    },
  ],
  [
    {
      title: 'Constraints and Formulation',
      link: '/topics/2/1',
      id: 1,
    },
    {
      title: 'Constraints Propagation',
      link: '/topics/2/2',
      id: 2,
    },
    {
      title: 'Heuristics',
      link: '/topics/2/3',
      id: 3,
    },
    {
      title: 'BackTracking',
      link: '/topics/2/4',
      id: 3,
    },
  ],
  [],
];

function ConceptCardSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {concepts[props.topicNo].length > 0 ? (
        <Grid container spacing={4}>
          {concepts[props.topicNo].map((obj, index) => (
            <Grid key={index + 1} item xs={12} sm={3}>
              <Link to={obj.link}>
                <div>
                  <SimpleCard number={obj.id} title={obj.title} />
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ color: 'white' }}>WILL BE ADDDED SOON</h2>
        </div>
      )}
    </div>
  );
}

ConceptCardSection.propTypes = {};

export default memo(ConceptCardSection);
