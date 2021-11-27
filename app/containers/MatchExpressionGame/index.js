// /* eslint-disable radix */
// /* eslint-disable no-nested-ternary */
// /* eslint-disable eqeqeq */
// /* eslint-disable camelcase */
// /**
//  *
//  * MatchExpressionGame
//  *
//  */

// import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import CytoscapeComponent from 'react-cytoscapejs';
// import {
//   Row,
//   InputNumber,
//   Button,
//   Space,
//   message,
//   Col,
//   Form,
//   Modal,
//   Input,
// } from 'antd';
// import moment from 'moment';
// import AppWrapper from 'components/AppWrapper';
// import GameRow from 'components/GameRow';
// import history from 'utils/history';
// import TickMark from 'images/tickmark.svg';
// import CrossMark from 'images/cross.svg';
// import TimeClock from 'components/TimeClock';
// import Rating from '@mui/material/Rating';
// import Box from '@mui/material/Box';
// import StarIcon from '@mui/icons-material/Star';
// import TextField from '@mui/material/TextField';
// // import labels from 'app/utils/constants/labels.js';
// import makeSelectMatchExpressionGame from './selectors';
// import reducer from './reducer';
// import saga from './saga';

// import {
//   getGamesDataStart,
//   evaluateResponseStart,
//   putFeedbackStart,
// } from './actions';

// const labels = {
//   0.5: 'Useless',
//   1: 'Useless+',
//   1.5: 'Poor',
//   2: 'Poor+',
//   2.5: 'Ok',
//   3: 'Ok+',
//   3.5: 'Good',
//   4: 'Good+',
//   4.5: 'Excellent',
//   5: 'Excellent+',
// };

// const errors = [
//   'Silly mistake',
//   'Did not know the concept',
//   'Knew Concept,but unable to apply',
//   'Made a guess',
//   'Attempted in a hurry',
//   'Could not understand the question',
// ];

// const questions = [
//   'How interesting did you find the question?',
//   'How interesting did you find the question?',
//   'How relevant did you find the question w.r.t. the concept?',
//   'How difficult did you find the question w.r.t. the current level?',
// ];

// export function MatchExpressionGame(props) {
//   useInjectReducer({ key: 'matchExpressionGame', reducer });
//   useInjectSaga({ key: 'matchExpressionGame', saga });

//   const [checkedState, setCheckedState] = useState(
//     new Array(errors.length).fill(false),
//   );
//   const [graphData, setGraphData] = useState(undefined);
//   const [items, setItems] = useState(undefined);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [starValue1, setStarValue1] = useState(0);
//   const [starValue2, setStarValue2] = useState(0);
//   const [starValue3, setStarValue3] = useState(0);
//   const [starValue4, setStarValue4] = useState(0);
//   const [qsWrong, setQsWrong] = useState(false);
//   const [qsChanges, setQsChanges] = useState('');
//   // const [hover, setHover] = React.useState(-1);

//   useEffect(() => {
//     console.log(qsChanges);
//   }, [qsChanges]);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     const response = {};
//     const sr = {};
//     const res = [];
//     let x = {};
//     x.question = questions[0];
//     x.rating = starValue1;
//     res.push(x);
//     x = {};
//     x.question = questions[1];
//     x.rating = starValue2;
//     res.push(x);
//     x = {};
//     x.question = questions[2];
//     x.rating = starValue3;
//     res.push(x);
//     x = {};
//     x.question = questions[3];
//     x.rating = starValue4;
//     res.push(x);

//     sr.ratingFeedback = res;
//     sr.solutionWrong = qsWrong;
//     sr.questionChangeSuggestion = qsChanges;

//     const studentResponse = {};
//     studentResponse.feedback = JSON.stringify(sr);

//     if (evaluatedAnswer.score !== 1) {
//       const newArr = checkedState.map((isTrue, index) => {
//         if (isTrue) {
//           return errors[index];
//         }
//       });
//       const filtered = newArr.filter(el => {
//         return el != null;
//       });
//       studentResponse.whatwentwrong = JSON.stringify(filtered);
//     }
//     response.studentResponse = studentResponse;

//     setIsModalVisible(false);

//     props.saveFeedback(response);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const [startTime, setStartTime] = useState(0);
//   function start() {
//     const date = new Date();
//     setStartTime(date);
//   }

