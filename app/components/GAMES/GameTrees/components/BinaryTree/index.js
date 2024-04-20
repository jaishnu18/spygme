/**
 *
 * BinaryTree
 *
 */

import React, { useState } from 'react';
import { Button } from 'antd';

const TreeNode = ({ value }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#6ab5d6',
      color: '#fff',
      fontWeight: 'bold',
      margin: '5px',
    }}
  >
    {value}
  </div>
);

const InputNode = ({ value, onChange }) => (
  <input
    placeholder="?"
    type="text"
    value={value}
    onChange={onChange}
    style={{
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      textAlign: 'center',
      fontWeight: 'bold',
      margin: '5px',
      backgroundColor: '#6ab5d6',
      color: '#fff',
    }}
  />
);

const GeneralTree = props => {
  const { questionTree, nodeValues, functionToCall } = props;

  const [guesses, setGuesses] = useState(new Array(nodeValues.length).fill(''));
  const [answers, setAnswers] = useState(false);

  const renderTree = index => (
    <div
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {questionTree[index].length === 0 ? (
        <TreeNode value={nodeValues[index]} />
      ) : (
        <InputNode
          value={guesses[index]}
          onChange={e => handleInputChange(e, index)}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {questionTree[index].map((child, i) => (
          <div key={i} style={{ marginRight: '10px' }}>
            {renderTree(child)}
          </div>
        ))}
      </div>
    </div>
  );

  const handleInputChange = (e, index) => {
    const newGuesses = [...guesses];
    newGuesses[index] = e.target.value;
    setGuesses(newGuesses);
  };

  const handleGuessSubmit = () => {
    const newGuesses = [...guesses];
    traverseTree(0, newGuesses);
    setGuesses(newGuesses);
    functionToCall(newGuesses);
  };

  const traverseTree = (index, newGuesses) => {
    if (questionTree[index].length === 0) return;
    newGuesses[index] = guesses[index];
    questionTree[index].forEach(child => traverseTree(child, newGuesses));
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>General Tree</h1>
      <div style={{ border: '1px solid black', padding: '10px' }}>
        {renderTree(0)}
      </div>
      <div style={{ padding: '30px' }}>
        <Button type="primary" htmlType="submit" onClick={handleGuessSubmit}>
          Submit Guesses
        </Button>
      </div>
    </div>
  );
};

export default GeneralTree;
