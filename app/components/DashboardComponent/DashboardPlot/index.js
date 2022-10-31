/**
 *
 * DashboardPlot
 *
 */

import React, { useState, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import { Scatter } from '@ant-design/plots';
import P from 'components/atoms/P';
import H1 from 'components/atoms/H1';
import useMediaQuery from '../../../utils/useMediaQuery';

function DashboardPlot(props) {
  const isDesktop = useMediaQuery('(min-width: 960px)');

  const data = [
    {
      city: 'You Lie Here',
      Progress: parseInt(props.dashboard.overall_proficiency),
      Proficiency: parseInt(props.dashboard.overall_progress),
      Intensity: 6000,
    },
  ];
  const config = {
    width: isDesktop ? '100%' : 700,
    // autoFit: isDesktop,
    height: 400,
    // autoFit: false,
    appendPadding: 16,
    data,
    xField: 'Progress',
    yField: 'Proficiency',
    sizeField: 'Intensity',
    size: [12, 30],
    shape: 'circle',
    pointStyle: {
      fill: '#D6E3FD',
      fillOpacity: 0.6,
      stroke: '#6d9bf9',
    },
    tooltip: {
      showMarkers: true,
      fields: ['Progress', 'Proficiency'],
    },
    xAxis: {
      min: 0,
      max: 100,
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      label: {
        formatter: v => (v !== '0' ? `${v}%` : v),
      },
      line: null,
    },
    label: {
      formatter: item => '...',
      offsetY: 12,
      style: {
        fontSize: 12,
        fill: 'rgba(0,0,0,0.85)',
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      line: null,
      label: {
        formatter: v => (v !== '0' ? `${v}%` : v),
      },
    },
    annotations: [
      {
        type: 'text',
        position: [50, 100],
        content: 'PROGRESS',
        offsetY: -12,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        position: [100, 50],
        content: 'PROFICIENCY',
        rotate: Math.PI / 2,
        offsetY: -40,
        offsetX: 12,
        style: {
          fontSize: 14,
        },
      },
      {
        type: 'region',
        start: [7, 7],
        end: [7.8, 7.8],
        top: true,
        style: {
          fill: '#fff',
          fillOpacity: 0.5,
          opacity: 1,
        },
      },
      {
        type: 'region',
        start: [0.2, 7],
        end: [1, 7.8],
        top: true,
        style: {
          fill: '#fff',
          fillOpacity: 0.5,
          opacity: 1,
        },
      },
      {
        type: 'region',
        start: [7, 0.2],
        end: [7.8, 1],
        top: true,
        style: {
          fill: '#fff',
          fillOpacity: 0.5,
          opacity: 1,
        },
      },
    ],
    quadrant: {
      xBaseline: 50,
      yBaseline: 50,
      lineStyle: {
        lineDash: [4, 2],
        lineWidth: 2,
      },
      regionStyle: [
        {
          fill: '#5bd8a6',
          fillOpacity: 0.1,
        },
        {
          fill: '#667796',
          fillOpacity: 0.1,
        },
        {
          fill: '#fff',
        },
        {
          fill: '#f7664e',
          fillOpacity: 0.1,
        },
      ],
      labels: [
        {
          content: isDesktop ? 'Progress High and Proficiency High' : 'I',

          position: isDesktop ? [62, 70] : [80, 70],
          style: {
            fill: 'rgba(0,0,0, 0.85)',
            textAlign: 'start',
            opacity: 0.5,
          },
        },
        {
          content: isDesktop ? 'Progress Low and Proficiency High' : 'II',
          position: isDesktop ? [8, 70] : [20, 70],
          style: {
            fill: 'rgba(0,0,0, 0.85)',
            textAlign: 'start',
            opacity: 0.5,
          },
        },
        {
          content: isDesktop ? 'Progress Low and Proficiency Low' : 'III',
          position: isDesktop ? [8, 30] : [20, 30],
          style: {
            fill: 'rgba(0,0,0, 0.85)',
            textAlign: 'start',
            opacity: 0.5,
          },
        },
        {
          content: isDesktop ? 'Progress High and Proficiency Low' : 'IV',
          position: isDesktop ? [62, 30] : [80, 30],
          style: {
            fill: 'rgba(0,0,0, 0.85)',
            textAlign: 'start',
            opacity: 0.5,
          },
        },
      ],
    },
  };
  return (
    <div style={{ overflowX: 'auto' }}>
      <div
        style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}
      >
        <H1 textAlign="center" fontWeight="700">
          Progress vs Proficiency
        </H1>
      </div>
      <Scatter style={{ width: '100%' }} {...config} />
    </div>
  );
}

DashboardPlot.propTypes = {};

export default memo(DashboardPlot);
