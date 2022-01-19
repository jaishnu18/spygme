/**
 *
 * GradedArcConsistency
 *
 */

 import React, { memo, useState, useEffect } from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { Helmet } from 'react-helmet';
 import { createStructuredSelector } from 'reselect';
 import { compose } from 'redux';
 
 import { useInjectSaga } from 'utils/injectSaga';
 import { useInjectReducer } from 'utils/injectReducer';
 import makeSelectGradedArcConsistency from './selectors';
 import reducer from './reducer';
 import saga from './saga';
 import {
   getGamesDataStart,
   evaluateResponseStart,
   putFeedbackStart,
 } from './actions';
 import NavigationBar from 'components/NavigationBar';
 import GameComponent from 'components/GAMES/CSP/GradedArcConsistency';
 
 export function GradedArcConsistency(props) {
   useInjectReducer({ key: 'gradedArcConsistency', reducer });
   useInjectSaga({ key: 'gradedArcConsistency', saga });
 
   const [currentLevel, setCurrentLevel] = useState(0);
   const [value1, setValue1] = useState(undefined);
   const [value2, setValue2] = useState(undefined);
 
   useEffect(() => {
     props.getGameData();
   }, []);
 
   useEffect(() => {
     if (props.state.gameData) {
       let nodesLen = props.state.gameData[0].nodes.length, bagSize = props.state.gameData[0].bag_size;
       let newArr = new Array(nodesLen);
       for (let i = 0; i < nodesLen; i += 1)
         newArr[i] = (new Array(bagSize).fill(true));
       setValue1(newArr);
 
       nodesLen = props.state.gameData[1].nodes.length, bagSize = props.state.gameData[1].bag_size;
       newArr = new Array(nodesLen);
       for (let i = 0; i < nodesLen; i += 1)
         newArr[i] = (new Array(bagSize).fill(true));
       setValue2(newArr);
     }
   }, [props.state.gameData]);
 
   const submit = () => {
     const { gameData } = props.state;
     const response = {};
     gameData[0].response = value1;
     gameData[1].response = value2;
 
     response.studentResponse = gameData;
     console.log(response);
     props.checkStudentResponse(response);
   };
 
   console.log(props.state.evaluatedAnswer);
   return (
     <div>
       <Helmet>
         <title>GradedArcConsistency</title>
         <meta
           name="description"
           content="Description of GradedArcConsistency"
         />
       </Helmet>
       {props.state.gameData && value1 && value2 && (
         <>
           <NavigationBar
             gradedGame
             currentLevel={currentLevel}
             setCurrentLevel={setCurrentLevel}
             maxLevel="3"
             submit={submit}
           />
           <GameComponent
             gameData={props.state.gameData}
             evaluatedAnswer={props.state.evaluatedAnswer}
             currentLevel={currentLevel}
             setCurrentLevel={setCurrentLevel}
             submit={submit}
             setValue1={setValue1}
             value1={value1}
             setValue2={setValue2}
             value2={value2}
             maxLevel="2"
           />
         </>
       )}
     </div>
   );
 }
 
 GradedArcConsistency.propTypes = {
   getGameData: PropTypes.func,
   checkStudentResponse: PropTypes.func,
   state: PropTypes.object,
   saveFeedback: PropTypes.func,
 };
 
 const mapStateToProps = createStructuredSelector({
   state: makeSelectGradedArcConsistency(),
 });
 
 function mapDispatchToProps(dispatch) {
   return {
     getGameData: () => dispatch(getGamesDataStart()),
     checkStudentResponse: response => dispatch(evaluateResponseStart(response)),
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
 )(GradedArcConsistency);
 