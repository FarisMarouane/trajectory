import React from 'react';

const PositionInfo = ({ x, y }) => {
  if (x === undefined || y === undefined)
    return <h2 style={{ color: 'red' }}>Hover over a position</h2>;
  return (
    <h2 style={{ color: 'red' }}>{`User XXX was at x: ${x}  and y: ${y}`}</h2>
  );
};

export default PositionInfo;
