/* eslint-disable prefer-spread */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/**
 *
 * Graph
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import CytoscapeComponent from 'react-cytoscapejs';
import CustomButton from '../atoms/CustomButton';
import H1 from '../atoms/H1';
import useMediaQuery from '../../utils/useMediaQuery';

cytoscape.use(popper);

export const showNodeIDs = (props, myCyRef) => {
  const { gameData } = props;

  if (gameData && myCyRef) {
    for (let i = 0; i < gameData.num_nodes; i += 1) {
      const popper = myCyRef.getElementById(0).popper({
        content: () => {
          const div = document.createElement('h2');
          div.style.textAlign = 'left';
          div.style.paddingLeft = '1px';
          div.style.color = 'purple';
          div.style.border = '2px solid black';
          div.style.borderRadius = '2px';
          div.style.width = '40px';
          div.innerHTML = i;
          document.getElementById('GraphContainer').appendChild(div);
          return div;
        },
      });
    }
  }
};

export const getVisualization = (
  props,
  myCyRef,
  setvisualizeStarted,
  setVisualizeDisable,
) => {
  const { gameData } = props;

  if (gameData && myCyRef) {
    if (gameData.ptr === 0) setvisualizeStarted(true);
    const node = gameData.orderOfEvaluation[gameData.ptr];

    myCyRef.getElementById(node).addClass('highlighted');

    gameData.ptr += 1;

    const popper = myCyRef.getElementById(node).popper({
      content: () => {
        const div = document.createElement('h1');
        div.style.textAlign = 'left';
        div.style.paddingLeft = '5px';
        div.style.color = 'purple';
        div.style.border = '2px solid black';
        div.style.borderRadius = '2px';
        div.style.width = '40px';
        div.innerHTML = gameData.values[node];
        div.className = 'Popper';
        document.getElementById('GraphContainer').appendChild(div);
        return div;
      },
    });
    if (gameData.ptr === gameData.num_nodes) setVisualizeDisable(true);

    const update = () => {
      popper.update();
    };

    myCyRef.getElementById(node).on('position', update);

    myCyRef.on('pan zoom resize', update);
  }
};

export const animate = (props, myCyRef, setVisualizeDisable) => {
  const { gameData } = props;

  if (gameData) {
    setVisualizeDisable(true);
    if (gameData.ptr2 < gameData.orderOfEvaluation.length) {
      const node = gameData.orderOfEvaluation[gameData.ptr2];
      myCyRef.getElementById(node).addClass('highlighted');
      const popper = myCyRef.getElementById(node).popper({
        content: () => {
          const div = document.createElement('h1');
          div.style.textAlign = 'left';
          div.style.paddingLeft = '5px';
          div.style.color = 'purple';
          div.style.border = '2px solid black';
          div.style.borderRadius = '2px';
          div.style.width = '40px';
          div.className = `Popper`;
          div.innerHTML = gameData.values[node];
          document.getElementById('GraphContainer').appendChild(div);
          return div;
        },
      });
      const update = () => {
        popper.update();
      };

      myCyRef.getElementById(node).on('position', update);

      myCyRef.on('pan zoom resize', update);
      gameData.ptr2 += 1;
      setTimeout(() => {
        animate(props, myCyRef, setVisualizeDisable);
      }, 2000);
    }
  }
};

export const resetGraph = (
  props,
  myCyRef,
  setvisualizeStarted,
  setVisualizeDisable,
  evaluatedAnswer,
) => {
  const { gameData } = props;
  if (gameData && myCyRef) {
    if (gameData.orderOfEvaluation)
      reset(
        props,
        myCyRef,
        setvisualizeStarted,
        setVisualizeDisable,
        evaluatedAnswer,
      );
    myCyRef.reset();
  }
};

export const reset = (
  props,
  myCyRef,
  setvisualizeStarted,
  setVisualizeDisable,
  evaluatedAnswer,
) => {
  const { gameData } = props;

  if (gameData && myCyRef) {
    for (let i = 0; i < gameData.orderOfEvaluation.length; i += 1) {
      const node = gameData.orderOfEvaluation[i];
      myCyRef.getElementById(node).removeClass('highlighted');
    }
    gameData.ptr = 0;
    gameData.ptr2 = 0;

    const elements = document.getElementsByClassName('Popper');
    while (elements.length > 0) elements[0].parentNode.removeChild(elements[0]);

    setvisualizeStarted(false);
    if (evaluatedAnswer) setVisualizeDisable(false);
  }
};

function Graph(props) {
  const [graphData, setGraphData] = useState(undefined);
  const [visualizeStarted, setvisualizeStarted] = useState(false);
  const [visualizeDisable, setVisualizeDisable] = useState(true);

  const { gameData } = props;
  const { evaluatedAnswer } = props;

  const isDesktop = useMediaQuery('(min-width: 960px)');

  useEffect(() => {
    if (evaluatedAnswer) setVisualizeDisable(false);
  }, [evaluatedAnswer]);

  useEffect(() => {
    const elements = [];

    const xCoordinate = gameData.x_coor;
    const yCoordinate = gameData.y_coor;
    const edgeCurvature = gameData.edge_carvature;
    const { content } = gameData;

    for (let i = 0; i < gameData.num_nodes; i += 1) {
      const obj = {
        data: {
          id: i,
          label: `${gameData.content[i]}${props.nodeID ? ` : ${i}` : ''}`,
        },
        position: {
          x: 100 * (xCoordinate[i] + 1),
          y: 100 * (yCoordinate[i] + 1),
        },
      };
      elements.push(obj);
    }
    const { adjList } = gameData;
    for (let i = 0; i < gameData.num_nodes; i += 1) {
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
          style: {
            'control-point-weight': 0.5,
            'control-point-distance':
              -20 * (edgeCurvature ? edgeCurvature[i][j] : 0),
            'line-color':
              content[i] === '~'
                ? '#000'
                : j === 0 && edgeCurvature
                ? 'red'
                : 'blue',
            'target-arrow-color':
              content[i] === '~'
                ? '#000'
                : j === 0 && edgeCurvature
                ? 'red'
                : 'blue',
          },
        };
        elements.push(obj);
        j += 1;
      }
    }
    setGraphData(elements);
  }, [gameData]);

  const [myCyRef, setMyCyRef] = useState(undefined);

  return (
    <Row
      id="GraphContainer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
        // margin: '20px',
        // boxShadow: isDesktop && 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        marginTop: !props.isDesktop && '20px',
      }}
      justify="center"
    >
      <Col xl={{ span: 10 }}>
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
            resetGraph(
              props,
              myCyRef,
              setvisualizeStarted,
              setVisualizeDisable,
              evaluatedAnswer,
            );
          }}
        >
          Reset Layout
        </CustomButton>
        {props.visualize && (
          <CustomButton
            onClick={e => {
              getVisualization(
                props,
                myCyRef,
                setvisualizeStarted,
                setVisualizeDisable,
              );
            }}
            disabled={evaluatedAnswer === undefined || visualizeDisable}
          >
            {visualizeStarted ? 'Next' : 'Visualize in steps'}
          </CustomButton>
        )}
        {props.animate && (
          <CustomButton
            onClick={() => {
              resetGraph(
                props,
                myCyRef,
                setvisualizeStarted,
                setVisualizeDisable,
              );
              animate(props, myCyRef, setVisualizeDisable);
            }}
            disabled={evaluatedAnswer === undefined}
          >
            Animate
          </CustomButton>
        )}
      </Col>

      {graphData && gameData && (
        <Col>
          <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(graphData)}
            style={{
              width: gameData.x_coor
                ? Math.max.apply(Math, gameData.x_coor) * 100 + 200
                : 0,
              height: gameData.y_coor
                ? Math.max.apply(Math, gameData.y_coor) * 100 + 200
                : 0,
              border: '1px solid black',
              background: 'white',
              borderRadius: '20px',
            }}
            zoomingEnabled
            maxZoom={3}
            minZoom={0.1}
            autounselectify={false}
            boxSelectionEnabled
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
              {
                selector: '.highlighted',
                style: {
                  'background-color': '#61bffc',
                  'line-color': '#61bffc',
                  'target-arrow-color': '#61bffc',
                  'transition-property':
                    'background-color, line-color, target-arrow-color',
                  'transition-duration': '0.5s',
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

Graph.propTypes = {
  gameData: PropTypes.object.isRequired,
  evaluatedAnswer: PropTypes.object,
  level: PropTypes.string,
  animate: PropTypes.bool,
  visualize: PropTypes.bool,
  nodeID: PropTypes.bool,
};

export default memo(Graph);
