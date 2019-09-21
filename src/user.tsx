import React from 'react';

const User = ({ id, onUserClick }) => {
  return (
    <div id="user" onClick={() => onUserClick(id)}>
      {id}
    </div>
  );
};

export default User;
