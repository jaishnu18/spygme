/**
 *
 * TopicContainer
 *
 */

import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ThreeCards from 'components/ThreeCards';

import { makeStyles } from '@material-ui/core/styles';
import Typewriter from 'typewriter-effect';
import makeSelectTopicContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

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
    color: '#FFFFFF',
  },
}));
export function TopicContainer() {
  useInjectReducer({ key: 'topicContainer', reducer });
  useInjectSaga({ key: 'topicContainer', saga });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        {/* // make components here */}
        <title>TopicContainer</title>
        <meta name="description" content="Description of TopicContainer" />
      </Helmet>
      <Typography className={classes.paper} variant="h2" gutterBottom>
        <div>
          <b>
            <Typewriter
              onInit={typewriter => {
                typewriter

                  .typeString('Select your prefered Topic')

                  // .pauseFor(1000)
                  // .deleteAll()
                  // .typeString('Select your prefered Topic')
                  .start();
              }}
            />
          </b>
        </div>
      </Typography>

      {/*  */}
      {/*  */}
      <ThreeCards />
    </div>
  );
}

TopicContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  topicContainer: makeSelectTopicContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TopicContainer);
