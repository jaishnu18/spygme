/**
 *
 * ProficiencyvsTimeComponent
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Affix from 'antd/lib/affix';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
const { Option } = Select;
import axios from 'axios';
import { Scatter } from '@ant-design/plots';
function ProficiencyvsTimeComponent() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const values = {};
    getPerformancevsTime({});
  }, []);
  const getPerformancevsTime = async (values) => {
    const response = await axios.post(
      'http://localhost:5000/teachers-dashboard/proficiency-vs-time',
      values,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('_UFT_'),
        },
        withCredentials: true,
      });
    setData(response.data.data);
  };
  const config = {
    data,
    xField: 'progress',
    yField: 'proficiency',
    size: 3,
    pointStyle: {
    	fill: '#5B8FF9',
    	stroke: '#5B8FF9'
    },
    sizeField: 'name',
    yAxis: {
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      title: {
        text: 'Proficiency(%)'
      }
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      title: {
        text: 'Involvement (%)',
      }
    },
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Form
            name="classwise"
            onFinish={getPerformancevsTime}
            >
            <Row>
              <Col span={5}>
                <Form.Item
                  name="level"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter student to be analyzed!',
                    },
                  ]}
                  initialValue="school"
                >
                  <Select placeholder={"Select level of analysis"} defaultValue="school">
                    <Option key="school">School</Option>
                    <Option key="class">Class</Option>
                    <Option key="student">Student</Option>
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col span={5}>
                <Form.Item
                  name="concept"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter class to be analyzed!',
                    },
                  ]}
                >
                  <Select placeholder={"Select concept"}>
                    <Option key="0">All concepts</Option>
                    {
                      conceptList &&
                      conceptList.map((key, idx) => (
                        <Option key={key.id}>{key.name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="analysis"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter class to be analyzed!',
                    },
                  ]}
                >
                  <Select placeholder={"Select type of analysis"}>

                  </Select>
                </Form.Item>
              </Col>*/}
              <Col>
                <Form.Item>
                  <Button type="primary"
                    htmlType="submit">Add</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {data &&
            <Scatter {...config} />
          }
        </Col>
      </Row>
    </div>
  )
}

ProficiencyvsTimeComponent.propTypes = {};

export default memo(ProficiencyvsTimeComponent);
