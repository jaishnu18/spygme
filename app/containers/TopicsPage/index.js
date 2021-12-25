/**
 *
 * TopicsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Typewriter from 'typewriter-effect';
import ThreeCards from 'components/ThreeCards';
import makeSelectTopicsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getTopicsStart } from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#272c48',
    minHeight: 'calc(100vh - 64px)',
    paddingTop: '40px',
    paddingLeft: '18px',
    paddingRight: '18px',
  },
  paper: {
    background: '#272c48',
    padding: theme.spacing(2),
    textAlign: 'center',
    minHeight: 'calc(100vh - 64px)',
    color: '#FFFFFF',
  },
}));

export function TopicsPage(props) {
  useInjectReducer({ key: 'topicsPage', reducer });
  useInjectSaga({ key: 'topicsPage', saga });

  useEffect(() => {
    props.getAllTopics();
  }, []);

  const { topics } = props.topicsPage;
  const classes = useStyles();
  return (
    <div>
      <Helmet>
        <title>TopicsPage</title>
        <meta name="description" content="Description of TopicsPage" />
      </Helmet>

      <Typography className={classes.paper} variant="h2" gutterBottom>
        <div>
          <b>
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString('SELECT YOUR PREFERRED TOPIC!')
                  // .pauseFor(1000)
                  // .deleteAll()
                  // .typeString('Select your prefered Topic')
                  .start();
              }}
            />
          </b>
        </div>
        <div style={{ marginTop: '4%', display: 'flex', alignItems: 'center' }}>
          <ThreeCards topics={topics} />
        </div>
      </Typography>
    </div>
  );
}

TopicsPage.propTypes = {
  topicsPage: PropTypes.object.isRequired,
  getAllTopics: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  topicsPage: makeSelectTopicsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllTopics: () => dispatch(getTopicsStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TopicsPage);