//   function end() {
//     const endTime = new Date();
//     let timeDiff = endTime - startTime;
//     timeDiff /= 1000;
//     const seconds = timeDiff;
//     return seconds;
//   }

//   const handleOnChange = position => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//       index === position ? !item : item,
//     );

//     setCheckedState(updatedCheckedState);
//   };

//   const { level } = props.match.params;
//   useEffect(() => {
//     props.getGameData(level);
//     start();
//   }, [level]);

//   const { gameData } = props.matchExpressionGame;
//   const { evaluatedAnswer } = props.matchExpressionGame;

//   useEffect(() => {
//     if (gameData) {
//       const elements = [];
//       const { x_coor } = gameData;
//       const { y_coor } = gameData;

//       const { edge_carvature } = gameData;
//       const { content } = gameData;

//       for (let i = 0; i < gameData.num_nodes; i += 1) {
//         const obj = {
//           data: { id: i, label: `${gameData.content[i]} : ${i}` },
//           position: {
//             x: 100 * (x_coor[i] + 1),
//             y: 100 * (y_coor[i] + 1),
//           },
//         };
//         elements.push(obj);
//       }
//       const { adjList } = gameData;
//       for (let i = 0; i < gameData.num_nodes; i += 1) {
//         let j = 0;

//         while (adjList[i][j] != null) {
//           const tar = adjList[i][j];

//           const obj = {
//             data: {
//               source: i,
//               target: tar,
//               label: '',
//               key: `${i}t${tar}`,
//             },
//             style: {
//               'control-point-weight': 0.5,
//               'control-point-distance': -50 * edge_carvature[i][j],
//               'line-color':
//                 content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
//               'target-arrow-color':
//                 content[i] === '~' ? '#000' : j == 0 ? 'red' : 'blue',
//             },
//           };
//           elements.push(obj);

//           j += 1;
//         }
//       }
//       setGraphData(elements);
//       let ptr = 0;

//       if (gameData.exp_to_display) {
//         const exp = gameData.exp_to_display.map((item, index) => (
//           <div>
//             <div style={{ display: 'flex' }}>
//               <h2>
//                 {index}..... {item} ::{' '}
//               </h2>
//               <Form.Item
//                 name={item}
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please input your Response!',
//                   },
//                 ]}
//                 style={{ marginLeft: '20px' }}
//               >
//                 <InputNumber />
//               </Form.Item>
//             </div>

//             {evaluatedAnswer && evaluatedAnswer.correctResponse && (
//               <div>
//                 <h1
//                   style={{
//                     color: evaluatedAnswer.correctResponse.includes(index)
//                       ? 'green'
//                       : 'red',
//                   }}
//                 >
//                   {evaluatedAnswer &&
//                   evaluatedAnswer.correctResponse.includes(index) ? (
//                     <img
//                       src={TickMark}
//                       style={{ width: '40px', height: '40px' }}
//                     />
//                   ) : (
//                     <div>
//                       <img
//                         src={CrossMark}
//                         style={{ width: '20px', height: '20px' }}
//                       />
//                       <div>
//                         Correct Node-ID: <span />
//                         {evaluatedAnswer.wrongResponse[ptr++][1]}
//                       </div>
//                     </div>
//                   )}
//                 </h1>
//               </div>
//             )}
//           </div>
//         ));

//         setItems(exp);
//       }
//     }
//   }, [gameData, evaluatedAnswer]);

//   useEffect(() => {
//     if (evaluatedAnswer) {
//       setIsModalVisible(true);
//     }
//   }, [evaluatedAnswer]);

//   const prevLevel = () => {
//     const lvl = parseInt(level);
//     history.push(`/match-expression/${lvl - 1}`);
//   };
//   const nextLevel = () => {
//     const lvl = parseInt(level);
//     history.push(`/match-expression/${lvl + 1}`);
//   };

//   const onFinish = values => {
//     const secs = end();
//     const resp = [];

//     for (const [key, value] of Object.entries(values)) {
//       resp.push(value);
//     }

//     const response = {};
//     gameData.response = resp;
//     const formatted = moment.utc(secs * 1000).format('mm:ss');
//     gameData.timeTaken = formatted;
//     gameData.difficulty = level;
//     response.studentResponse = gameData;
//     console.log(response);
//     props.checkStudentResponse(response);
//   };

