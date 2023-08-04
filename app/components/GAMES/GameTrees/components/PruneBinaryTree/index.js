/**
 *
 * PruneBinaryTree
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
    {value !== null ? value.toString() : ''}
  </div>
);

const PruneBinaryTree = (props) => {
  const { tree } = props;
  const [selectedEdges, setSelectedEdges] = useState([]);
  console.log('selected edges', selectedEdges);

  const handleSubmit = () => {
    // Call the submit function from the parent component
  };

  const renderTree = (node, index, level) => {
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                margin: '5px',
                backgroundColor: '#6ab5d6',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '50%',
              }}
            >
              {node.value}
            </div>
          )}
          <div style={{ display: 'flex' }}>
            {renderTree(node.left, 2 * index + 1, level + 1)}
            {renderTree(node.right, 2 * index + 2, level + 1)}
          </div>
        </div>
      </div>
    );
  };

  const renderEdges = (root) => {
    if (!root) return [];

    const queue = [root];
    const edges = [];
    const edgeNumberMap = {};

    while (queue.length > 0) {
      const node = queue.shift();
      const isLeaf = !node.left && !node.right;

      if (!isLeaf) {
        if (node.left) {
          const edgeKey = `${node.value}-${node.left.value}`;
          edges.push(edgeKey);
          edgeNumberMap[edgeKey] = edges.length;
          queue.push(node.left);
        }

        if (node.right) {
          const edgeKey = `${node.value}-${node.right.value}`;
          edges.push(edgeKey);
          edgeNumberMap[edgeKey] = edges.length;
          queue.push(node.right);
        }
      }
    }

    return { edges, edgeNumberMap };
  };

  const handleEdgeClick = (edge) => {
    if (selectedEdges.includes(edgeNumberMap[edge])) {
      setSelectedEdges(selectedEdges.filter((selectedEdge) => selectedEdge !== edgeNumberMap[edge]));
    } else {
      setSelectedEdges([...selectedEdges, edgeNumberMap[edge]]);
    }
  };

  const { edges, edgeNumberMap } = renderEdges(tree);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Prune Binary Tree</h1>
      <div style={{ border: '1px solid black', padding: '10px' }}>
        {renderTree(tree, 0, 1)}
      </div>
      <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
        <h3>Edge Selection:</h3>
        <div>
          {edges.map((edge, index) => (
            <div
              key={index}
              style={{
                display: 'inline-block',
                margin: '5px',
                backgroundColor: selectedEdges.includes(edgeNumberMap[edge]) ? '#ff0000' : '#6ab5d6',
                color: '#fff',
                fontWeight: 'bold',
                padding: '3px 8px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => handleEdgeClick(edge)}
            >
              {edge}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '30px' }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Submit Guesses
        </Button>
      </div>
    </div>
  );
};

export default PruneBinaryTree;
