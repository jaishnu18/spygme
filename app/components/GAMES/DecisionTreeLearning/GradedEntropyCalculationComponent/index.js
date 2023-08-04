/**
 *
 * GradedEntropyCalculationComponent
 *
 */

import React, { memo, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavigationBar from 'components/NavigationBar';
import Title from 'antd/lib/typography/Title';
import EntropyBucket from 'components/EntropyBucket';
import { useForm } from 'antd/lib/form/Form';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import H1 from 'components/atoms/H1';
import { InputNumber } from 'antd';

import useMediaQuery from 'utils/useMediaQuery';
import GradedGamesFeedback from 'components/FEEDBACK/GradedGamesFeedback';
import ExamNavigator from 'components/ExamNavigator';
import SummaryReport from 'components/SummaryReport';

function GradedEntropyCalculationComponent(props) {
  const { gameData } = props;
  const { currentLevel } = props;
  const { evaluatedAnswer } = props;
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const FeedBack = __evaluatedAnswer =>
    __evaluatedAnswer && (
      <div>
        <H1
          fontWeight="700"
          textAlign="center"
          style={{ margin: '30px 0', marginTop: '60px' }}
        >
          FEEDBACK
        </H1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isDesktop && '40px',
          }}
        >
          <GradedGamesFeedback
            movement={props.movement}
            setMovement={props.setMovement}
            whatWentWrong={__evaluatedAnswer[3].score < 1}
            saveFeedback={props.submitFeedback}
            saveWWW={props.submitWWW}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      </div>
    );

  const array = [];

  const [form1] = useForm();
  const [form2] = useForm();
  const [form3] = useForm();
  array.push(form1);
  array.push(form2);
  array.push(form3);

  const saveButtonRef = useRef(null);

  const submitForm = () => {
    saveButtonRef.current.click();
  };

  return (
    <Row style={{ padding: isDesktop ? '40px' : '20px', width: '100%' }}>
      <Col xs={{ span: 24 }} xl={{ span: 24 }}>
        <NavigationBar
          gradedGame
          heading="Entropy Calculation"
          currentLevel={currentLevel}
          setCurrentLevel={props.setCurrentLevel}
          timeStamps={props.timeStamps}
          setTimeStamps={props.setTimeStamps}
          maxLevel={props.maxLevel}
          submit={() => {
            props.submit();
          }}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 5 }} style={{ padding: '20px' }}>
        <ExamNavigator
          levels={props.maxLevel}
          setCurrentLevel={props.setCurrentLevel}
          value={props.value}
          evaluatedAnswer={evaluatedAnswer}
          examDuration={600}
          {...props}
        />
      </Col>
      <Col xs={{ span: 24 }} xl={{ span: 9 }} style={{ padding: '20px' }}>
        <EntropyBucket bucket={gameData[currentLevel].bucket} />
        {evaluatedAnswer && (
          <SummaryReport
            evaluatedAnswer={evaluatedAnswer}
            maxLevel={props.maxLevel}
          />
        )}
      </Col>

      <Col
        xs={{ span: 24 }}
        xl={{ span: 10 }}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}
      >
        <Title level={3} style={{ marginBottom: '20px' }}>
          Entropy Calculation:{' '}
        </Title>

        {!evaluatedAnswer && (
          <div style={{ padding: '40px' }}>
            <h2>Enter the entropy of the bucket: </h2>
            <Form
              form={array[props.currentLevel]}
              name={`Form-${currentLevel + 1}`}
              autoComplete="off"
              onFinish={values => {
                props.value[currentLevel] =
                  values[`entropy-${currentLevel + 1}`];
              }}
              onChange={submitForm}
            >
              <Form.Item
                label="Entropy: "
                name={`entropy-${currentLevel + 1}`}
                fieldKey={`entropy-key-${currentLevel + 1}`}
                rules={[
                  {
                    required: true,
                    message: 'Answer Required',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Button
                style={{ display: 'none' }}
                ref={saveButtonRef}
                type="primary"
                htmlType="submit"
              >
                Save Answer
              </Button>
            </Form>
          </div>
        )}

        {evaluatedAnswer && (
          <div style={{ padding: '40px' }}>
            {evaluatedAnswer[currentLevel].evaluation === 'CORRECT' ? (
              <h3>Correct Answer!</h3>
            ) : (
              <h3>
                Incorrect! The answer is {evaluatedAnswer[currentLevel].answer}
              </h3>
            )}
          </div>
        )}

        {FeedBack(evaluatedAnswer)}
      </Col>
    </Row>
  );
}

GradedEntropyCalculationComponent.propTypes = {};

export default memo(GradedEntropyCalculationComponent);
