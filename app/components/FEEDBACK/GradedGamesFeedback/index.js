/**
 *
 * GradedGamesFeedback
 *
 */

import React, { memo } from 'react';
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
  'How comfortable were you with the test environment?',
  'How tight was the time limit?',
];


function GradedGamesFeedback() {
  const [disableWWW, setDisableWWW] = useState(false);
  const [disableFeedback, setDisableFeedback] = useState(false);

  return (
    props.whatWentWrong ?
      (
        <Collapse>
          <Panel header="Give your opinion">
            <Form
              name="whatWentWrong"
              onFinish={props.submitWWW}>
              {
                errors.map((key, idx) => (
                  <Form.Item name={key} valuePropName="checked">
                    <Checkbox checked={false}>{key}</Checkbox>
                  </Form.Item>
                ))
              }
              <Form.Item>
                <Button type="primary" disabled={disableWWW} htmlType='submit' onClick={() => {
                }}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
      ) : (
        <Collapse>
          <Panel header="Give your opinion">
            <Form
              name="feedback"
              onFinish={props.submitFeedback}>{
                questions.map((key, idx) => (
                  <div>
                    <Paragraph>{(idx + 1) + ". " + key}</Paragraph>
                    <Form.Item name={key}>
                      <Rate />
                    </Form.Item>
                  </div>
                ))
              }
              <Form.Item >
                <Button type="primary" htmlType='submit' disabled={disableFeedback} onClick={() => {
                }}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
      )
  );
}

GradedGamesFeedback.propTypes = {};

export default memo(GradedGamesFeedback);
