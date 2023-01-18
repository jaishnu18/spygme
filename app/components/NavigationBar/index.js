/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/**
 *
 * NavigationBar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import Tooltip from 'antd/lib/tooltip';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Button from 'antd/lib/button';
import api from 'api';
import draftToHtml from 'draftjs-to-html';
import history from 'utils/history';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  Editor,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import message from 'antd/lib/message';
import useMediaQuery from 'utils/useMediaQuery';
import Icons from 'components/IconBox';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import BackImage from 'images/back.png';
import DiscussImage from 'images/discuss.png';
import CheckMarkIcon from 'images/check-mark.png';
import { evaluateAnswer } from '../../containers/GAMES/PropositionalLogic/ExpressionEvaluationGame/saga';
import DiscussNewThreadComponent from '../DISCUSS/DiscussNewThreadComponent';

const errors = [
  'Question was wrong',
  'Provided solution was wrong',
  'Some part of question was not visible',
];

export const Wrapper = styled(Row)`
  width: 100% !important;
  display: flex;
  align-items: center;
  padding: ${props => (props.isDesktop ? '40px' : '20px')};
`;

function NavigationBar(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  const isDesktop = useMediaQuery('(min-width: 960px)');

  async function newThreadPost(values) {
    values.tags = new Array(1).fill(values.tags);
    values.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const response = await api.post('/discuss/post-thread', values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('_UFT_'),
      },
      withCredentials: true,
    });
    setNewThreadVisible(false);
    message.success('Thread posted');
  }

  async function nextItem() {
    const url = window.location.pathname;
    const data = url.split('/');
    const item = {};
    item.type = 'P';
    item.topicId = parseInt(data[2]);
    item.conceptId = parseInt(data[3]);
    item.itemId = parseInt(data[4]);
    item.level = parseInt(data[5]);
    const response = await api.post('/get-dashboard/next-item', item, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('_UFT_'),
      },
      withCredentials: true,
    });

    window.location.href = response.data.data.url;
  }

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
      },
    );
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
    window.location.href = '/topics';
  };

  const exitModalhandleCancel = () => {
    setIsExitModalVisible(false);
  };

  return (
    <Wrapper isDesktop={isDesktop}>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={props.prevPageLink}>
          <Button
            style={{
              padding: '6px',
              border: `1px solid var(--primaryColor)`,
              height: 'fit-content',
            }}
            shape="circle"
            onClick={e => {
              if (props.readingMaterial) {
                // apiCall
                e.preventDefault();
                props.backToMaterials();
              }
            }}
          >
            {/* {props.prevPageText} */}
            <Icons size="30px" src={BackImage} />
          </Button>
        </Link>
      </Col>
      <Col
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '20px',
        }}
        xs={{ span: 19 }}
        xl={{ span: props.gradedGame ? 12 : 16 }}
      >
        <H1 fontWeight="700" style={{ textAlign: 'center' }}>
          {props.heading}
        </H1>
      </Col>

      {(props.game || props.readingMaterial) && (
        <Col
          style={{
            display: !isDesktop && 'flex',
            justifyContent: !isDesktop && 'center',
          }}
          xs={{ span: 12 }}
          xl={{ span: 1 }}
        >
          <Tooltip title="Discuss">
            <Button
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'fit-content',
                border: 'none',
              }}
              disabled={
                props.game ? props.evaluatedAnswer === undefined : false
              }
              onClick={() => {
                setEditorState(
                  EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                      convertFromHTML(
                        `<p>Description of doubt here</p><a href=${
                          window.location.href
                        }>Link to item</a>`,
                      ),
                    ),
                  ),
                );
                setNewThreadVisible(true);
              }}
            >
              <Icons size={isDesktop ? '50px' : '40px'} src={DiscussImage} />
            </Button>
          </Tooltip>
        </Col>
      )}
      {props.readingMaterial && (
        <Col
          xs={{ span: 12 }}
          xl={{ span: 2, offset: 1 }}
          style={{
            display: !isDesktop && 'flex',
            alignItems: !isDesktop && 'center',
          }}
        >
          <Button
            style={{ border: 'none', display: 'flex' }}
            onClick={props.markAsRead}
            shape="round"
          >
            <Icons size="30px" src={CheckMarkIcon} />
            <P style={{ fontWeight: 700, marginLeft: '8px' }}>
              {props.read ? 'Go to next item' : 'Mark as Read'}
            </P>
          </Button>
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
            defaultTitle={`Doubt in ${
              props.readingMaterial ? 'reading material ' : 'practice game '
            }`}
          />
        )}
      </Modal>

      {props.game ? (
        <Col
          xs={{ span: 12 }}
          xl={{ span: 2 }}
          style={{
            marginLeft: isDesktop && '20px',
            marginTop: !isDesktop && '20px',
            marginBottom: !isDesktop && '20px',
            display: !isDesktop && 'flex',
            justifyContent: !isDesktop && 'center',
          }}
        >
          <Button
            style={{
              border: 'none',
              display: 'flex',
              fontWight: 700,
              alignItems: 'center',
            }}
            type="danger"
            disabled={props.evaluatedAnswer === undefined}
            onClick={() => {
              setReportModalVisible(true);
            }}
          >
            Report Error
          </Button>
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
            <Button type="primary" htmlType="submit" onClick={() => {}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {props.game ? (
        <Col
          style={{
            display: !isDesktop && 'flex',
            justifyContent: !isDesktop && 'center',
          }}
          xs={{ span: 12 }}
          xl={{ span: 1 }}
        >
          <Tooltip title="Go to Previous Item">
            <Button
              disabled={props.level === '1'}
              onClick={() => {
                window.location.href = props.prevLevelLink;
              }}
              shape={isDesktop ? 'circle' : 'auto'}
              style={{
                backgroundColor:
                  props.level === '1' ? 'white' : 'var(--primaryColor)',
                color: props.level === '1' ? 'var(--primaryColor)' : 'white',
              }}
              icon={
                isDesktop && (
                  <LeftOutlined
                    style={{
                      color:
                        props.level === '1' ? 'var(--primaryColor)' : 'white',
                    }}
                  />
                )
              }
            >
              {!isDesktop && 'Previous Item'}
            </Button>
          </Tooltip>
        </Col>
      ) : null}

      {props.game ? (
        <Col
          style={{ display: 'flex', justifyContent: 'center' }}
          xs={{ span: 12 }}
          xl={{ span: 1 }}
        >
          <Tooltip title="Go to Next Item">
            <Button
              // disabled={props.level === props.maxLevel.toString()}
              onClick={() => {
                nextItem();
              }}
              shape={isDesktop ? 'circle' : 'auto'}
              style={{ backgroundColor: 'var(--primaryColor)', color: 'white' }}
              icon={isDesktop && <RightOutlined style={{ color: 'white' }} />}
            >
              {!isDesktop && 'Next Item'}
            </Button>
          </Tooltip>
        </Col>
      ) : null}

      {props.gradedGame && (
        <Col xs={{ span: 24 }} xl={{ span: 10 }}>
          <Row style={{ width: '100%' }}>
            <Col xs={{ span: 24 }} xl={{ span: 12 }} />
            <Col
              xs={{ span: 24 }}
              xl={{ span: 12 }}
              style={{
                display: 'flex',
                justifyContent: isDesktop ? 'flex-end' : 'center',
                width: '100%',
                marginTop: !isDesktop && '20px',
              }}
            >
              <CustomButton
                disabled={props.currentLevel === 0}
                style={{
                  fontSize: isDesktop && '20px',
                }}
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
                style={{
                  fontSize: isDesktop && '20px',
                }}
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
              <CustomButton
                style={{
                  backgroundColor: 'red',
                  fontSize: isDesktop && '20px',
                }}
                onClick={exitModalshowModal}
                marginLeft={isDesktop && '40px'}
              >
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
              <CustomButton
                style={{
                  fontSize: isDesktop && '20px',
                }}
                disabled={testSubmitted}
                onClick={showModal}
              >
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
        </Col>
      )}
    </Wrapper>
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
