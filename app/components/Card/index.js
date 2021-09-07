/* eslint-disable no-redeclare */
/**
 *
 * Card
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 40,
    maxWidth: 345,
    textAlign: 'center',
  },
  media: {
    height: 300,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Cards(props) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader title={props.heading} className={classes.root.textAlign} />
        <CardMedia className={classes.media} image={props.photo} />
      </Card>
    </div>
  );
}

Cards.propTypes = {
  heading: PropTypes.string,
  photo: PropTypes.string,
};

export default memo(Cards);
