import React from 'react';
import {
  XYPlot,
  LineMarkSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

import { usersColors, fromIndexToUserId } from './helpers';

class Graph extends React.Component {
  render() {
    const {
      dataToDisplay,
      userId,
      index,
      onHoverOverUser,
      showAll,
      rawData,
    } = this.props;
    return (
      <XYPlot height={500} width={1000}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title="X Axis" />
        <YAxis title="Y Axis" />
        {!showAll ? (
          <LineMarkSeries
            style={{
              strokeWidth: '3px',
            }}
            curve={'curveMonotoneX'}
            lineStyle={{ stroke: usersColors[userId] }}
            markStyle={{ stroke: 'blue' }}
            size="9"
            onValueMouseOver={datapoint => {
              onHoverOverUser(datapoint, index);
            }}
            data={dataToDisplay[index]}
          />
        ) : (
          dataToDisplay.map((_, index) => {
            const _userId = fromIndexToUserId(index, rawData);
            return (
              <LineMarkSeries
                style={{
                  strokeWidth: '3px',
                }}
                curve={'curveMonotoneX'}
                lineStyle={{ stroke: usersColors[_userId] }}
                markStyle={{ stroke: 'blue' }}
                size="9"
                onValueMouseOver={datapoint => {
                  onHoverOverUser(datapoint, index);
                }}
                key={index}
                data={dataToDisplay[index]}
              />
            );
          })
        )}
      </XYPlot>
    );
  }
}

export default Graph;
