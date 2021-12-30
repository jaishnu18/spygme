/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import history from 'utils/history';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Typography } from '@material-ui/core';
//
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import GitHub from '@material-ui/icons/GitHub';
import { orange } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // appbar color
    background: '#295474',
  },
  text: {
    color: '#FFFFFF',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,

    // appbar color
    background: '#295474',
    color: '#FFFFFF',
  },
  backgroundColor: {
    backgroundColor: '#2E3B55',
  },
}));

function Header(props) {
  const classes = useStyles();
  return (
    <div>
      <AppBar
        position="static"
        color={classes.backgroundColor}
        className={classes.root}
      >
        <Toolbar>
          <GitHub style={{ color: orange[500] }} />
          <Box paddingX={2} />
          <Typography variant="h6" className={classes.title}>
            AI For School
          </Typography>
          <Button className={classes.text} color="inherit">
            Home
          </Button>
          <Button className={classes.text} color="inherit">
            DashBoard
          </Button>
          <Button
            onClick={() => {
              history.push('/my/profile');
            }}
            className={classes.text}
            color="inherit"
          >
            Profile
          </Button>
          <Button className={classes.text} color="inherit">
            About us
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem('_UFT_');
              history.push('/auth/login');
            }}
            className={classes.text}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {};

export default memo(Header);
