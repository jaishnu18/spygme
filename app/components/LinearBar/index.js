/**
 *
 * LinearBar
 *
 */

import React, { memo } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#272c48',
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
function LinearBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <br />
      <BorderLinearProgress
        variant="determinate"
        value={props.progress * 100}
      />
    </div>
  );
}

LinearBar.propTypes = {};

export default memo(LinearBar);
