/**
 *
 * PracticeGamesFeedback
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import notification from 'antd/lib/notification';
import Form from 'antd/lib/form/Form';
import Rate from 'antd/lib/rate';
import Paragraph from 'antd/lib/typography/Paragraph';
import CustomButton from 'components/atoms/CustomButton';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import Title from 'antd/lib/typography/Title';
const { Panel } = Collapse;
const errors = [
  'Silly mistake',
  'Did not know the concept',
  'Knew Concept,but unable to apply',
  'Made a guess',
  'Attempted in a hurry',
  'Could not understand the question',
];

const questions = [
  'How interesting did you find the question?',
  'How relevant did you find the question w.r.t. the concept?',
  'How difficult did you find the question w.r.t. the current level?',
];

function PracticeGamesFeedback(props) {
  // whatever we need to send to the api call that should be in container
  // props.array
  // props.setArray

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Row style={{ width: '80%', height: '80%' }}>
        {props.whatWentWrong && (
          <Col span={12}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '10px',
              }}
            >
              <Title level={4} style={{ color: 'red', margin: 0 }}>
                What Went Wrong?
              </Title>
              <Form
                name="whatWentWrong"
                onFinish={values => {
                  const response = {};
                  response.whatwentwrong = JSON.stringify(values);
                  props.saveWWW(response);
                  notification.close('www');
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
            </div>
          </Col>
        )}
        <Col span={props.whatWentWrong ? 12 : 24}>
          <div
            style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}
          >
            <Title level={4} style={{ color: 'blue' }}>
              Give your opinion!
            </Title>
            <Form
              name="feedback"
              onFinish={values => {
                const response = {};
                response.feedback = JSON.stringify(values);
                props.saveFeedback(response);
                notification.close('feedback');
              }}
            >
              {questions.map((key, idx) => (
                <div>
                  <Paragraph>{`${idx + 1}. ${key}`}</Paragraph>
                  <Form.Item name={key}>
                    <Rate />
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={() => {}}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

PracticeGamesFeedback.propTypes = {};

export default memo(PracticeGamesFeedback);
