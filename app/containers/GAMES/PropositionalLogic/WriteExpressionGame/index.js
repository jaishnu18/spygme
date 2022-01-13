/* eslint-disable radix */
/* eslint-disable react/prop-types */
/**
 *
 * WriteExpressionGame
 *
 */

 import React, { memo, useEffect, useState } from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { Helmet } from 'react-helmet';
 import { createStructuredSelector } from 'reselect';
 import { compose } from 'redux';
 
 import Col from 'antd/lib/col';
 import Row from 'antd/lib/row';
 
 import { useInjectSaga } from 'utils/injectSaga';
 import { useInjectReducer } from 'utils/injectReducer';
 import GameBar from 'components/GameBar';
 import GameDescription from 'components/GameDescription';
 import { start, end } from 'utils/timerFunctions';
 import moment from 'moment';
 import GameComponent from 'components/GAMES/PropositionalLogic/WriteExpressionGame';
 import makeSelectWriteExpressionGame from './selectors';
 import reducer from './reducer';
 import saga from './saga';
 import {
   getGraphStart,
   evaluateExpressionStart,
   putFeedbackStart,
 } from './actions';
 
 export function WriteExpressionGame(props) {
   useInjectReducer({ key: 'writeExpressionGame', reducer });
   useInjectSaga({ key: 'writeExpressionGame', saga });
 
   const [startTime, setStartTime] = useState(0);
   const [value, setValue] = useState(0);
 
   useEffect(() => {
     props.getGameData(props.level);
     start(setStartTime);
   }, [props.level]);
 
   const { gameData } = props.writeExpressionGame;
   const { evaluatedAnswer } = props.writeExpressionGame;
 
   const submit = () => {
     const secs = end(startTime);
     const response = {};
     gameData.response = value;
     const formatted = moment.utc(secs * 1000).format('mm:ss');
     gameData.timeTaken = formatted;
     gameData.level = parseInt(props.level);
     gameData.gameId = parseInt(props.gameId);
     response.studentResponse = gameData;
     props.checkStudentResponse(response);
   };
 
   return (
     <div>
       <Helmet>
         <title>Write Expression Game</title>
         <meta
           name="description"
           content="Description of WriteExpressionGame"
         />
       </Helmet>
 
       {gameData && (
         <>
           <GameBar
             name="Write Expression"
             level={props.level}
             attempts={gameData.attempt}
             totalLevels={gameData.maxLevels}
             evaluatedAnswer={evaluatedAnswer}
           />
 
           <Row style={{ width: '100%' }}>
             <Col>
               <GameDescription description={gameData.gameDescription} />
             </Col>
           </Row>
           <GameComponent
             gameData={gameData}
             evaluatedAnswer={evaluatedAnswer}
             animate
             visualize
             level={props.level}
             submit={submit}
             setValue={setValue}
           />
         </>
       )}
     </div>
   );
 }
 
 WriteExpressionGame.propTypes = {
   // dispatch: PropTypes.func.isRequired,
   writeExpressionGame: PropTypes.object,
   getGameData: PropTypes.func.isRequired,
   level: PropTypes.string.isRequired,
   checkStudentResponse: PropTypes.func.isRequired,
   // saveFeedback: PropTypes.func,
 };
 
 const mapStateToProps = createStructuredSelector({
   writeExpressionGame: makeSelectWriteExpressionGame(),
 });
 
 function mapDispatchToProps(dispatch) {
   return {
     getGameData: level => dispatch(getGraphStart(level)),
     checkStudentResponse: level => dispatch(evaluateExpressionStart(level)),
     saveFeedback: feedback => dispatch(putFeedbackStart(feedback)),
   };
 }
 
 const withConnect = connect(
   mapStateToProps,
   mapDispatchToProps,
 );
 
 export default compose(
   withConnect,
   memo,
 )(WriteExpressionGame);
 