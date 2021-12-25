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

function ConceptCardSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.concepts.length > 0 ? (
        <Grid container spacing={4}>
          {props.concepts.map((obj, index) => (
            <Grid key={index + 1} item xs={12} sm={3}>
              <Link to={`/topics/${props.topicNo}/${obj.id}`}>
                <div>
                  <SimpleCard number={index + 1} title={obj.name} />
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

ConceptCardSection.propTypes = {
  concepts: PropTypes.array,
  topicNo: PropTypes.string,
};

export default memo(ConceptCardSection);
