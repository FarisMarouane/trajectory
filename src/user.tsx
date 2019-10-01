import React from 'react';

const User = ({ id, onUserClick }: { id: string, onUserClick: Function }) => {
  return (
    <div id="user" onClick={() => onUserClick(id)}>
      {id}
    </div>
  );
};

export default User;
