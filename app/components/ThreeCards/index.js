/**
 *
 * ThreeCards
 *
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'antd';
import Grid from '@material-ui/core/Grid';
import RecipeReviewCard from 'components/Card';

import PropLogic from 'images/propLogic.png';
import APS from 'images/aps.png';
import CSP from 'images/csp.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#272c48',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

function ThreeCards(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Row>
        {props.topics &&
          props.topics.map((key, index) => (
            <Col style={{ display: 'flex', justifyContent: 'center' }} span={8}>
              <Link
                to={{
                  pathname: `/topics/${index + 1}`,
                  state: { topicData: key },
                }}
              >
                <RecipeReviewCard heading={key.name} photo={PropLogic} />
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
}

ThreeCards.propTypes = {
  topics: PropTypes.array,
};

export default memo(ThreeCards);
