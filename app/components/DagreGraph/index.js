/**
 *
 * DagreGraph
 *
 */

import React, { memo, useEffect, useState } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import CytoscapeComponent from 'react-cytoscapejs';

cytoscape.use(dagre);
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function DagreGraph(props) {
  const [graphData, setGraphData] = useState(undefined);

  const { gameData } = props;
  console.log(gameData.adjList);

  useEffect(() => {
    if (gameData) {
      const elements = [];
      const { adjList } = gameData;
      for (let i = 0; i < adjList.length; i += 1) {
        const obj = {
          data: {
            id: i,
            label: `${i}`,
          },
        };
        elements.push(obj);
      }
      for (let i = 0; i < adjList.length; i += 1) {
        let j = 0;

        while (adjList[i][j] != null) {
          const tar = adjList[i][j];
          const obj = {
            data: {
              source: i,
              target: tar,
              label: '',
              key: `${i}t${tar}`,
            },
          };
          elements.push(obj);
          j += 1;
        }
      }
      setGraphData(elements);
    }
  }, [gameData]);

  return (
    <div>
      {graphData && (
        <CytoscapeComponent
          elements={CytoscapeComponent.normalizeElements(graphData)}
          style={{
            width: 400,
            height: 500,
            border: '1px solid black',
            background: 'white',
            borderRadius: '20px',
          }}
          zoomingEnabled
          maxZoom={3}
          minZoom={0.1}
          autounselectify={false}
          boxSelectionEnabled
          layout={{ name: 'dagre' }}
          stylesheet={[
            {
              selector: 'node',
              style: {
                'background-color': '#666',
                color: 'white',
                label: 'data(label)',
                width: props.width ? props.width : '42px',
                height: '42px',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '17px',
                'text-outline-color': '#666',
                'text-outline-width': props.nodeID ? '2px' : '0px',
              },
            },
            {
              selector: 'edge',
              style: {
                width: 3,
                'line-color': 'blue',
                'target-arrow-color': 'blue',
                'target-arrow-shape': 'triangle',
                'curve-style': 'unbundled-bezier',
                'control-point-weight': '0.5',
                'control-point-distance': '0',
              },
            },
          ]}
        />
      )}
    </div>
  );
}

DagreGraph.propTypes = {};

export default memo(DagreGraph);
