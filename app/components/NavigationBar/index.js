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
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationOutlined';
import Affix from 'antd/lib/affix';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Tooltip from 'antd/lib/tooltip';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Button from 'antd/lib/button';
import api from 'api';
import DiscussNewThreadComponent from '../DISCUSS/DiscussNewThreadComponent';
import { evaluateAnswer } from '../../containers/GAMES/PropositionalLogic/ExpressionEvaluationGame/saga';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import message from 'antd/lib/message';

const errors = [
  'Question was wrong',
  'Provided solution was wrong',
  'Some part of question was not visible',
];

function NavigationBar(props) {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };
  async function newThreadPost(values) {
    values.tags = new Array(1).fill(values.tags);
    values.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const response = await api.post(
      '/discuss/post-thread',
      values,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
        withCredentials: true,
      });
    setNewThreadVisible(false);
    message.success("Thread posted");
  };
  useState(async () => {
    const R = await api.post(
      '/discuss/get-concepts',
      { conceptId: parseInt(window.location.pathname.split('/')[3]) },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
        withCredentials: true,
      });
    setConceptsArray(R.data.data);
  }, []);
  // console.log(window.location.pathname.split('/')[3]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);
  const [testSubmitted, setIsTestSubmiited] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [newThreadVisible, setNewThreadVisible] = useState(false);
  const [conceptsArray, setConceptsArray] = useState(undefined);

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
            <Button
              onClick={props.backToMaterials}
              shape="circle"
              type="primary"
              icon={<ArrowLeftOutlined />} />
            {props.read ? (
              <Tooltip title="Marked as read">
                <CheckCircleFilled
                  style={{ fontSize: '30px', color: 'green' }}
                />
              </Tooltip>
            ) : (
              <Button onClick={props.markAsRead} shape="round" type="primary">
                Mark as Read
              </Button>
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
                <Button onClick={() => { }} shape="circle" type="primary" icon={<ArrowLeftOutlined />}>
                  {/* {props.prevPageText} */}
                </Button>
              </Link>
            </Col>
          )
        )}

        {(props.game || props.readingMaterial) && (
          <Col xs={{ span: 24 }} xl={{ span: 1 }}>
            <Button
              disabled={
                props.game ? props.evaluatedAnswer === undefined : false
              }
              shape="circle"
              type="primary"
              onClick={() => {
                setNewThreadVisible(true);
              }}
              icon={<MessageOutlined />}
            />
          </Col>
        )}
        <Modal
          title="New Thread"
          visible={newThreadVisible}
          onCancel={() => {
            setNewThreadVisible(false);
          }}
          onOk={() => {
            setNewThreadVisible(false);
          }}
          footer={null}
        >
          {conceptsArray && (
            <DiscussNewThreadComponent
              submit={newThreadPost}
              concepts={conceptsArray}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              defaultTitle={"Doubt in " + (props.readingMaterial ? "reading material " : "practice game ") + window.location.href} />
          )}
        </Modal>

        {props.game ? (
          <Col xs={{ span: 24 }} xl={{ span: 1 }}>
            <Button
              type="danger"
              disabled={props.evaluatedAnswer === undefined}
              onClick={() => {
                setReportModalVisible(true);
              }}
              shape="circle"
              icon={<ExclamationCircleOutlined />}
            />
          </Col>
        ) : null}
        <Modal
          title="Report Error !!"
          visible={reportModalVisible}
          onCancel={() => {
            setReportModalVisible(false);
          }}
          onOk={() => {
            setReportModalVisible(false);
          }}
          footer={null}
        >
          <Form
            name="feedback"
            onFinish={values => {
              const response = {};
              response.error = JSON.stringify(values);
              props.saveFeedback(response);
              setReportModalVisible(false);
            }}
          >
            {errors.map((key, idx) => (
              <Form.Item name={key} valuePropName="checked">
                <Checkbox checked={false}>{key}</Checkbox>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={() => { }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {props.game ? (
          <Col xs={{ span: 24 }} xl={{ span: 1 }}>
            <Button
              disabled={props.level === '1'}
              onClick={() => {
                window.location.href = props.prevLevelLink;
              }}
              shape="circle"
              type="primary"
              icon={<LeftOutlined />}
            />
          </Col>
        ) : null}

        {props.game ? (
          <Col xs={{ span: 24 }} xl={{ span: 3 }}>
            <Button
              disabled={props.level === props.maxLevel.toString()}
              onClick={() => {
                window.location.href = props.nextLevelLink;
              }}
              shape={props.evaluatedAnswer ? "round" : "circle"}
              type="primary"
              icon={<RightOutlined />}
            >
              {props.evaluatedAnswer && "Go to next item"}
            </Button>
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
