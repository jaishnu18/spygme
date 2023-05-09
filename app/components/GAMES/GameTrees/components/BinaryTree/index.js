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

const InputNode = ({ value, onChange }) => {
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <input
      placeholder="?"
      type="text"
      value={value}
      onChange={handleChange}
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
};

const BinaryTree = ( props ) => {
  const { nodes, functionToCall } = props;
  console.log(nodes);
  const [guesses, setGuesses] = useState(new Array(nodes.length).fill(''));

 

  const renderTree = (node, index) => {
    if (!node) return null;
    const isLeaf = !node.left && !node.right;

    return (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isLeaf ? (
            <TreeNode value={node.value} />
          ) : (
            <InputNode
              value={guesses[index]}
              onChange={value => {
                const newGuesses = [...guesses];
                newGuesses[index] = value;
                setGuesses(newGuesses);
              }}
            />
          )}
          <div style={{ display: 'flex' }}>
            {renderTree(node.left, 2 * index + 1)}
            {renderTree(node.right, 2 * index + 2)}
          </div>
        </div>
      </div>
    );
  };

  const generateTree = (nodes, index) => {
    if (index >= nodes.length) return null;
    const node = nodes[index];
    return {
      value: node,
      left: generateTree(nodes, 2 * index + 1),
      right: generateTree(nodes, 2 * index + 2),
    };
  };

  const tree = generateTree(nodes, 0);

  const handleGuessSubmit = () => {
    const newGuesses = [...guesses];
    treeTraversal(tree, (node, index) => {
      if (!node.left && !node.right) {
        newGuesses[index] = node.value.toString();
      }
    });
    setGuesses(newGuesses);
    functionToCall(newGuesses);
  };

  const treeTraversal = (node, callback, index = 0) => {
    if (!node) return;
    callback(node, index);
    treeTraversal(node.left, callback, 2 * index + 1);
    treeTraversal(node.right, callback, 2 * index + 2);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Binary Tree</h1>
      <div style={{ border: '1px solid black', padding: '10px' }}>
        {renderTree(tree, 0)}
      </div>
      <div style={{ padding: '30px' }}>
        <Button type="primary" htmlType="submit" onClick={handleGuessSubmit}>
          Submit Guesses
        </Button>
      </div>
    </div>
  );
};

export default BinaryTree;