//   const onFinishFailed = errorInfo => {
//     console.log('Failed:', errorInfo);
//   };

//   let myCyRef;

//   return (
//     <div>
//       <Helmet>
//         <title>MatchExpressionGame</title>
//         <meta name="description" content="Description of MatchExpressionGame" />
//       </Helmet>

//       <AppWrapper>
//         <div style={{ display: 'flex', width: '100%', padding: '40px 10px' }}>
//           {level == 1 ? (
//             <Button
//               style={{ marginLeft: 'auto', marginRight: '30px' }}
//               onClick={nextLevel}
//             >
//               Next Level
//             </Button>
//           ) : level > 1 && level < 4 ? (
//             <div style={{ display: 'flex', width: '100%' }}>
//               <Button style={{ marginLeft: '10px' }} onClick={prevLevel}>
//                 Previous Level
//               </Button>
//               <Button
//                 style={{ marginLeft: 'auto', marginRight: '30px' }}
//                 onClick={nextLevel}
//               >
//                 Next Level
//               </Button>
//             </div>
//           ) : (
//             <div style={{ display: 'flex', width: '100%' }}>
//               <Button style={{ marginLeft: '10px' }} onClick={prevLevel}>
//                 Previous Level
//               </Button>
//             </div>
//           )}
//         </div>
//         {gameData && items ? (
//           <GameRow>
//             <Col offset="2">
//               <h1>Enter the Node Value for each Expression</h1>
//               <div>
//                 {items && (
//                   <Form
//                     name="basic"
//                     labelCol={{
//                       span: 8,
//                     }}
//                     wrapperCol={{
//                       span: 16,
//                     }}
//                     onFinish={onFinish}
//                     onFinishFailed={onFinishFailed}
//                   >
//                     {items}
//                     <Form.Item
//                       wrapperCol={{
//                         offset: 8,
//                         span: 16,
//                       }}
//                     >
//                       <Button
//                         type="primary"
//                         htmlType="submit"
//                         disabled={evaluatedAnswer}
//                       >
//                         Submit
//                       </Button>
//                     </Form.Item>
//                   </Form>
//                 )}
//               </div>
//             </Col>

//             <Col offset="1">
//               <h1>Graph</h1>

//               <div>
//                 <CytoscapeComponent
//                   elements={CytoscapeComponent.normalizeElements(graphData)}
//                   // pan={{ x: 200, y: 200 }}
//                   style={{
//                     minWidth: '500px',
//                     minHeight: '500px',
//                     borderRadius: '5px',
//                     border: '4px solid #999676',
//                   }}
//                   zoomingEnabled
//                   maxZoom={3}
//                   minZoom={0.1}
//                   autounselectify={false}
//                   boxSelectionEnabled
//                   stylesheet={[
//                     {
//                       selector: 'node',
//                       style: {
//                         'background-color': '#666',
//                         color: 'white',
//                         label: 'data(label)',
//                         width: '60px',
//                         height: '60px',
//                         'text-valign': 'center',
//                         'text-halign': 'center',
//                         'font-size': '17px',
//                       },
//                     },
//                     {
//                       selector: 'edge',
//                       style: {
//                         width: 3,
//                         'line-color': 'blue',
//                         'target-arrow-color': 'blue',
//                         'target-arrow-shape': 'triangle',
//                         'curve-style': 'unbundled-bezier',
//                         'control-point-weight': '0.5',
//                         'control-point-distance': '0',
//                       },
//                     },
//                   ]}
//                   cy={cy => {
//                     myCyRef = cy;
//                     cy.on('tap', 'node', evt => {
//                       // var node = evt.target;
//                     });
//                   }}
//                 />
//               </div>
//               <TimeClock active={!evaluatedAnswer} />

