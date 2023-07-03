/**
 *
 * Chatbot
 *
 */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';

import './chatbot.css';

function Chatbot(props) {
  const { isActive, getData, getResponse } = props;

  console.log('Chatbot-userResponse', typeof getResponse);

  console.log('isActive', isActive);

  const [number, setNumber] = useState(1);
  const [questionId, setQuestionId] = useState();
  const [userResponses, setUserResponses] = useState({});
  const [inputValue, setInputValue] = useState('');

  const [isToggle, setToggle] = useState(true);
  console.log('isToggle', isToggle);
  console.log('quesID', questionId);

  useEffect(() => {
    setQuestionId(getResponse);
  }, [getResponse]);

  function restQuestion() {
    setQuestionId(1);
    setToggle(true);
    setNumber(number * 10);
  }

  const toggleChat = () => {
    setToggle(!isToggle);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleUserResponse = response => {
    setUserResponses({ ...userResponses, [questionId * number]: response });

    if (questionId === 1 && response === '1') {
      setQuestionId(2);
    } else if (questionId === 1 && response === '2') {
      setQuestionId(3);
    } else if (questionId === 1 && response === '-1') {
      setQuestionId(-1);
      // alert("Thanks for the feedback");
    } else if (questionId === 2 && response === '1') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 2 && response === '2') {
      setQuestionId(3);
    } else if (questionId === 3 && response === '1') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
    } else if (questionId === 3 && response === '2') {
      setQuestionId(4);
    } else if (questionId === 4 && response === '1') {
      setQuestionId(5);
    } else if (questionId === 4 && response === '2') {
      setQuestionId(6);
    } else if (questionId === 5 && response === '1') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 5 && response === '2') {
      setQuestionId(7);
    } else if (questionId === 6 && response === '1') {
      setQuestionId(11);
    } else if (questionId === 6 && response === '2') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 7 && response === '1') {
      setQuestionId(8);
    } else if (questionId === 7 && response === '2') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 8 && response === '1') {
      setQuestionId(9);
    } else if (questionId === 8 && response === '2') {
      setQuestionId(10);
    } else if (questionId === 8 && response === '3') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 8 && response === '4') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 9 && response === '1') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 9 && response === '2') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 9 && response === '0') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
    } else if (questionId === 10 && response === '1') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 10 && response === '2') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 10 && response === '0') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 11 && response === '1') {
      setQuestionId(12);
    } else if (questionId === 11 && response === '2') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 12 && response === '1') {
      setQuestionId(13);
    } else if (questionId === 12 && response === '2') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 12 && response === '3') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 13 && response === '1') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 13 && response === '2') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else if (questionId === 13 && response === '0') {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
      // alert("Thanks for the feedback");
    } else {
      setQuestionId(14);
      setTimeout(toggleChat, 5000);
      setTimeout(getData, 5000);
      setTimeout(restQuestion, 5000);
    }
  };

  console.log('user response: ', userResponses);

  return isActive && isToggle ? (
    <div className="chat-popup">
      <div className="chat-header">
        <h3 style={{ fontWeight: 700, margin: '0' }}>AI4School</h3>
        <button type="button" className="close-btn" onClick={toggleChat}>
          &times;
        </button>
      </div>
      <div className="chat-body">
        <>
          {questionId === 0 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                Why did you mark this as invalid?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  Floating Coins
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  Coin Imbalance(with anonymous)
                </button>
                <button type="button" onClick={() => handleUserResponse('3')}>
                  Coin Imbalance(with known first move)
                </button>
                <button type="button" onClick={() => handleUserResponse('4')}>
                  Coin Imbalance of -1(with known first move)
                </button>
                <button type="button" onClick={() => handleUserResponse('5')}>
                  Both win situation
                </button>
                <button type="button" onClick={() => handleUserResponse('6')}>
                  Opponent wins and Coin imbalance
                </button>
                <button type="button" onClick={() => handleUserResponse('6')}>
                  First move player wins and Coin imbalance
                </button>
              </div>
            </>
          )}
          {questionId === 1 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                Why did you mark this as valid?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  No floating Coins
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  No Coin Imbalance
                </button>
                <button type="button" onClick={() => handleUserResponse('-1')}>
                  Any other
                </button>
              </div>
            </>
          )}
          {questionId === 2 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                If there are no floating coins, did you check the coin
                imbalance?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  No
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  Yes
                </button>
              </div>
            </>
          )}
          {questionId === 3 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                What was the difference between the #red and #yellow coins?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  abs diff &gt; 1
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  abs diff &lt; 1
                </button>
              </div>
            </>
          )}
          {questionId === 4 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                Did you take into account who played the first move?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  Yes
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  No
                </button>
              </div>
            </>
          )}
          {questionId === 5 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                What was the difference between the #coins of the player who
                played first and his opponent?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  -1
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  0 or 1
                </button>
              </div>
            </>
          )}
          {questionId === 6 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                Was it anonymous?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  Yes
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  No
                </button>
              </div>
            </>
          )}
          {questionId === 7 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                Did you check for the winning condition?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  Yes
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  No
                </button>
              </div>
            </>
          )}
          {questionId === 8 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                Is there any player winning?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  Yes, first player won
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  Yes, second player won
                </button>
                <button type="button" onClick={() => handleUserResponse('3')}>
                  No
                </button>
                <button type="button" onClick={() => handleUserResponse('4')}>
                  Both
                </button>
              </div>
            </>
          )}
          {questionId === 9 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                What is the difference between the #coins of first player and
                his opponent?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  0
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  1
                </button>
                <button type="button" onClick={() => handleUserResponse('0')}>
                  Any other
                </button>
              </div>
            </>
          )}
          {questionId === 10 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                What is the difference between the #coins of first player and
                his opponent?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  0
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  1
                </button>
                <button type="button" onClick={() => handleUserResponse('0')}>
                  Any other
                </button>
              </div>
            </>
          )}
          {questionId === 11 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                Did you check for the winning condition?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  Yes
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  No
                </button>
              </div>
            </>
          )}
          {questionId === 12 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                Is there any player winning?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  Yes, one player won
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  Yes, both player won
                </button>
                <button type="button" onClick={() => handleUserResponse('3')}>
                  No
                </button>
              </div>
            </>
          )}
          {questionId === 13 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question"
              >
                What is the difference between the #coins of player who won and
                his opponent?
              </div>
              <div className="chat-option">
                <button type="button" onClick={() => handleUserResponse('1')}>
                  -1
                </button>
                <button type="button" onClick={() => handleUserResponse('2')}>
                  0 or 1
                </button>
                <button type="button" onClick={() => handleUserResponse('0')}>
                  Any other
                </button>
              </div>
            </>
          )}
          {questionId === 14 && (
            <>
              <div
                style={{ display: 'flex', margin: '10px 0' }}
                className="question-feedback"
              >
                Thank you for your feedback.
              </div>
            </>
          )}
          {questionId === -1 && (
            <>
              <div className="chat-input">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Custom input"
                    value={inputValue}
                    onChange={handleInputChange}
                  />

                  <button
                    onClick={() => handleUserResponse(inputValue)}
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  ) : (
    <div className="chat-container">
      <button type="button" className="chat-btn" onClick={toggleChat}>
        <img
          src="https://img.icons8.com/color/48/000000/chat--v1.png"
          alt="Chat Icon"
        />
      </button>
    </div>
  );
}

export default Chatbot;
