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
  console.log(typeof props.progress);

  const x = parseFloat(props.progress * 100);
  const y = Math.round(x);

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
          {props.type} : {props.number}
        </Typography>
        <Typography noWrap variant="h5" component="h2">
          {bull}
          {props.title}
        </Typography>

        <ProgressBar progress={props.progress} />
        <Typography variant="body2" component="p">
          you have completed {y}%
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          {props.type === 'Concept' || props.type === 'Topic' || props.type === 'Reading Material' ? 'Learn More' : (props.type === 'Progress' ? 'Read or Play new items to increase progress' : (props.type === 'Proficiency' ? 'Perform better at graded tests to improve proficiency' : 'Play More'))}
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default memo(SimpleCard);
