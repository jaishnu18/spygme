/**
 *
 * StudentActivityAnalysisComponent
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
import { Column } from '@ant-design/plots';

function StudentActivityAnalysisComponent(props) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const values = {};
    getActivityAnalysis({});
  }, []);
  const getActivityAnalysis = async (values) => {
    const response = await axios.post(
      'http://localhost:5000/teachers-dashboard/activity-analysis',
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
    console.log(response.data.data);
  };
  const config_most_active = {
    data: (data && data['most_active']),
    xField: 'name',
    yField: 'activity',
    isStack: true,
    seriesField: 'type',
    yAxis: {
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      title: {
        text: 'Activity'
      }
    },
    // xAxis: {
    //   grid: {
    //     line: {
    //       style: {
    //         stroke: '#eee',
    //       },
    //     },
    //   },
    //   line: {
    //     style: {
    //       stroke: '#aaa',
    //     },
    //   },
    //   title: {
    //     text: 'Progress (%)',
    //   }
    // },
  };

  const config_least_active = {
    // appendPadding: 10,
    data: (data && data['least_active']),
    xField: 'name',
    yField: 'activity',
    isStack: true,
    seriesField: 'type',
    yAxis: {
      min: 0,
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      title: {
        text: 'Activity'
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
        text: 'Progress (%)',
      }
    },
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Form
            name="classwise"
            onFinish={getActivityAnalysis}
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
            <Column {...config_most_active} />
          }
        </Col>
        <Col span={24}>
          {data &&
            <Column {...config_least_active} />
          }
        </Col>
      </Row>
    </div>
  )
}

StudentActivityAnalysisComponent.propTypes = {};

export default memo(StudentActivityAnalysisComponent);
