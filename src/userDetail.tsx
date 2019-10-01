import React from 'react';
import { positionInTime } from './App';

import { calculateTotalTime, calculateAverageSpeed } from './helpers';

const UserDetail = ({
  showUserStats,
  userId,
  index,
  data,
}: {
  showUserStats: boolean;
  userId: string;
  index: number;
  data: Array<Array<positionInTime>>;
}) => {
  if (!showUserStats) return null;
  return (
    <table id="table">
      <thead>
        <tr>
          <th colSpan={4}>{`Customer ${userId} stats`}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table-cell" style={{ width: '30%' }}>
            Total Time
          </td>
          <td className="table-cell" style={{ width: '70%' }}>
            {calculateTotalTime(data, index)}
          </td>
        </tr>
        <tr>
          <td className="table-cell" style={{ width: '30%' }}>
            Number of stops
          </td>
          <td className="table-cell" style={{ width: '70%' }}>
            {data[index].length}
          </td>
        </tr>
        <tr>
          <td className="table-cell" style={{ width: '30%' }}>
            Average speed
          </td>
          <td className="table-cell" style={{ width: '70%' }}>
            {calculateAverageSpeed(data, index)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserDetail;
