/**
 *
 * CheckMailPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import Divider from 'antd/lib/divider';
import saga from './saga';
import reducer from './reducer';
import makeSelectCheckMailPage from './selectors';

const { Title } = Typography;

export function CheckMailPage(props) {
  useInjectReducer({ key: 'checkMailPage', reducer });
  useInjectSaga({ key: 'checkMailPage', saga });

  return (
    <div>
      <Helmet>
        <title>CheckMailPage</title>
        <meta name="description" content="Description of CheckMailPage" />
      </Helmet>
      <Row style={{ marginTop: '20px', padding: '20px' }}>
        <Col>
          <Title level={2} style={{ textAlign: 'center', margin: '10px 0' }}>
            Email Has been sent to <br />
          </Title>
          <Title level={3} style={{ textAlign: 'center', margin: '10px 0' }}>
            {props.email} <br />
          </Title>
          <Title style={{ textAlign: 'center', margin: '10px 0' }} level={2}>
            Please verify your acount from there.
          </Title>
          <Divider />
        </Col>
      </Row>
    </div>
  );
}

CheckMailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  checkMailPage: makeSelectCheckMailPage(),
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
)(CheckMailPage);
