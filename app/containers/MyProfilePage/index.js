/**
 *
 * MyProfilePage
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
import CustomProfile from 'components/CustomProfile';
import makeSelectMyProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getProfileStart,
  updatePasswordStart,
  updateProfileStart,
} from './actions';

export function MyProfilePage(props) {
  useInjectReducer({ key: 'myProfilePage', reducer });
  useInjectSaga({ key: 'myProfilePage', saga });

  useEffect(() => {
    props.fetchProfile();
  }, []);

  const { profile } = props.myProfilePage;
  console.log(profile);

  const handleEditProfile = values => {
    props.editProfile(values);
  };

  const handleChangePassword = values => {
    props.editPassword(values);
  };

  return (
    <div>
      <Helmet>
        <title>MyProfilePage</title>
        <meta name="description" content="Description of MyProfilePage" />
      </Helmet>
      <div style={{ padding: '40px' }}>
        <CustomProfile
          profile={profile}
          handleEditProfile={handleEditProfile}
          handleChangePassword={handleChangePassword}
          // errorMessages={props.state.loadingError}
        />
      </div>
    </div>
  );
}

MyProfilePage.propTypes = {
  fetchProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  myProfilePage: makeSelectMyProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchProfile: () => dispatch(getProfileStart()),
    editProfile: payload => dispatch(updateProfileStart(payload)),
    editPassword: payload => dispatch(updatePasswordStart(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyProfilePage);
