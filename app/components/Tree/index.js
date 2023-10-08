/**
 *
 * Tree
 *
 */

import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import CytoscapeComponent from 'react-cytoscapejs';
import useMediaQuery from 'utils/useMediaQuery';
import { Button } from 'antd';

cytoscape.use(dagre);

function Tree(props) {
  const { evaluatedAnswer } = props;
  const { adjList } = props;
  const { nodeLabels } = props;
  const cyRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 960px)');

  let viewportStyle = {
    border: '1px solid',
    width: isDesktop ? '480x' : '300px',
    height: isDesktop ? '640x' : '400px',
  }

  let elements = []
  for (var u in nodeLabels) {
    elements.push({ data: { id: u, label: nodeLabels[u] } });
    if (adjList[u]) {
      for (const [w, v] of adjList[u]) {
        elements.push({ data: { source: u, target: v, label: w }, selectable: false })
      }
    }
  }

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.elements().lock();
      cyRef.current.resize();
      cyRef.current.fit();

      if (props.setSelection) {
        cyRef.current.on('select', 'node', e => {
          cyRef.current.nodes().not(e.target).unselect();
          cyRef.current.nodes().not(e.target).style('background-color', 'white');
          e.target.style('background-color', '#32CD32');
          props.setSelection(e.target.id());
        });
      }
      else
      {
        cyRef.current.elements().unselectify();
      }
    }
  }, [cyRef]);

  useEffect(() => {
    if (cyRef.current && evaluatedAnswer) {
      const answer = cyRef.current.$id(evaluatedAnswer['answer']);
      if (!answer.selected()) {
        cyRef.current.nodes(':selected').style('background-color', 'red');
        answer.style('background-color', '#32CD32');
      }
      cyRef.current.elements().unselectify();
    }
  }, [evaluatedAnswer]);

  async function resetLayout() {
    cyRef.current.reset();
    cyRef.current.fit();
  };

  return <div id='Decision Tree Canvas'
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
    <CytoscapeComponent
      elements={elements}
      style={viewportStyle}
      layout={{ name: 'dagre', fit: true }}
      stylesheet={[
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            textHalign: 'center',
            textValign: 'center',
            shape: 'ellipse',
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: '1px',
            backgroundColor: 'white',
            fontSize: '11px',
            width: '50px',
          }
        },
        {
          selector: 'edge',
          style: {
            label: 'data(label)',
            textMarginX: '16px',
            fontSize: '10px',
            width: '1px',
            lineColor: 'black'
          }
        }
      ]}
      cy={(cy) => (cyRef.current = cy)}
      userZoomingEnabled={true}
      userPanningEnabled={true}
      maxZoom={3.0}
      minZoom={0.5}
      boxSelectionEnabled={false}
    />

    <Button
      style={{
        margin: '20px',
      }}
      onClick={resetLayout}>
      Reset Zoom
    </Button>
  </div>
}

Tree.propTypes = {
  adjList: PropTypes.any
};

export default memo(Tree);