//               <Modal
//                 title="Feedback"
//                 width="800px"
//                 visible={isModalVisible}
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//               >
//                 <Box
//                   md={{
//                     width: 200,
//                     display: 'flex',
//                     alignItems: 'center',
//                     flexDirection: 'column',
//                   }}
//                 >
//                   <h2>{questions[0]}</h2>
//                   <Rating
//                     name="hover-feedback-1"
//                     value={starValue1}
//                     precision={0.5}
//                     onChange={(event, newValue) => {
//                       setStarValue1(newValue);
//                     }}
//                     // onChangeActive={(event, newHover) => {
//                     //   // setHover(newHover);
//                     // }}
//                     emptyIcon={
//                       <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
//                     }
//                   />
//                   <h2>{questions[1]}</h2>
//                   <Rating
//                     name="hover-feedback-2"
//                     value={starValue2}
//                     precision={0.5}
//                     onChange={(event, newValue) => {
//                       setStarValue2(newValue);
//                     }}
//                     // onChangeActive={(event, newHover) => {
//                     //   setHover(newHover);
//                     // }}
//                     emptyIcon={
//                       <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
//                     }
//                   />
//                   <h2>{questions[2]}</h2>
//                   <Rating
//                     name="hover-feedback-3"
//                     value={starValue3}
//                     precision={0.5}
//                     onChange={(event, newValue) => {
//                       setStarValue3(newValue);
//                     }}
//                     // onChangeActive={(event, newHover) => {
//                     //   setHover(newHover);
//                     // }}
//                     emptyIcon={
//                       <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
//                     }
//                   />
//                   <h2>{questions[3]}</h2>
//                   <Rating
//                     name="hover-feedback-4"
//                     value={starValue4}
//                     precision={0.5}
//                     onChange={(event, newValue) => {
//                       setStarValue4(newValue);
//                     }}
//                     // onChangeActive={(event, newHover) => {
//                     //   setHover(newHover);
//                     // }}
//                     emptyIcon={
//                       <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
//                     }
//                   />

//                   <h2>Do you think the solution given is wrong?</h2>
//                   <div style={{ display: 'flex' }}>
//                     <Button
//                       onClick={() => {
//                         setQsWrong(false);
//                       }}
//                       style={{
//                         backgroundColor: !qsWrong ? 'red' : 'white',
//                         color: !qsWrong ? 'white' : 'black',
//                       }}
//                     >
//                       No
//                     </Button>
//                     <Button
//                       onClick={() => {
//                         setQsWrong(true);
//                       }}
//                       style={{
//                         backgroundColor: qsWrong ? 'green' : 'white',
//                         color: qsWrong ? 'white' : 'black',
//                       }}
//                     >
//                       Yes
//                     </Button>
//                   </div>
//                   <h2>Do you want changes/improvement in this game?</h2>
//                   <Box
//                     component="form"
//                     sx={{
//                       '& > :not(style)': { m: 1, width: '25ch' },
//                     }}
//                     noValidate
//                     autoComplete="off"
//                   >
//                     <TextField
//                       id="outlined-basic"
//                       label="changes"
//                       variant="outlined"
//                       style={{ width: '200px' }}
//                       onChange={e => {
//                         setQsChanges(e.target.value);
//                       }}
//                     />
//                   </Box>
//                   {evaluatedAnswer && evaluatedAnswer.score < 1 && (
//                     <div>
//                       <h1>What Went Wrong?</h1>
//                       <div style={{ display: 'flex', flexDirection: 'column' }}>
//                         {errors.map((err, index) => (
//                           <div>
//                             <input
//                               type="checkbox"
//                               id={`custom-checkbox-${index}`}
//                               name={err}
//                               value={err}
//                               checked={checkedState[index]}
//                               onChange={() => handleOnChange(index)}
//                             />
//                             <label htmlFor={`custom-checkbox-${index}`}>
//                               {err}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </Box>
//               </Modal>
//             </Col>
//           </GameRow>
//         ) : null}
//       </AppWrapper>
//     </div>
//   );
// }

// MatchExpressionGame.propTypes = {
//   matchExpressionGame: PropTypes.object,
//   getGameData: PropTypes.func,
//   checkStudentResponse: PropTypes.func,
//   saveFeedback: PropTypes.func,
// };

// const mapStateToProps = createStructuredSelector({
//   matchExpressionGame: makeSelectMatchExpressionGame(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     getGameData: token => dispatch(getGamesDataStart(token)),
//     checkStudentResponse: response => dispatch(evaluateResponseStart(response)),
//     saveFeedback: feedback => dispatch(putFeedbackStart(feedback)),
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(
//   withConnect,
//   memo,
// )(MatchExpressionGame);
