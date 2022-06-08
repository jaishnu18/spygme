/**
 *
 * PlugNPlayMain
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Tabs from 'antd/lib/tabs';
import GameDataForm from '../GameDataForm';
import InstanceGeneratorForm from '../InstanceGeneratorForm';
import ResponseValidatorForm from '../ResponseValidatorForm';
const { TabPane } = Tabs;

function PlugNPlayMain(props) {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Game Data" key="1">
        <GameDataForm gameTitle={props.gameTitle} setGameTitle={props.setGameTitle}/>
      </TabPane>
      <TabPane tab="Instance generator" key="2">
        <InstanceGeneratorForm 
        instanceGeneratorValidate={props.instanceGeneratorValidate}
        instGenValResult={props.instGenValResult} />
      </TabPane>
      <TabPane tab="Response Validator" key="3">
        <ResponseValidatorForm responseValidatorValidate={props.responseValidatorValidate} />
      </TabPane>
    </Tabs>
  )
}

PlugNPlayMain.propTypes = {};

export default memo(PlugNPlayMain);
