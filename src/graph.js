import React from 'react';
import {
  XYPlot,
  LineMarkSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

const Graph = ({ dataToDisplay, index = 0, onHoverOverUser }) => {
  console.log('Graph dataToDisplay: ', dataToDisplay);
  return (
    <XYPlot height={500} width={1000}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="X Axis" />
      <YAxis title="Y Axis" />
      <LineMarkSeries
        style={{
          strokeWidth: '3px',
        }}
        curve={'curveMonotoneX'}
        lineStyle={{ stroke: 'red' }}
        markStyle={{ stroke: 'blue' }}
        size="9"
        onValueMouseOver={(datapoint, event) => {
          onHoverOverUser(datapoint);
        }}
        data={dataToDisplay[index]}
      />
    </XYPlot>
  );
};

export default Graph;
