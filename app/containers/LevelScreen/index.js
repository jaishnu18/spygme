/**
 *
 * LevelScreen
 *
 */

import React, { memo } from 'react';
// import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Rate } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SolidButton from 'components/atoms/SolidButton';

import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Button } from 'antd';
import makeSelectLevelScreen from './selectors';
import reducer from './reducer';
import saga from './saga';

const StarDiv = styled.div`
  .ant-rate {
    font-size: 120px !important;
  }
  .ant-btn {
    font-size: 120px !important;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#272c48',
    paddingTop: '80px',
    paddingLeft: '18px',
    paddingRight: '18px',
    paddingBottom: '80px',
  },
  paper: {
    background: '#272c48',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#FFFFFF',
  },
}));
export function LevelScreen(props) {
  useInjectReducer({ key: 'levelScreen', reducer });
  useInjectSaga({ key: 'levelScreen', saga });

  const { conceptNo } = props.match.params;

  const classes = useStyles();
  // const [value] = React.useState(2);
  return (
    <div className={classes.root}>
      <Helmet>
        <title>LevelScreen</title>
        <meta name="description" content="Description of LevelScreen" />
      </Helmet>
      <Typography className={classes.paper} variant="h1" gutterBottom>
        <b>Level 1</b>
      </Typography>
      {/* <----------------------------this is the rating component-------------------------------------> */}
      <StarDiv>
        <Rate disabled defaultValue={1} />
      </StarDiv>
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        {' '}
        <Link to={`/topic1/concepts/${conceptNo}/RPG`}>
          {' '}
          <SolidButton
            borderradius="0"
            width="30%"
            size="20px"
            type="primary"
            danger
          >
            Start the game
          </SolidButton>
        </Link>
      </div>
    </div>
  );
}

LevelScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  levelScreen: makeSelectLevelScreen(),
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
)(LevelScreen);
