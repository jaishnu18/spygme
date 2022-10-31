/**
 *
 * MyProfilePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MyProfileComponent from 'components/MyProfileComponent';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMyProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getProfileStart,
  updatePasswordStart,
  updateProfileStart,
} from './actions';
import api from 'api';

export function MyProfilePage(props) {
  useInjectReducer({ key: 'myProfilePage', reducer });
  useInjectSaga({ key: 'myProfilePage', saga });

  const [schoolList, setSchoolList] = useState(undefined);

  useEffect(() => {
    props.fetchProfile();
  }, []);

  const { profile } = props.myProfilePage;
  console.log(profile);

  const handleEditProfile = values => {
    // console.log(values);
    props.editProfile(values);
  };

  const handleChangePassword = values => {
    props.editPassword(values);
  };
  async function getSchoolList() {
    const R = await api.get(
      '/auth/get-schools',
    );
    setSchoolList(R.data.data);
  }
  return (
    <div>
      <Helmet>
        <title>MyProfilePage</title>
        <meta name="description" content="Description of MyProfilePage" />
      </Helmet>
      <div style={{ padding: '40px' }}>
        <MyProfileComponent
          profile={profile}
          handleEditProfile={handleEditProfile}
          handleChangePassword={handleChangePassword}
          getSchoolList={getSchoolList}
          schoolList={schoolList}
        // errorMessages={props.state.loadingError}
        />
      </div>
    </div>
  );
}

MyProfilePage.propTypes = {
  myProfilePage: PropTypes.object,
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
