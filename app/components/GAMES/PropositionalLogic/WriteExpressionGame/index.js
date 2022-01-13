/**
 *
 * WriteExpressionGame
 *
 */

 import React, { memo } from 'react';
 // import PropTypes from 'prop-types';
 // import styled from 'styled-components';
 import Col from 'antd/lib/col';
 import Row from 'antd/lib/row';
 import Graph from 'components/Graph';
 import CustomButton from 'components/atoms/CustomButton';
 
 import Typography from 'antd/lib/typography';
 import Input from 'antd/lib/input';
 
 const { Title } = Typography;
 
 function WriteExpressionGame(props) {
   const { gameData } = props;
   return (
     <>
       <Row>
         <Col xs={{ span: 24 }} xl={{ span: 10, offset: 2 }}>
           <div>
             <Title level={3}>Write the expression depicted by the given graph: </Title>
              <Input
                onChange={e => {
                  props.setValue(e);
                }}
              />
             <CustomButton
               onClick={() => {
                 props.submit();
               }}
             >
               Check Answer
             </CustomButton>
           </div>
         </Col>
         <Col xs={{ span: 24 }} xl={{ span: 12 }}>
           <Graph
             level={props.level}
             gameData={gameData}
             evaluatedAnswer={props.evaluatedAnswer}
           />
         </Col>
       </Row>
     </>
   );
 }
 
 WriteExpressionGame.propTypes = {};
 
 export default memo(WriteExpressionGame);
 