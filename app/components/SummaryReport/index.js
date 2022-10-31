/**
 *
 * SummaryReport
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import CustomCard from 'components/CustomCard';
import Descriptions from 'antd/lib/descriptions';
import H1 from 'components/atoms/H1';
import P from 'components/atoms/P';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import useMediaQuery from '../../utils/useMediaQuery';

function SummaryReport(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  return (
    props.evaluatedAnswer && (
      <Row style={{ paddingTop: '40px' }}>
        <Col span={24}>
          <CustomCard title={<H1 fontWeight="700">Summary Report</H1>}>
            <Col xl={{ span: 23 }} xs={{ span: 24 }}>
              <Descriptions
                layout={isDesktop ? 'horizontal' : 'vertical'}
                bordered
              >
                <Descriptions.Item label={<P>Score</P>} span={24}>
                  <P>{`${Math.round(
                    props.evaluatedAnswer[props.maxLevel].score * 100,
                  )}%`}</P>
                </Descriptions.Item>
                <Descriptions.Item label={<P>Attempted question </P>} span={24}>
                  <P>{props.evaluatedAnswer[props.maxLevel].attempted}</P>
                </Descriptions.Item>
                <Descriptions.Item
                  label={<P>Not attempted question</P>}
                  span={24}
                >
                  <P>{props.evaluatedAnswer[props.maxLevel].notAttempted}</P>
                </Descriptions.Item>
                <Descriptions.Item label={<P>Correctly Answered</P>} span={24}>
                  <P>
                    {props.evaluatedAnswer[props.maxLevel].correctlyAnswered}
                  </P>
                </Descriptions.Item>
                <Descriptions.Item label={<P>Wrong Answered</P>} span={24}>
                  <P>{props.evaluatedAnswer[props.maxLevel].wrongAnswered}</P>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </CustomCard>
        </Col>
      </Row>
    )
  );
}

SummaryReport.propTypes = {};

export default memo(SummaryReport);
