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
import { userData, positionInTime } from './App';

type graphProps = {
  dataToDisplay: Array<Array<positionInTime>>;
  userId: string;
  index: number;
  onHoverOverUser: Function;
  showAll: boolean;
  rawData: Array<userData>;
};

class Graph extends React.Component<graphProps> {
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
            onValueMouseOver={(datapoint: positionInTime) => {
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
                onValueMouseOver={(datapoint: positionInTime) => {
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
