/**
 *
 * DagreGraph
 *
 */

import React, { memo, useEffect, useState } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import CytoscapeComponent from 'react-cytoscapejs';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import H1 from '../atoms/H1';
import CustomButton from '../atoms/CustomButton';
import resetGraph from '../Graph';

cytoscape.use(dagre);
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function DagreGraph(props) {
  const [graphData, setGraphData] = useState(undefined);
  const [myCyRef, setMyCyRef] = useState(undefined);

  const { gameData } = props;

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
    <Row
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // margin: '20px',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        padding: '40px 20px',
      }}
      justify="center"
    >
      <Col xl={{ span: 10 }} style={{ fontFamily: 'montserrat' }}>
        <H1 style={{ fontWeight: 700 }}>GRAPH</H1>
      </Col>
      <Col
        xl={{ span: 10 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '24px 0px',
        }}
      >
        <CustomButton
          onClick={() => {
            myCyRef.reset();
            myCyRef.fit();
          }}
        >
          Reset Layout
        </CustomButton>
      </Col>
      {graphData && gameData && (
        <Col span={24}>
          <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(graphData)}
            style={{
              width: '500px',
              height: '300px',
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
            cy={cy => {
              setMyCyRef(cy);
              // if (props.nodeID) showNodeIDs(props, myCyRef);
            }}
          />
        </Col>
      )}
    </Row>
  );
}

DagreGraph.propTypes = {};

export default memo(DagreGraph);
