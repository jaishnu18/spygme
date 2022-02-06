/**
 *
 * NavigationBar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router-dom';
import CustomButton from 'components/atoms/CustomButton';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import Affix from 'antd/lib/affix';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Tooltip from 'antd/lib/tooltip';
import Modal from 'antd/lib/modal';

function NavigationBar(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);
  const [testSubmitted, setIsTestSubmiited] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    props.submit();
    setIsTestSubmiited(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const exitModalshowModal = () => {
    setIsExitModalVisible(true);
  };

  const exitModalhandleOk = () => {
    setIsExitModalVisible(false);
    history.back();
  };

  const exitModalhandleCancel = () => {
    setIsExitModalVisible(false);
  };

  return (
    <Affix offsetTop={60}>
      <Row style={{ padding: '20px', backgroundColor: 'white' }}>
        {props.readingMaterial ? (
          <Col
            xs={{ span: 24 }}
            xl={{ span: 10 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <CustomButton onClick={props.backToMaterials}>
              <ArrowLeftOutlined />
              {props.prevPageText}
            </CustomButton>
            {props.read ? (
              <Tooltip title="Marked as read">
                <CheckCircleFilled
                  style={{ fontSize: '30px', color: 'green' }}
                />
              </Tooltip>
            ) : (
              <CustomButton onClick={props.markAsRead}>
                Mark as Read
              </CustomButton>
            )}
          </Col>
        ) : (
          props.prevPageLink && (
            <Col
              xs={{ span: 24 }}
              xl={{ span: 10 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Link to={props.prevPageLink}>
                <CustomButton onClick={() => { }}>
                  <ArrowLeftOutlined />
                  {props.prevPageText}
                </CustomButton>
              </Link>
            </Col>
          )
        )}

        {props.game ? (
          <Col xs={{ span: 24 }} xl={{ span: 4, offset: 6 }}>
            <CustomButton
              disabled={props.level === '1'}
              onClick={() => {
                window.location.href = props.prevLevelLink;
              }}
            >
              {'< Prev Level'}
            </CustomButton>
          </Col>
        ) : null}

        {props.game ? (
          <Col xs={{ span: 24 }} xl={{ span: 4 }}>
            <CustomButton
              disabled={props.level === props.maxLevel.toString()}
              onClick={() => {
                window.location.href = props.nextLevelLink;
              }}
            >
              {'Next level >'}
            </CustomButton>
          </Col>
        ) : null}

        {props.gradedGame && (
          <Row style={{ width: '100%' }}>
            <Col xs={{ span: 24 }} xl={{ span: 12 }}>
              <CustomButton
                disabled={props.currentLevel === 0}
                onClick={() => {
                  if (props.currentLevel !== 0) {
                    const D = new Date();
                    const T = props.timeStamps;
                    T[props.currentLevel].push(D);
                    props.setCurrentLevel(props.currentLevel - 1);
                    T[props.currentLevel - 1].push(D);
                    props.setTimeStamps(T);
                  }
                }}
              >
                Previous
              </CustomButton>
              <CustomButton
                disabled={props.currentLevel === props.maxLevel - 1}
                marginLeft="20px"
                onClick={() => {
                  if (props.currentLevel !== props.maxLevel - 1) {
                    const D = new Date();
                    const T = props.timeStamps;
                    T[props.currentLevel].push(D);
                    props.setCurrentLevel(props.currentLevel + 1);
                    T[props.currentLevel + 1].push(D);
                    props.setTimeStamps(T);
                  }
                }}
              >
                Next
              </CustomButton>
            </Col>
            <Col
              xs={{ span: 24 }}
              xl={{ span: 12 }}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                marginTop: '20px',
              }}
            >
              <CustomButton danger onClick={exitModalshowModal}>
                Exit Test
              </CustomButton>

              <Modal
                title="Exit Test"
                visible={isExitModalVisible}
                onOk={exitModalhandleOk}
                onCancel={exitModalhandleCancel}
              >
                <p>Are you sure you want to exit the Test?</p>
              </Modal>
              <CustomButton disabled={testSubmitted} onClick={showModal}>
                Submit
              </CustomButton>
              <Modal
                title="Submit Test"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Are you sure you want to submit the Test?</p>
              </Modal>
            </Col>
          </Row>
        )}
      </Row>
    </Affix>
  );
}

NavigationBar.propTypes = {
  currentLevel: PropTypes.number,
  timeStamps: PropTypes.array,
  maxLevel: PropTypes.number,
  setCurrentLevel: PropTypes.func,
  setTimeStamps: PropTypes.func,
  gradedGame: PropTypes.bool,
};

export default memo(NavigationBar);
