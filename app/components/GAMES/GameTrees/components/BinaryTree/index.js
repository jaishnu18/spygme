/**
 *
 * BinaryTree
 *
 */

import React, { useEffect, useRef, useState, memo } from 'react';

const Node = ({ value, left, right }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef();

  useEffect(() => {
    if (nodeRef.current && value.parent) {
      const parentRect = value.parent.rect;
      const nodeRect = nodeRef.current.getBoundingClientRect();
      const x = parentRect.left + parentRect.width / 2 - nodeRect.width / 2;
      const y = parentRect.bottom + 20;
      setPosition({ x, y });
    }
  }, [value.parent]);

  return (
    <div
      ref={nodeRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'lightblue',
        margin: '10px',
        fontSize: '20px',
        fontWeight: 'bold',
        boxShadow: '0 0 5px gray',
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {value.data}
      {left && <Node value={left} />}
      {right && <Node value={right} />}
    </div>
  );
};

const BinaryTree = ({ inorder }) => {
  const [tree, setTree] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    const createTree = inorder => {
      if (inorder.length === 0) {
        return null;
      }
      const mid = Math.floor(inorder.length / 2);
      const node = { data: inorder[mid], parent: null, rect: null };
      node.left = createTree(inorder.slice(0, mid));
      if (node.left) {
        node.left.parent = node;
      }
      node.right = createTree(inorder.slice(mid + 1));
      if (node.right) {
        node.right.parent = node;
      }
      return node;
    };

    const root = createTree(inorder);
    setTree(root);
  }, [inorder]);

  useEffect(() => {
    if (tree) {
      const layout = (node, rect) => {
        node.rect = rect;
        if (node.left) {
          layout(node.left, {
            left: rect.left - 100,
            top: rect.bottom + 20,
            width: rect.width / 2,
            height: rect.height,
          });
        }
        if (node.right) {
          layout(node.right, {
            left: rect.right + 20,
            top: rect.bottom + 20,
            width: rect.width / 2,
            height: rect.height,
          });
        }
      };
      const containerRect = containerRef.current.getBoundingClientRect();
      layout(tree, {
        left: containerRect.left + containerRect.width / 2 - 40,
        top: 20,
        width: 80,
        height: 80,
      });
    }
  }, [tree]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '500px' }}
    >
      {tree && <Node value={tree} />}
    </div>
  );
};

BinaryTree.propTypes = {};

export default memo(BinaryTree);
