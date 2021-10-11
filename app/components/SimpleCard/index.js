/**
 *
 * SimpleCard
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import ProgressBar from 'components/LinearBar';
// import styled from 'styled-components';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '0 2px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
});

function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Concept : {props.number}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull}
          {props.title} {bull}
        </Typography>

        <ProgressBar />
        <Typography variant="body2" component="p">
          you have completed 50%
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Play More</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
};

export default memo(SimpleCard);
