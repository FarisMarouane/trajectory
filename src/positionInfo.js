import React from 'react';

const PositionInfo = ({ x, y, time, userId, displayDefaultTitle }) => {
  if (displayDefaultTitle || x === undefined || y === undefined)
    return <h2 style={{ color: 'red' }}>Hover over a position</h2>;
  return (
    <h2
      style={{ color: 'red' }}
    >{`User ${userId} was at x: ${x}  and y: ${y} on ${time}`}</h2>
  );
};

export default PositionInfo;
