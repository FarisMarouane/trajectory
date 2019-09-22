import React from 'react';

const PositionInfo = ({
  x,
  y,
  time,
  userId,
  displayDefaultTitle,
}: {
  x: number;
  y: number;
  time: number;
  userId: string;
  displayDefaultTitle: boolean;
}) => {
  if (displayDefaultTitle || x === undefined || y === undefined)
    return <h2 className="title">Hover over a position</h2>;
  return (
    <h2 className="title">{`User ${userId} was at x: ${x}  and y: ${y} on ${time}`}</h2>
  );
};

export default PositionInfo;
